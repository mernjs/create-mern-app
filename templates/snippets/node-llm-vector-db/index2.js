import { FaissStore } from "@langchain/community/vectorstores/faiss";
import { CSVLoader } from "langchain/document_loaders/fs/csv";
import { CohereEmbeddings } from "@langchain/cohere";
const COHERE_API_KEY = "";
const embeddings = new CohereEmbeddings({ apiKey: COHERE_API_KEY });

const getAns = async () => {
    try {
        const loader = new CSVLoader("./data.csv");
        const docs = await loader.load();
        const vectorStore = await FaissStore.fromDocuments(docs, embeddings);
        const resultOne = await vectorStore.similaritySearch("Where is Clark's?", 1);
        console.log("OUTPUT:", resultOne);
    } catch (error) {
        console.log("ERROR:", error)
    }
}

getAns()