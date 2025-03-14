const { Client } = require('@elastic/elasticsearch');

// Initialize Elasticsearch client
const client = new Client({
    node: '',
    auth: {
        apiKey: ''
    }
});

// Expanded dataset with more diverse messages for better Q&A
const dataset = [
    {
        "Sender": "Alice",
        "Receiver": "Bob",
        "Timestamp": "2023-10-01 09:00:00",
        "Message": "Hey Bob! Are we still on for the meeting?",
        "Context": "Meeting schedule confirmation",
        "Topics": ["meeting", "schedule", "confirmation"]
    },
    {
        "Sender": "Bob",
        "Receiver": "Alice",
        "Timestamp": "2023-10-01 09:01:00",
        "Message": "Yes, see you at 10!",
        "Context": "Meeting time confirmation",
        "Topics": ["meeting", "time", "confirmation"]
    },
    {
        "Sender": "Alice",
        "Receiver": "Charlie",
        "Timestamp": "2023-10-01 09:05:00",
        "Message": "Hey Charlie, do you want to join the meeting?",
        "Context": "Meeting invitation",
        "Topics": ["meeting", "invitation"]
    }
];

// Step 1: Create an index with enhanced mappings for Q&A
async function createIndex() {
    try {
        const indexExists = await client.indices.exists({ index: 'messages_qa' });
        if (indexExists) {
            await client.indices.delete({ index: 'messages_qa' });
            console.log("Existing index deleted.");
        }

        await client.indices.create({
            index: 'messages_qa',
            body: {
                settings: {
                    analysis: {
                        analyzer: {
                            qa_analyzer: {
                                type: 'custom',
                                tokenizer: 'standard',
                                filter: ['lowercase', 'stop', 'snowball']
                            }
                        }
                    }
                },
                mappings: {
                    properties: {
                        Sender: { type: 'keyword' },
                        Receiver: { type: 'keyword' },
                        Timestamp: { type: 'date' },
                        Message: {
                            type: 'text',
                            analyzer: 'qa_analyzer',
                            fields: {
                                keyword: {
                                    type: 'keyword'
                                }
                            }
                        },
                        Context: {
                            type: 'text',
                            analyzer: 'qa_analyzer'
                        },
                        Topics: {
                            type: 'keyword'
                        }
                    }
                }
            }
        });
        console.log("Index created successfully with Q&A mappings.");
    } catch (error) {
        console.error("Error creating index:", error.meta?.body?.error || error);
    }
}

// Step 2: Index documents with enhanced context
async function indexDocuments() {
    try {
        const operations = dataset.flatMap(doc => [
            { index: { _index: 'messages_qa' } },
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

// Step 3: Enhanced Q&A search function
async function answerQuestion(question) {
    try {
        // First, analyze the question to determine the type of answer needed
        const questionType = analyzeQuestion(question);

        const searchBody = buildSearchQuery(question, questionType);

        const response = await client.search({
            index: 'messages_qa',
            body: searchBody
        });

        console.log("\nQuestion:", question);
        console.log("\nAnswer:");

        if (response.hits.hits.length === 0) {
            console.log("I couldn't find a specific answer to that question in the messages.");
        } else {
            formatAnswer(response.hits.hits, questionType);
        }
    } catch (error) {
        console.error("Q&A error:", error.meta?.body?.error || error);
    }
}

// Helper function to analyze question type
function analyzeQuestion(question) {
    const questionLower = question.toLowerCase();

    if (questionLower.includes('who')) return 'PERSON';
    if (questionLower.includes('when')) return 'TIME';
    if (questionLower.includes('where')) return 'LOCATION';
    if (questionLower.includes('what time')) return 'TIME';
    if (questionLower.includes('is there')) return 'VERIFICATION';
    return 'GENERAL';
}

// Helper function to build search query based on question type
function buildSearchQuery(question, questionType) {
    const baseQuery = {
        size: 3,
        query: {
            bool: {
                must: [
                    {
                        multi_match: {
                            query: question,
                            fields: ['Message^3', 'Context^2', 'Topics'],
                            fuzziness: 'AUTO',
                            operator: 'or'
                        }
                    }
                ],
                should: [
                    {
                        match_phrase: {
                            Message: {
                                query: question,
                                boost: 2
                            }
                        }
                    }
                ]
            }
        },
        highlight: {
            fields: {
                Message: {},
                Context: {}
            }
        }
    };

    // Add type-specific boosting
    switch (questionType) {
        case 'PERSON':
            baseQuery.query.bool.should.push({
                terms: {
                    'Sender.keyword': ['Alice', 'Bob', 'Charlie'],
                    boost: 2
                }
            });
            break;
        case 'TIME':
            baseQuery._source = ['Message', 'Timestamp', 'Context'];
            break;
        // Add more cases as needed
    }

    return baseQuery;
}

// Helper function to format answers based on question type
function formatAnswer(hits, questionType) {
    hits.forEach((hit, idx) => {
        const source = hit._source;
        const highlights = hit.highlight || {};

        console.log(`\nRelevant Message ${idx + 1} (Score: ${hit._score.toFixed(2)}):`);

        switch (questionType) {
            case 'PERSON':
                console.log(`From: ${source.Sender} To: ${source.Receiver}`);
                console.log(`Message: ${source.Message}`);
                break;
            case 'TIME':
                console.log(`Time: ${new Date(source.Timestamp).toLocaleString()}`);
                console.log(`Message: ${source.Message}`);
                break;
            case 'VERIFICATION':
                console.log(`Message: ${source.Message}`);
                console.log(`Context: ${source.Context}`);
                break;
            default:
                console.log(`Message: ${source.Message}`);
                if (highlights.Message) {
                    console.log(`Relevant part: ${highlights.Message.join(' ... ')}`);
                }
        }

        if (source.Context) {
            console.log(`Context: ${source.Context}`);
        }
    });
}

// Main function
async function main() {
    try {
        // console.log("Starting Q&A System...");

        // await createIndex();
        // console.log("Waiting for index creation...");
        // await new Promise(resolve => setTimeout(resolve, 2000));

        // await indexDocuments();
        // console.log("Waiting for indexing to complete...");
        // await new Promise(resolve => setTimeout(resolve, 2000));

        // // Example questions to test the system
        // const questions = [
        //     "Who is involved in the meeting?",
        //     "What time is the meeting?",
        //     "Is there a meeting planned?",
        //     "Who sent messages to Bob?"
        // ];

        // for (const question of questions) {
        //     await answerQuestion(question);
        //     console.log("\n-------------------");
        // }

        await answerQuestion("Can you share summery of all messages?");

    } catch (error) {
        console.error("Main operation error:", error);
    } finally {
        process.exit(0);
    }
}

// Run the application
main();