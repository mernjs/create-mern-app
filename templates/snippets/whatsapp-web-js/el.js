const { Client } = require('@elastic/elasticsearch');

// Initialize Elasticsearch client
const client = new Client({
    node: '',
    auth: {
        apiKey: ''
    }
});

// Function to index data
async function indexData() {
    const documents = [
        { id: 1, text: 'Sample document 1' },
        { id: 2, text: 'Another example document' },
        { id: 3, text: 'Elasticsearch is great for searching' },
        { id: 4, text: 'Node.js makes backend development easier' },
        { id: 5, text: 'Sample document about machine learning' },
    ];

    for (const doc of documents) {
        await client.index({
            index: 'my_index',
            id: doc.id,
            body: {
                text: doc.text,
            },
        });
    }

    // Refresh the index to make the documents searchable
    await client.indices.refresh({ index: 'my_index' });
    console.log('Documents indexed successfully');
}

// Function to perform similarity search
async function searchSimilarDocuments(queryText) {
    const response = await client.search({
        index: 'my_index',
        body: {
            query: {
                match: {
                    text: queryText,
                },
            },
        },
    });

    return response.body.hits.hits.map(hit => hit._source);
}

// Main function to run the app
async function main() {
    await indexData();

    const queryText = 'Sample document';
    const results = await searchSimilarDocuments(queryText);

    console.log('Similar documents:', results);
}

// Execute the main function
main().catch(console.error);
