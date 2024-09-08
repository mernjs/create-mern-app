import { ChatOpenAI } from "@langchain/openai";
import { HNSWLib } from "@langchain/community/vectorstores/hnswlib";
import { formatDocumentsAsString } from "langchain/util/document";
import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence, RunnablePassthrough } from "@langchain/core/runnables";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { CohereEmbeddings } from "@langchain/cohere";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
const COHERE_API_KEY = "";
const OPENAI_API_KEY = ""
const model = new ChatOpenAI({ openAIApiKey: OPENAI_API_KEY });
const embeddings = new CohereEmbeddings({ apiKey: COHERE_API_KEY });

const getAns = async () => {
    const loader = new PDFLoader("./javascript_tutorial.pdf");
    const docs = await loader.load();
    const vectorStore = await HNSWLib.fromDocuments(docs,embeddings);

    const retriever = vectorStore.asRetriever();
    const prompt = PromptTemplate.fromTemplate(`Answer the question based only on the following context: {context} Question: {question}`);

    const chain = RunnableSequence.from([
        {
            context: retriever.pipe(formatDocumentsAsString),
            question: new RunnablePassthrough(),
        },
        prompt,
        model,
        new StringOutputParser(),
    ]);

    const result = await chain.invoke("What content on page 20, Can you get complete content of the page?");

    console.log("OUTPUT:", result);
}

getAns()