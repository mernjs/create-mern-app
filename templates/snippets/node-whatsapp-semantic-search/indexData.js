// indexData.js
const client = require('./elasticsearch');
const dataset = require('./dataset.json');
require('dotenv').config();


async function getEmbedding(text) {
    try {
        const response = await client.ml.inferTrainedModel({
            model_id: '.elser_model_2',
            body: {
                docs: [{ text_field: text }],
            },
        });
        const embedding = response.inference_results[0].predicted_value
        return embedding;
    } catch (error) {
        console.error('Error generating embedding:', error);
        throw error;
    }
}


async function createIndex() {
    const indexExists = await client.indices.exists({ index: process.env.INDEX_NAME });

    if (indexExists) {
        await client.indices.delete({ index: process.env.INDEX_NAME });
        console.log(`Index "${process.env.INDEX_NAME}" deleted.`);
    }

    await client.indices.create({
        index: process.env.INDEX_NAME,
        body: {
            mappings: {
                properties: {
                    sender: { type: 'keyword' },
                    receiver: { type: 'keyword' },
                    timestamp: { type: 'date', format: 'yyyy-MM-dd HH:mm:ss' },
                    message: { type: 'text' },
                    topics: { type: 'keyword' },
                    embedding: {
                        type: 'dense_vector',
                        dims: 768 
                    }
                }
            }
        }
    });

    console.log(`Index "${process.env.INDEX_NAME}" created successfully.`);
}


async function indexData() {
    try {
        const bulkOps = [];

        for (const message of dataset) {
            const { Sender, Receiver, Timestamp, Message, Topics } = message;
            const combinedText = `${Sender} ${Receiver} ${Timestamp} ${Message} ${Topics.join(' ')}`;
            const embedding = await getEmbedding(combinedText);
            if (embedding) { 
                bulkOps.push(
                    { index: { _index: process.env.INDEX_NAME } },
                    { ...message, embedding: embedding }
                );
            } else {
                console.warn(`Skipping document due to missing embedding: ${message}`);
            }
        }
        await client.bulk({ refresh: true, body: bulkOps });
        console.log('All messages indexed successfully!');
    } catch (error) {
        console.error('Errors occurred during bulk indexing.');

    }
}


(async () => {
    try {
        await createIndex();
        await indexData();
        process.exit(0);
    } catch (error) {
        console.error('Error indexing data:', error);
        process.exit(1);
    }
})();
