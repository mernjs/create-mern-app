const fs = require('fs');
const OpenAI = require('openai');
const OPENAI_API_KEY = ""


const openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
});

// Function to upload the PDF file and create the assistant
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
            `,
            model: "gpt-4o",
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

// Function to ask a question to the assistant
async function askQuestionToAssistant1(assistantId, question) {
    try {
        const thread = await openai.beta.threads.create();

        await openai.beta.threads.messages.create(thread.id, {
            role: "user",
            content: question,
        });

        const run = await openai.beta.threads.runs.create(thread.id, {
            assistant_id: assistantId,
        });

        let runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);
        while (runStatus.status !== 'completed') {
            await new Promise(resolve => setTimeout(resolve, 1000));
            runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);
        }

        const messages = await openai.beta.threads.messages.list(thread.id);
        const assistantResponse = messages.data[0].content?.[0]?.text?.value;

        return assistantResponse;
    } catch (error) {
        console.error("Error querying assistant:", error.response ? error.response.data : error.message);
    }
}

async function askQuestionToAssistant2(assistantId, question) {
    try {
        const thread = await openai.beta.threads.create();

        await openai.beta.threads.messages.create(thread.id, {
            role: "user",
            content: question,
        });

        const run = await openai.beta.threads.runs.create(thread.id, {
            assistant_id: assistantId,
        });

        let runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);
        while (runStatus.status !== 'completed') {
            await new Promise(resolve => setTimeout(resolve, 1000));
            runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);
        }

        const messages = await openai.beta.threads.messages.list(thread.id);
        let assistantResponse = messages.data[0].content?.[0]?.text?.value;
        
        console.log("assistantResponse", assistantResponse)
        
        // Check if the response contains an image reference
        if (assistantResponse.includes('sandbox:/mnt/data/')) {
            // Ask for a description of the image
            await openai.beta.threads.messages.create(thread.id, {
                role: "user",
                content: "Please provide a detailed text description of what you see in the image you've referenced.",
            });

            const descriptionRun = await openai.beta.threads.runs.create(thread.id, {
                assistant_id: assistantId,
            });

            let descriptionStatus = await openai.beta.threads.runs.retrieve(thread.id, descriptionRun.id);
            while (descriptionStatus.status !== 'completed') {
                await new Promise(resolve => setTimeout(resolve, 1000));
                descriptionStatus = await openai.beta.threads.runs.retrieve(thread.id, descriptionRun.id);
            }

            const descriptionMessages = await openai.beta.threads.messages.list(thread.id);
            const imageDescription = descriptionMessages.data[0].content?.[0]?.text?.value;

            assistantResponse += "\n\nImage Description: " + imageDescription;
        }

        return assistantResponse;
    } catch (error) {
        console.error("Error querying assistant:", error.response ? error.response.data : error.message);
    }
}

async function askQuestionToAssistant(assistantId, question) {
    try {
        const thread = await openai.beta.threads.create();

        await openai.beta.threads.messages.create(thread.id, {
            role: "user",
            content: question,
        });

        async function createRunAndWait() {
            const run = await openai.beta.threads.runs.create(thread.id, {
                assistant_id: assistantId,
            });

            while (true) {
                const runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);
                if (runStatus.status === 'completed') {
                    return;
                } else if (runStatus.status === 'failed' || runStatus.status === 'cancelled') {
                    throw new Error(`Run ${run.id} ${runStatus.status}`);
                }
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        }

        await createRunAndWait();

        const messages = await openai.beta.threads.messages.list(thread.id);
        let assistantResponse = messages.data[0].content?.[0]?.text?.value;

        console.log("assistantResponse =>",  messages.data[0].content?.[0]?.text)

        // Check if the response contains annotations
        const annotations = messages.data[0].content?.[0]?.text?.annotations;

        if (annotations && annotations.length > 0) {
            for (let i = 0; i < annotations.length; i++) {
                const annotation = annotations[i];
                const descriptionQuestion = `Please provide a detailed text description of what you see in the image from ${annotation.text}.`;
                
                await openai.beta.threads.messages.create(thread.id, {
                    role: "user",
                    content: descriptionQuestion,
                });

                await createRunAndWait();

                const descriptionMessages = await openai.beta.threads.messages.list(thread.id);
                const description = descriptionMessages.data[0].content?.[0]?.text?.value || "No description provided";

                assistantResponse += `\n\nPage ${i + 1} Image Description: ${description}`;
            }
        }

        return assistantResponse;
    } catch (error) {
        console.error("Error querying assistant:", error.response?.data || error.message);
    }
}


// const pdfPath = './sample-file-with-image.pdf';
const pdfPath = './ExampleContractA13330013MB.pdf';

(async () => {
    // const assistantId = await createPdfAnalyzerAssistant(pdfPath); 
    const assistantId = ""
    if (assistantId) {
        // console.log("assistantId ==>>", assistantId)
        // const question = "What is the summary of this whole PDF document?";
        // const question = "I would like a detailed review of the entire document"
        const question = "Can you share details of 4.2 Payments for Preconstruction Services from pdf document?"
        const assistantResponse = await askQuestionToAssistant(assistantId, question);
        console.log("Answer:", assistantResponse);
    }
})();
