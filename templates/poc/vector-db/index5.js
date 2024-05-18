import { FaissStore } from "@langchain/community/vectorstores/faiss";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { CohereEmbeddings } from "@langchain/cohere";
const COHERE_API_KEY = "";
const embeddings = new CohereEmbeddings({apiKey: COHERE_API_KEY});

const getAns = async () => {
    try {
        const loader = new PDFLoader("./sample3.pdf");
        const docs = await loader.load();
        const vectorStore = await FaissStore.fromDocuments(docs,embeddings);
        const resultOne = await vectorStore.similaritySearch("keep Issues within our EA models", 1);
        console.log("OUTPUT:",resultOne);
    } catch (error) {
        console.log("ERROR:", error)
    }
}

getAns()


