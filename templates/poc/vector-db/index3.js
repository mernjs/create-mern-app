import { MongoClient } from 'mongodb'
import { FaissStore } from "@langchain/community/vectorstores/faiss"
import { CohereEmbeddings } from "@langchain/cohere"
const COHERE_API_KEY = "";
const embeddings = new CohereEmbeddings({ apiKey: COHERE_API_KEY });

const connectToDatabase = async () => {
    try {
        const client = new MongoClient('', { useNewUrlParser: true, useUnifiedTopology: true });
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
        let questions = [];
        let ids = [];
        faqs.forEach(item => {
            const { Question, Answer, _id } = item;
            if (Question && Answer) {
                questions.push(`Question: ${Question}, \n Answer: ${Answer}`);
                ids.push({ id: _id })
            }
        });
        return { questions, ids };
    } catch (error) {
        console.log("ERROR:", error)
    }
}

async function getAns() {
    try {
        const docs = await fetchDataFromMongoDB();
        const vectorStore = await FaissStore.fromTexts(docs.questions, docs.ids, embeddings);
        const resultOne = await vectorStore.similaritySearch("Where is Clark's?", 1);
        console.log("OUTPUT:", resultOne);
    } catch (error) {
        console.log("ERROR:", error)
    }
}

getAns();