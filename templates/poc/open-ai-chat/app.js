const fs = require('fs');
const OpenAI = require('openai');
const path = require('path');

const OPENAI_API_KEY = ""

const openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
});

async function createPdfAnalyzerAssistant(pdfPath) {
    try {
        const file = await openai.files.create({
            file: fs.createReadStream(pdfPath),
            purpose: 'assistants',
        });

        const assistant = await openai.beta.assistants.create({
            name: "PDF Analyzer",
            instructions: `
                Welcome, Scope of Work! Your task is to conduct a detailed analysis of PDF documents, which may contain images. When asked questions about the content of the PDF documents, you should:

                1. Open and read the provided PDF document.
                2. Analyze both the text and images within the PDF.
                3. Answer any questions about the document's content.
                4. If the answer is found within an image in the PDF, read and interpret the image to provide a response.

                Most Important: Perform optical character recognition (OCR) on the uploaded PDF document, save all content, and share instant responses when questions are asked.

                **Note: Do not share any response outside the document.**
            `,
            model: "gpt-4-1106-preview",
            tools: [{ type: "code_interpreter" }],
            tool_resources: {
                "code_interpreter": {
                    "file_ids": [file.id]
                }
            }
        });
        return assistant.id;
    } catch (error) {
        console.error("Error creating assistant:", error.response ? error.response.data : error.message);
    }
}

async function createThread(){
    try {
        const thread = await openai.beta.threads.create();
        return thread.id
    } catch (error) {
        console.error("Error creating thread:", error.response ? error.response.data : error.message);
    }
}

async function runThread(threadId, assistantId) {
    const run = await openai.beta.threads.runs.create(threadId, {
        assistant_id: assistantId,
    });

    while (true) {
        const runStatus = await openai.beta.threads.runs.retrieve(threadId, run.id);
        if (runStatus.status === 'completed') {
            return;
        } else if (runStatus.status === 'failed' || runStatus.status === 'cancelled') {
            throw new Error(`Run ${run.id} ${runStatus.status}`);
        }
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
}

async function askQuestion(threadId, question) {
    await openai.beta.threads.messages.create(threadId, {
        role: "user",
        content: question,
    });
}

async function getAssistantResponse(threadId, assistantId) {
    await runThread(threadId, assistantId);

    const messages = await openai.beta.threads.messages.list(threadId);
    let assistantResponse = messages.data[0].content?.[0]?.text?.value;

    const annotations = messages.data[0].content?.[0]?.text?.annotations;

    if (annotations && annotations.length > 0) {
        for (let i = 0; i < annotations.length; i++) {
            const annotation = annotations[i];
            const descriptionQuestion = `Please provide a detailed text description of what you see in the image from ${annotation.text}.`;
            
            await askQuestion(threadId, descriptionQuestion);
            await runThread(threadId, assistantId);

            const descriptionMessages = await openai.beta.threads.messages.list(threadId);
            const description = descriptionMessages.data[0].content?.[0]?.text?.value || "No description provided";

            assistantResponse += `\n\nPage ${i + 1} Image Description: ${description}`;
        }
    }

    return assistantResponse;
}

const pdfPath = path.join(__dirname, "sample-file-with-image.pdf");

async function main() {
    try {
        // Initialize assistant and thread once per session
        const assistantId = await createPdfAnalyzerAssistant(pdfPath);
        console.log("assistantId =>", assistantId);
        const threadId = await createThread()
        console.log("Thread created with ID:", threadId);

        // Function to ask a question and get a response
        async function askAndGetResponse(question) {
            console.error("\nAsking question:", question);
            await askQuestion(threadId, question);
            const assistantResponse = await getAssistantResponse(threadId, assistantId);
            console.log("Answer:", assistantResponse);
            return assistantResponse;
        }

        // Ask multiple questions sequentially
        await askAndGetResponse("I would like review the detaild document and share the summer?");
        await askAndGetResponse("Can you share details of below secure login?");
        await askAndGetResponse("Can you share summery in key points?");
        // Add more questions as needed

    } catch (error) {
        console.error("An error occurred:", error);
    }
}

main();