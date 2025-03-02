const express = require('express');
const { Client } = require('@elastic/elasticsearch');
const use = require('@tensorflow-models/universal-sentence-encoder');
const tf = require('@tensorflow/tfjs-node');

const client = new Client({
    node: '',
    auth: {
        apiKey: ''
    }
});

const app = express();
const port = 3000;

app.use(express.json());

let model;

// Load the Universal Sentence Encoder model
const loadModel = async () => {
    await tf.ready(); // Ensure the backend is ready
    model = await use.load();
};

// Call the loadModel function at startup
loadModel().catch(console.error);

// Function to generate embeddings using the Universal Sentence Encoder
const getEmbedding = async (text) => {
    const embeddings = await model.embed([text]);
    const array = await embeddings.array();
    return array[0];
};


// Create index with vector mapping
const createIndexIfNotExists = async () => {
    const indexName = 'whatsapp_messages';
    try {
        const exists = await client.indices.exists({ index: indexName });

        if (!exists.body) {
            await client.indices.create({
                index: indexName,
                body: {
                    mappings: {
                        properties: {
                            name: { type: 'text' },
                            message: { type: 'text' },
                            date: { type: 'date' },
                            group_name: { type: 'text' },
                            vector: { type: 'dense_vector', dims: 512 }
                        }
                    }
                }
            });
            console.log(`Index ${indexName} created.`);
        } else {
            console.log(`Index ${indexName} already exists.`);
        }
    } catch (error) {
        console.error('Error checking or creating index:');
    }
};

// Call the createIndexIfNotExists function at startup
createIndexIfNotExists().catch(console.error);


app.post('/webhook', async (req, res) => {
    try {
        const dataset = await Promise.all([
            { name: "Snow Crash", message: "Neal Stephenson", date: "1992-06-01", group_name: "IMC 2024" },
            { name: "Revelation Space", message: "Alastair Reynolds", date: "2000-03-15", group_name: "IMC 2024" },
            { name: "1984", message: "George Orwell", date: "1985-06-01", group_name: "IMC 2024" },
            { name: "Fahrenheit 451", message: "Ray Bradbury", date: "1953-10-15", group_name: "IMC 2024" },
            { name: "Brave New World", message: "Aldous Huxley", date: "1932-06-01", group_name: "IMC 2024" },
            { name: "The Handmaid's Tale", message: "Margaret Atwood", date: "1985-06-01", group_name: "IMC 2024" },
        ].map(async item => {
            const vector = await getEmbedding(item.message);
            console.log("vector", vector)
            return { ...item, vector };
        }));

        const result = await client.helpers.bulk({
            datasource: dataset,
            onDocument: (doc) => ({
                index: { _index: 'whatsapp_messages' },
                document: {
                    ...doc,
                    vector: doc.vector
                }
            }),
        });

        res.status(200).send({ message: 'Messages received and stored in Elasticsearch' });
    } catch (error) {
        console.error('Error storing messages in Elasticsearch:', error);
        res.status(500).send('Error storing messages');
    }
});

app.post('/search', async (req, res) => {
    const { query } = req.body;

    try {
        const vector = await getEmbedding(query); // Get the embedding for the search query

        const response = await client.search({
            index: 'whatsapp_messages',
            body: {
                query: {
                    script_score: {
                        query: {
                            match_all: {},
                        },
                        script: {
                            source: "cosineSimilarity(params.query_vector, 'vector') + 1.0",
                            params: {
                                query_vector: vector,
                            },
                        },
                    },
                },
            },
        });

        res.status(200).send(response.body.hits.hits);
    } catch (error) {
        console.error('Error performing vector search:', error);
        res.status(500).send('Error performing search');
    }
});

app.listen(port, () => {
    console.log(`Webhook server listening at http://localhost:${port}`);
});
