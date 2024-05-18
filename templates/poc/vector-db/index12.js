import { ChatOpenAI } from "@langchain/openai";
import { HNSWLib } from "@langchain/community/vectorstores/hnswlib";
import { formatDocumentsAsString } from "langchain/util/document";
import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence, RunnablePassthrough } from "@langchain/core/runnables";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { CohereEmbeddings } from "@langchain/cohere";

const COHERE_API_KEY = "";
const OPENAI_API_KEY = ""

const model = new ChatOpenAI({ openAIApiKey: OPENAI_API_KEY });

const condenseQuestionTemplate = `Given the following conversation and a follow-up question, rephrase the follow-up question to be a standalone question, in its original language.
Chat History:
{chat_history}
Follow Up Input: {question}
Standalone question:`;

const CONDENSE_QUESTION_PROMPT = PromptTemplate.fromTemplate(condenseQuestionTemplate);

const answerTemplate = `Answer the question based only on the following context:{context} Question: {question}`;

const ANSWER_PROMPT = PromptTemplate.fromTemplate(answerTemplate);

const formatChatHistory = (chatHistory) => {
    const formattedDialogueTurns = chatHistory.map((dialogueTurn) => `Human: ${dialogueTurn[0]}\nAssistant: ${dialogueTurn[1]}`);
    return formattedDialogueTurns.join("\n");
};

try {
    const loader1 = new PDFLoader("./javascript_tutorial.pdf");
    const docs1 = await loader1.load();
    const embeddings1 = new CohereEmbeddings({ apiKey: COHERE_API_KEY });
    const vectorStore1 = await HNSWLib.fromDocuments(docs1, embeddings1);
    const retriever1 = vectorStore1.asRetriever();

    const loader2 = new PDFLoader("./javascript_tutorial2.pdf");
    const docs2 = await loader2.load();
    const embeddings2 = new CohereEmbeddings({ apiKey: COHERE_API_KEY });
    const vectorStore2 = await HNSWLib.fromDocuments(docs2, embeddings2);
    const retriever2 = vectorStore2.asRetriever();

    const standaloneQuestionChain = RunnableSequence.from([
        {
            question: (input) => input.question,
            chat_history: (input) => formatChatHistory(input.chat_history),
        },
        CONDENSE_QUESTION_PROMPT,
        model,
        new StringOutputParser(),
    ]);

    const answerChain = RunnableSequence.from([
        {
            context1: (input) => ({ context: input.vectorStore1.asRetriever().pipe(formatDocumentsAsString) }),
            context2: (input) => ({ context: input.vectorStore2.asRetriever().pipe(formatDocumentsAsString) }),
            question: new RunnablePassthrough(),
        },
        ANSWER_PROMPT,
        model,
    ]);

    const conversationalRetrievalQAChain = standaloneQuestionChain.pipe(answerChain);

    const result1 = await conversationalRetrievalQAChain.invoke({
        question: "What is the difference between the two PDFs?",
        chat_history: [],
        vectorStore1: retriever1,
        vectorStore2: retriever2,
    });

    const contentValue1 = result1.content;
    console.log("\n\n************************************************************");
    console.log("OUTPUT1=>", contentValue1);
    console.log("************************************************************\n\n");

    const result2 = await conversationalRetrievalQAChain.invoke({
        question: "What are the differences in content?",
        chat_history: [],
        vectorStore1: retriever1,
        vectorStore2: retriever2,
    });
    const contentValue2 = result2.content;
    console.log("\n\n************************************************************");
    console.log("OUTPUT2=>", contentValue2);
    console.log("************************************************************\n\n");
} catch (error) {
    console.error("Error:", error.message);
}