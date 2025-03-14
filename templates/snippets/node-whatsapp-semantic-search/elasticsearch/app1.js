const { Client } = require('@elastic/elasticsearch');

// Initialize Elasticsearch client
const client = new Client({
    node: '',
    auth: {
        apiKey: ''
    }
});

// Sample dataset with embeddings (replace with actual embeddings for each message)
const dataset = [
    { "Sender": "Alice", "Receiver": "Bob", "Timestamp": "2023-10-01 09:00:00", "Message": "Hey Bob! Are we still on for the meeting?" },
    { "Sender": "Bob", "Receiver": "Alice", "Timestamp": "2023-10-01 09:01:00", "Message": "Yes, see you at 10!" },
    { "Sender": "Alice", "Receiver": "Charlie", "Timestamp": "2023-10-01 09:05:00", "Message": "Hey Charlie, do you want to join the meeting?" },
    { "Sender": "Charlie", "Receiver": "Alice", "Timestamp": "2023-10-01 09:06:00", "Message": "Sure! What time?" },
    { "Sender": "Alice", "Receiver": "Bob", "Timestamp": "2023-10-01 09:10:00", "Message": "By the way, do we have the agenda?" },
    { "Sender": "Bob", "Receiver": "Alice", "Timestamp": "2023-10-01 09:11:00", "Message": "I’ll send it over shortly." },
    { "Sender": "Alice", "Receiver": "Bob", "Timestamp": "2023-10-01 09:15:00", "Message": "Thanks! Looking forward to it." },
    { "Sender": "Bob", "Receiver": "Alice", "Timestamp": "2023-10-01 09:16:00", "Message": "No problem!" },
    { "Sender": "Charlie", "Receiver": "Alice", "Timestamp": "2023-10-01 09:20:00", "Message": "I’ll bring some snacks." },
    { "Sender": "Alice", "Receiver": "Charlie", "Timestamp": "2023-10-01 09:21:00", "Message": "Awesome! Thanks, Charlie!" }
];

// Step 1: Create an index with a dense vector field
async function createIndex() {
    await client.indices.create({
        index: 'messages_datas',
        body: {
            mappings: {
                properties: {
                    Sender: { type: 'keyword' },
                    Receiver: { type: 'keyword' },
                    Timestamp: { type: 'date' },
                    Message: { type: 'text' },
                    vector: { type: 'dense_vector', dims: 3 }  // Adjust `dims` based on vector size
                }
            }
        }
    }, { ignore: [400] }); // Ignore if index already exists
    console.log("Index created or already exists.");
}

// Step 2: Index documents with vector data
async function indexDocuments() {
    const operations = dataset.flatMap(doc => [
        { index: { _index: 'messages_datas' } },
        doc
    ]);

    await client.bulk({ refresh: true, body: operations });
    console.log("Documents indexed.");
}

// Step 3: Perform vector search
async function vectorSearch(queryVector) {
    const response = await client.search({
        index: 'messages_datas',
        body: {
            size: 5,
            query: {
                script_score: {
                    query: { match_all: {} },
                    script: {
                        source: "cosineSimilarity(params.query_vector, 'vector') + 1.0",
                        params: { query_vector: queryVector }
                    }
                }
            }
        }
    });

    console.log("Search results:");
    response.hits.hits.forEach((hit, idx) => {
        console.log(`${idx + 1}. Message: ${hit._source.Message}, Score: ${hit._score}`);
    });
}

// Main function to run the steps
(async () => {
    try {
        // Step 1: Create index
        await createIndex();

        // Step 2: Index the dataset documents
        await indexDocuments();

        // Step 3: Run vector search with a sample query vector
        const queryVector = [0.1, 0.2, 0.3]; // Replace with actual query vector
        await vectorSearch(queryVector);
    } catch (error) {
        console.error("Error in Elasticsearch operations:", error);
    }
})();
