const { Client } = require('@elastic/elasticsearch');

const esClient = new Client({
    node: '',
    auth: {
        apiKey: ''
    }
});

// Function to create index with ELSER
async function createIndex() {
    await esClient.indices.create({
        index: 'books',
        mappings: {
            properties: {
                name: { type: 'text' },
                author: { type: 'text' },
                release_date: { type: 'date' },
                page_count: { type: 'integer' },
                embedding: { type: 'dense_vector', dims: 128 } // Adjust dims as per ELSER output
            }
        }
    }, { ignore: [400] }); // Ignore "index already exists" error
}

// Function to index a document with ELSER embeddings
async function indexDocument(book) {
    const response = await esClient.index({
        index: 'books',
        body: {
            name: book.name,
            author: book.author,
            release_date: book.release_date,
            page_count: book.page_count,
            embedding: {
                "els": {
                    "model": "els:default" // Specify ELSER model
                }
            }
        }
    });
    console.log(`Indexed document: ${book.name}`, response.body);
}

// Function to search for similar books
async function searchSimilar(embedding) {
    const response = await esClient.search({
        index: 'books',
        body: {
            query: {
                script_score: {
                    query: { match_all: {} },
                    script: {
                        source: "cosineSimilarity(params.query_vector, doc['embedding']) + 1.0",
                        params: {
                            query_vector: embedding
                        }
                    }
                }
            }
        }
    });

    return response.body.hits.hits;
}

// Main function to run the workflow
(async () => {
    await createIndex();

    const dataset = [
        { name: "Snow Crash", author: "Neal Stephenson", release_date: "1992-06-01", page_count: 470 },
        { name: "Revelation Space", author: "Alastair Reynolds", release_date: "2000-03-15", page_count: 585 },
        { name: "1984", author: "George Orwell", release_date: "1985-06-01", page_count: 328 },
        { name: "Fahrenheit 451", author: "Ray Bradbury", release_date: "1953-10-15", page_count: 227 },
        { name: "Brave New World", author: "Aldous Huxley", release_date: "1932-06-01", page_count: 268 },
        { name: "The Handmaid's Tale", author: "Margaret Atwood", release_date: "1985-06-01", page_count: 311 },
    ];

    for (const book of dataset) {
        await indexDocument(book);
    }

    // Example search for a similar book
    const searchText = "Snow Crash"; // Replace with the book title you want to search
    const searchResponse = await esClient.index({
        index: 'books',
        body: {
            embedding: {
                "els": {
                    "model": "els:default",
                    "text": searchText
                }
            }
        }
    });

    const results = await searchSimilar(searchResponse.body.embedding);

    console.log('Search Results:', results);
})();
