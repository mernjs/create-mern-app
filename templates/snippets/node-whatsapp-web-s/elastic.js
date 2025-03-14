const express = require('express');
const { Client } = require('@elastic/elasticsearch');
const tf = require('@tensorflow/tfjs');
const use = require('@tensorflow-models/universal-sentence-encoder');

let model;

const loadModel = async () => {
    model = await use.load();
};

const generateVector = async (text) => {
    if (!model) {
        throw new Error("Model not loaded. Call loadModel first.");
    }
    const embeddings = await model.embed(text);
    const vectorArray = embeddings.arraySync()[0]; // Get the first result as an array
    return vectorArray;
};

// Call loadModel on startup
loadModel().then(() => {
    console.log("Model loaded successfully.");
}).catch(err => {
    console.error("Error loading model:", err);
});

const client = new Client({
    node: '',
    auth: {
        apiKey: ''
    }
});

const app = express();
const port = 3000;

app.use(express.json());


(async () => {
    const resp = await client.info();
    console.log("RES =>", resp)
})()

// Create index with vector mapping
const createIndex = async () => {
    try {
        const indexExists = await client.indices.exists({ index: 'books' });
        if (!indexExists.body) {
            await client.indices.create({
                index: 'books_data',
                body: {
                    mappings: {
                        properties: {
                            name: { type: 'text' },
                            author: { type: 'text' },
                            release_date: { type: 'date' },
                            page_count: { type: 'integer' },
                            vector: {
                                type: 'dense_vector',
                                dims: 128 // Adjust as necessary
                            }
                        }
                    }
                }
            });
            console.log("Index created");
        }
    } catch (error) {
        console.error("Error creating index:", error);
    }
}

createIndex().then(() => {
    console.log("createIndex.");
}).catch(err => {
    console.error("Error createIndex:", err);
});


const checkDocuments = async () => {
    const allDocs = await client.search({
        index: 'books_data',
        body: {
            query: { match_all: {} }
        }
    });
    console.log("BOOKS ==>>>", allDocs.hits.hits);
};

checkDocuments();


app.post('/webhook', async (req, res) => {
    try {
        const dataset = [
            { name: "Snow Crash", author: "Neal Stephenson", release_date: "1992-06-01", page_count: 470, vector: generateVector("Snow Crash") },
            { name: "Revelation Space", author: "Alastair Reynolds", release_date: "2000-03-15", page_count: 585, vector: generateVector("Revelation Space") },
            { name: "1984", author: "George Orwell", release_date: "1985-06-01", page_count: 328, vector: generateVector("1984") },
            { name: "Fahrenheit 451", author: "Ray Bradbury", release_date: "1953-10-15", page_count: 227, vector: generateVector("Fahrenheit 451") },
            { name: "Brave New World", author: "Aldous Huxley", release_date: "1932-06-01", page_count: 268, vector: generateVector("Brave New World") },
            { name: "The Handmaid's Tale", author: "Margaret Atwood", release_date: "1985-06-01", page_count: 311, vector: generateVector("The Handmaid's Tale") },
        ];

        const result = await client.helpers.bulk({
            datasource: dataset,
            onDocument: (doc) => ({ index: { _index: 'books_data' }, document: doc }),
        });

        console.log(result);
        res.status(200).send({ message: 'Books indexed in Elasticsearch' });
    } catch (error) {
        console.error('Error storing message in Elasticsearch:', error);
        res.status(500).send('Error storing message');
    }
});

app.post('/search', async (req, res) => {
    const searchVector = generateVector(req.body.message); // Generate vector for the search query

    try {
        const searchResult = await client.search({
            index: 'books_data',
            body: {
                query: {
                    script_score: {
                        query: { match_all: {} },
                        script: {
                            source: "cosineSimilarity(params.queryVector, 'vector') + 1.0",
                            params: { queryVector: searchVector }
                        }
                    }
                }
            }
        });

        res.status(200).send({ message: 'Success', data: searchResult.hits.hits });
    } catch (error) {
        console.error('Error performing search:', error);
        res.status(500).send({ message: error });
    }
});

app.listen(port, () => {
    console.log(`Webhook server listening at http://localhost:${port}`);
});