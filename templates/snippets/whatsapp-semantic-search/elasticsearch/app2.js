const { Client } = require('@elastic/elasticsearch');

// Initialize Elasticsearch client
const client = new Client({
    node: '',
    auth: {
        apiKey: ''
    }
});

// Function to normalize vector to unit length
function normalizeVector(vector) {
    // Calculate magnitude
    const magnitude = Math.sqrt(vector.reduce((sum, val) => sum + val * val, 0));

    // Normalize each component
    return vector.map(val => val / magnitude);
}

// Sample dataset with normalized vectors
const dataset = [
    {
        "Sender": "Alice",
        "Receiver": "Bob",
        "Timestamp": "2023-10-01 09:00:00",
        "Message": "Hey Bob! Are we still on for the meeting?",
        "vector": normalizeVector([0.1, 0.2, 0.3])
    },
    {
        "Sender": "Bob",
        "Receiver": "Alice",
        "Timestamp": "2023-10-01 09:01:00",
        "Message": "Yes, see you at 10!",
        "vector": normalizeVector([0.2, 0.3, 0.4])
    },
    {
        "Sender": "Alice",
        "Receiver": "Charlie",
        "Timestamp": "2023-10-01 09:05:00",
        "Message": "Hey Charlie, do you want to join the meeting?",
        "vector": normalizeVector([0.3, 0.4, 0.5])
    }
];

// Step 1: Create an index
async function createIndex() {
    try {
        // Delete existing index if it exists
        const indexExists = await client.indices.exists({ index: 'messages_datas' });
        if (indexExists) {
            await client.indices.delete({ index: 'messages_datas' });
            console.log("Existing index deleted.");
        }

        // Create new index with cosine similarity
        await client.indices.create({
            index: 'messages_datas',
            body: {
                mappings: {
                    properties: {
                        Sender: { type: 'keyword' },
                        Receiver: { type: 'keyword' },
                        Timestamp: { type: 'date' },
                        Message: { type: 'text' },
                        vector: {
                            type: 'dense_vector',
                            dims: 3,
                            index: true,
                            similarity: 'cosine'
                        }
                    }
                }
            }
        });
        console.log("Index created successfully.");
    } catch (error) {
        console.error("Error creating index:", error.meta?.body?.error || error);
    }
}

// Step 2: Index documents
async function indexDocuments() {
    try {
        const operations = dataset.flatMap(doc => [
            { index: { _index: 'messages_datas' } },
            {
                ...doc,
                Timestamp: new Date(doc.Timestamp).toISOString()
            }
        ]);

        const response = await client.bulk({
            refresh: true,
            body: operations
        });

        if (response.errors) {
            const errors = response.items
                .filter(item => item.index.error)
                .map(item => item.index.error);
            console.log("Indexing errors:", errors);
        } else {
            console.log(`Successfully indexed ${dataset.length} documents.`);
        }
    } catch (error) {
        console.error("Indexing error:", error.meta?.body?.error || error);
    }
}

// Step 3: Search documents
async function searchDocuments(queryVector) {
    try {
        // Normalize the query vector
        const normalizedQueryVector = normalizeVector(queryVector);

        const response = await client.search({
            index: 'messages_datas',
            body: {
                size: 5,
                _source: ["Message", "Sender", "Receiver", "Timestamp"],
                query: {
                    match_all: {}
                },
                knn: {
                    field: "vector",
                    query_vector: normalizedQueryVector,
                    k: 5,
                    num_candidates: 10
                }
            }
        });

        console.log("\nSearch results:");
        if (response.hits.hits.length === 0) {
            console.log("No results found.");
        } else {
            response.hits.hits.forEach((hit, idx) => {
                console.log(`\n${idx + 1}. Score: ${hit._score.toFixed(4)}`);
                console.log(`Message: ${hit._source.Message}`);
                console.log(`From: ${hit._source.Sender} To: ${hit._source.Receiver}`);
                console.log(`Time: ${hit._source.Timestamp}`);
            });
        }
    } catch (error) {
        console.error("Search error:", error.meta?.body?.error || error);
        if (error.meta?.body?.error?.root_cause) {
            console.error("Root cause:", error.meta.body.error.root_cause);
        }
    }
}

// Main function
async function main() {
    try {
        console.log("Starting Elasticsearch operations...");

        // Create index
        await createIndex();
        console.log("Waiting for index creation...");
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Index documents
        await indexDocuments();
        console.log("Waiting for indexing to complete...");
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Perform search with normalized query vector
        const queryVector = [0.1, 0.2, 0.3];
        console.log("\nSearching with query vector:", queryVector);
        await searchDocuments(queryVector);

    } catch (error) {
        console.error("Main operation error:", error);
    }
}

// Run the application
main();