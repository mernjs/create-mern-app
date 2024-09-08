import { MongoClient } from 'mongodb'
import { FaissStore } from "@langchain/community/vectorstores/faiss"
import { CohereEmbeddings } from "@langchain/cohere"
const COHERE_API_KEY = "";
const embeddings = new CohereEmbeddings({ apiKey: COHERE_API_KEY });

class Document {
    constructor(pageContent, metadata) {
        this.pageContent = pageContent;
        this.metadata = metadata;
    }
}

const transformToDocumentArray = (data) => {
    try {
        return data.map((item) => {
            const pageContent = `Question: ${item.Question}\nAnswer: ${item.Answer}`;
            const metadata = { id: item._id };
            return new Document(pageContent, metadata);
        })
    } catch (error) {
        console.log("ERROR:", error)
    }
}

const connectToDatabase = async () => {
    try {
        const client = new MongoClient('mongodb+srv://priteshhesta:xp7vccnYJWYqgPly@cluster0.kajp98n.mongodb.net', { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        return client.db('chatbot');
    } catch (error) {
        console.log("ERROR:", error)
    }
}

const fetchDataFromMongoDB = async () => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection('faq');
        const faqs = await collection.find().toArray();
        const outputData = transformToDocumentArray(faqs)
        return outputData
    } catch (error) {
        console.log("ERROR:", error)
    }
}

const getAns = async () => {
    try {
        const docs = await fetchDataFromMongoDB();
        const vectorStore = await FaissStore.fromDocuments(docs, embeddings);
        const resultOne = await vectorStore.similaritySearch("I am looking for a sealer that I could", 1);
        console.log("OUTPUT:", resultOne);
    } catch (error) {
        console.log("ERROR:", error)
    }
}

getAns();