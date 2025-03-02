const { Client } = require('@elastic/elasticsearch');
const Table = require('cli-table3');
const dataset = require('./dataset')

// Initialize Elasticsearch client
const client = new Client({
    node: '',
    auth: {
        apiKey: ''
    }
});

// Create index with enhanced mappings
async function createIndex() {
    try {
        const indexExists = await client.indices.exists({ index: 'messages_unified' });
        if (indexExists) {
            await client.indices.delete({ index: 'messages_unified' });
            console.log("Existing index deleted.");
        }

        await client.indices.create({
            index: 'messages_unified',
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
                                keyword: { type: 'keyword' }
                            }
                        },
                        Context: { type: 'text', analyzer: 'qa_analyzer' },
                        Topics: { type: 'keyword' },
                        MessageType: { type: 'keyword' },
                        Priority: { type: 'keyword' }
                    }
                }
            }
        });
        console.log("Index created successfully.");
    } catch (error) {
        console.error("Error creating index:", error.meta?.body?.error || error);
    }
}

// Index documents
async function indexDocuments() {
    try {
        const operations = dataset.flatMap(doc => [
            { index: { _index: 'messages_unified' } },
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

// Unified question handling
async function handleQuestion(question) {
    const questionType = analyzeQuestionType(question);

    try {
        switch (questionType) {
            case 'REPORT_SUMMARY':
                await generateMessageSummary();
                break;
            case 'REPORT_TABLE':
                await generateTableReport();
                break;
            case 'WHO':
                await answerWhoQuestion(question);
                break;
            case 'WHEN':
                await answerWhenQuestion(question);
                break;
            case 'VERIFICATION':
                await answerVerificationQuestion(question);
                break;
            case 'GENERAL':
                await answerGeneralQuestion(question);
                break;
            default:
                console.log("I'm not sure how to answer that question. Could you rephrase it?");
        }
    } catch (error) {
        console.error("Error handling question:", error);
    }
}

// Question type analysis
function analyzeQuestionType(question) {
    const questionLower = question.toLowerCase();

    if (questionLower.includes('summary')) return 'REPORT_SUMMARY';
    if (questionLower.includes('table') || questionLower.includes('report')) return 'REPORT_TABLE';
    if (questionLower.includes('who')) return 'WHO';
    if (questionLower.includes('when') || questionLower.includes('what time')) return 'WHEN';
    if (questionLower.startsWith('is') || questionLower.startsWith('are')) return 'VERIFICATION';
    return 'GENERAL';
}

// Specific question handlers
async function answerWhoQuestion(question) {
    const response = await client.search({
        index: 'messages_unified',
        body: {
            size: 5,
            query: {
                bool: {
                    must: [
                        {
                            multi_match: {
                                query: question,
                                fields: ['Message^2', 'Context', 'Topics'],
                                fuzziness: 'AUTO'
                            }
                        }
                    ]
                }
            }
        }
    });

    console.log("\nAnswer:");
    if (response.hits.hits.length === 0) {
        console.log("I couldn't find any relevant information.");
        return;
    }

    const participants = new Set();
    response.hits.hits.forEach(hit => {
        participants.add(hit._source.Sender);
        participants.add(hit._source.Receiver);
    });

    console.log("The following people are involved:");
    participants.forEach(person => console.log(`- ${person}`));
}

async function answerWhenQuestion(question) {
    const response = await client.search({
        index: 'messages_unified',
        body: {
            size: 5,
            query: {
                bool: {
                    must: [
                        {
                            multi_match: {
                                query: question,
                                fields: ['Message^2', 'Context', 'Topics'],
                                fuzziness: 'AUTO'
                            }
                        }
                    ]
                }
            }
        }
    });

    console.log("\nAnswer:");
    if (response.hits.hits.length === 0) {
        console.log("I couldn't find any specific time information.");
        return;
    }

    response.hits.hits.forEach(hit => {
        const msg = hit._source;
        if (msg.Message.toLowerCase().includes('time') ||
            msg.Message.includes(':') ||
            msg.Context.toLowerCase().includes('time')) {
            console.log(`According to ${msg.Sender}: ${msg.Message}`);
        }
    });
}

async function answerVerificationQuestion(question) {
    const response = await client.search({
        index: 'messages_unified',
        body: {
            size: 5,
            query: {
                bool: {
                    must: [
                        {
                            multi_match: {
                                query: question,
                                fields: ['Message^2', 'Context', 'Topics'],
                                fuzziness: 'AUTO'
                            }
                        }
                    ]
                }
            }
        }
    });

    console.log("\nAnswer:");
    if (response.hits.hits.length === 0) {
        console.log("I couldn't find any relevant information to verify this.");
        return;
    }

    const relevantMessages = response.hits.hits.map(hit => hit._source.Message);
    console.log("Based on the messages:");
    relevantMessages.forEach(msg => console.log(`- ${msg}`));
}

async function answerGeneralQuestion(question) {
    const response = await client.search({
        index: 'messages_unified',
        body: {
            size: 5,
            query: {
                multi_match: {
                    query: question,
                    fields: ['Message^2', 'Context', 'Topics'],
                    fuzziness: 'AUTO'
                }
            }
        }
    });

    console.log("\nAnswer:");
    if (response.hits.hits.length === 0) {
        console.log("I couldn't find any relevant information.");
        return;
    }

    console.log("Here are the relevant messages I found:");
    response.hits.hits.forEach((hit, index) => {
        const msg = hit._source;
        console.log(`\n${index + 1}. From ${msg.Sender} to ${msg.Receiver}:`);
        console.log(`   "${msg.Message}"`);
        console.log(`   Context: ${msg.Context}`);
    });
}

// Reporting functions (from previous version)
async function generateMessageSummary() {
    try {
        const response = await client.search({
            index: 'messages_unified',
            body: {
                size: 1000,
                sort: [{ Timestamp: 'asc' }],
                aggs: {
                    message_types: {
                        terms: { field: 'MessageType' }
                    },
                    participants: {
                        terms: { field: 'Sender' }
                    },
                    topics: {
                        terms: { field: 'Topics' }
                    }
                }
            }
        });

        console.log("\nMessage Summary Report");
        console.log("====================");

        console.log(`\nTotal Messages: ${response.hits.hits.length}`);

        console.log("\nMessage Types:");
        response.aggregations.message_types.buckets.forEach(bucket => {
            console.log(`- ${bucket.key}: ${bucket.doc_count} messages`);
        });

        console.log("\nParticipant Activity:");
        response.aggregations.participants.buckets.forEach(bucket => {
            console.log(`- ${bucket.key}: ${bucket.doc_count} messages sent`);
        });

        console.log("\nTopics Discussed:");
        response.aggregations.topics.buckets.forEach(bucket => {
            console.log(`- ${bucket.key}: ${bucket.doc_count} mentions`);
        });

        console.log("\nChronological Message Flow:");
        response.hits.hits.forEach(hit => {
            const msg = hit._source;
            console.log(`- ${new Date(msg.Timestamp).toLocaleString()}: ${msg.Sender} → ${msg.Receiver}: ${msg.Message}`);
        });
    } catch (error) {
        console.error("Error generating summary:", error);
    }
}

async function generateTableReport() {
    try {
        const response = await client.search({
            index: 'messages_unified',
            body: {
                size: 1000,
                sort: [{ Timestamp: 'asc' }]
            }
        });

        const table = new Table({
            head: ['Time', 'From', 'To', 'Type', 'Message', 'Topics'],
            colWidths: [25, 10, 10, 12, 40, 20]
        });

        response.hits.hits.forEach(hit => {
            const msg = hit._source;
            table.push([
                new Date(msg.Timestamp).toLocaleString(),
                msg.Sender,
                msg.Receiver,
                msg.MessageType,
                msg.Message,
                msg.Topics.join(', ')
            ]);
        });

        console.log("\nDetailed Message Report");
        console.log("=====================");
        console.log(table.toString());

        const stats = {
            totalMessages: response.hits.hits.length,
            uniqueUsers: new Set([
                ...response.hits.hits.map(hit => hit._source.Sender),
                ...response.hits.hits.map(hit => hit._source.Receiver)
            ]).size,
            messageTypes: new Set(response.hits.hits.map(hit => hit._source.MessageType)).size
        };

        console.log("\nReport Statistics");
        console.log("=================");
        console.log(`Total Messages: ${stats.totalMessages}`);
        console.log(`Unique Users: ${stats.uniqueUsers}`);
        console.log(`Message Types: ${stats.messageTypes}`);
    } catch (error) {
        console.error("Error generating table report:", error);
    }
}

// Main function
async function main() {
    try {
        console.log("Starting Unified Q&A System...");

        await createIndex();
        console.log("Waiting for index creation...");
        await new Promise(resolve => setTimeout(resolve, 2000));

        await indexDocuments();
        console.log("Waiting for indexing to complete...");
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Example questions to test different types of queries
        const questions = [
            "Who is involved in the meeting?",
            "What time is the meeting?",
            "Is there a meeting planned?",
            "Who sent messages to Bob?",
            "Could you please provide a summary of all messages?",
            "Could you present today's report in a table format?"
        ];

        for (const question of questions) {
            console.log(`\nQuestion: ${question}`);
            await handleQuestion(question);
            console.log("\n-------------------");
        }

    } catch (error) {
        console.error("Main operation error:", error);
    } finally {
        process.exit(0);
    }
}

// Run the application
main();