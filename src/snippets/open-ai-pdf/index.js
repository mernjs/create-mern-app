const fs = require('fs');
const OpenAI = require('openai');
const OPENAI_API_KEY = ""

const openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
});

async function analyzePDFWithAssistant(pdfPath, question) {
    try {
        
        // 1. Upload the PDF file
        const file = await openai.files.create({
            file: fs.createReadStream(pdfPath),
            purpose: 'assistants',
        });

         // 2. Create an assistant
         const assistant = await openai.beta.assistants.create({
            name: "PDF Analyzer",
            instructions: `
Welcome, Scope of Work! Your task is to conduct a detailed analysis of PDF documents, which may contain images. When asked questions about the content of the PDF documents, you should:

1. Open and read the provided PDF document.
2. Analyze both the text and images within the PDF.
3. Answer any questions about the document's content in a text-only format.
4. If the answer is found within an image in the PDF, read and interpret the image to provide a text-based response only.
`,
            model: "gpt-4o",
            tools: [{ type: "code_interpreter" }],
            tool_resources: {
                "code_interpreter": {
                  "file_ids": [file.id]
                }
              }
        });

        // 3. Create a thread
        const thread = await openai.beta.threads.create();

        // 4. Add a message to the thread
        await openai.beta.threads.messages.create(thread.id, {
            role: "user",
            content: question,
        });

        // 5. Run the assistant
        const run = await openai.beta.threads.runs.create(thread.id, {
            assistant_id: assistant.id,
        });

        // 6. Wait for the run to complete
        let runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);
        while (runStatus.status !== 'completed') {
            await new Promise(resolve => setTimeout(resolve, 1000));
            runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);
        }

        // 7. Get the assistant's response
        const messages = await openai.beta.threads.messages.list(thread.id);
        const assistantResponse = messages.data[0].content?.[0]?.text?.value;

        console.log("MESSAGE value ==>>>", messages.data[0].content?.[0]?.text?.value)
        console.log("MESSAGE annotations ==>>>", messages.data[0].content?.[0]?.text?.annotations)

        // 8. Clean up (optional)
        await openai.beta.assistants.del(assistant.id);
        await openai.files.del(file.id);

        return assistantResponse;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}

// Example usage
(async () => {
    try {
        const pdfPath = './sample-file-with-image.pdf';
        const question = "What is below of Recommendation module?"
        const answer = await analyzePDFWithAssistant(pdfPath, question);
        console.log("Answer:", answer);
    } catch (error) {
        console.error("Error:", error);
    }
})();