import { VectorDBQAChain } from "langchain/chains";
import { FaissStore } from "@langchain/community/vectorstores/faiss";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { CohereEmbeddings } from "@langchain/cohere";
import { OpenAI } from "@langchain/openai";
const COHERE_API_KEY = "";
const OPENAI_API_KEY=""
const model = new OpenAI({ openAIApiKey: OPENAI_API_KEY, temperature: 0 });
const embeddings = new CohereEmbeddings({ apiKey: COHERE_API_KEY });

async function getAns() {
  try {
    const loader = new PDFLoader("./javascript_tutorial.pdf");
    const docs = await loader.load();
    const vectorStore = await FaissStore.fromDocuments(docs, embeddings, { dimensions: 768 });
    const chain = VectorDBQAChain.fromLLM(model, vectorStore);
    const res = await chain.call({
      input_documents: docs,
      query: "What is JavaScript?",
    });
    console.log("OUTPUT:", res);
  } catch (error) {
    console.error("ERROR:", error);
  }
}

getAns();