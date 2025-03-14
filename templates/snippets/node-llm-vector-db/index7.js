import { ChatOpenAI } from "@langchain/openai";
import { HNSWLib } from "@langchain/community/vectorstores/hnswlib";
import { formatDocumentsAsString } from "langchain/util/document";
import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence, RunnablePassthrough } from "@langchain/core/runnables";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { CohereEmbeddings } from "@langchain/cohere";
const COHERE_API_KEY = "";
const OPENAI_API_KEY = ""
const model = new ChatOpenAI({ openAIApiKey: OPENAI_API_KEY });
const embeddings = new CohereEmbeddings({ apiKey: COHERE_API_KEY });

const getAns = async () => {
    const vectorStore = await HNSWLib.fromTexts(
        ["mitochondria is the powerhouse of the cell"],
        [{ id: 1 }],
        embeddings
    );

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

    const result = await chain.invoke("What is the powerhouse of the cell?");

    console.log("OUTPUT:", result);
}

getAns()