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

// Updated question handlers with summarized responses
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

    if (response.hits.hits.length === 0) {
        return "No relevant participants found.";
    }

    const participants = new Set();
    response.hits.hits.forEach(hit => {
        participants.add(hit._source.Sender);
        participants.add(hit._source.Receiver);
    });

    return `Participants: ${Array.from(participants).join(', ')}`;
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
            },
            sort: [{ Timestamp: 'asc' }]
        }
    });

    if (response.hits.hits.length === 0) {
        return "No specific time information found.";
    }

    const times = response.hits.hits
        .filter(hit => hit._source.Message.toLowerCase().includes('time') ||
            hit._source.Message.includes(':') ||
            hit._source.Context.toLowerCase().includes('time'))
        .map(hit => hit._source.Message);

    return times.length > 0 ?
        `Time info: ${times[0]}` :
        "No specific time mentioned.";
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

    if (response.hits.hits.length === 0) {
        return "Unable to verify this information.";
    }

    // Summarize the verification response
    const latestMessage = response.hits.hits[0]._source;
    return `Based on the latest message: ${latestMessage.Message}`;
}

async function answerGeneralQuestion(question) {
    const response = await client.search({
        index: 'messages_unified',
        body: {
            size: 3, // Reduced size for summary
            query: {
                multi_match: {
                    query: question,
                    fields: ['Message^2', 'Context', 'Topics'],
                    fuzziness: 'AUTO'
                }
            }
        }
    });

    if (response.hits.hits.length === 0) {
        return "No relevant information found.";
    }

    // Create a brief summary
    const summary = response.hits.hits.map(hit => {
        const msg = hit._source;
        return `${msg.Sender}: ${msg.Message}`;
    }).join('; ');

    return `Summary: ${summary}`;
}

// Updated summary generation
async function generateMessageSummary() {
    const response = await client.search({
        index: 'messages_unified',
        body: {
            size: 0,
            aggs: {
                message_types: {
                    terms: { field: 'MessageType' }
                },
                participants: {
                    terms: { field: 'Sender', size: 5 }
                },
                topics: {
                    terms: { field: 'Topics', size: 5 }
                }
            }
        }
    });

    return {
        messageTypes: response.aggregations.message_types.buckets
            .map(b => `${b.key}(${b.doc_count})`).join(', '),
        topParticipants: response.aggregations.participants.buckets
            .map(b => `${b.key}(${b.doc_count})`).join(', '),
        mainTopics: response.aggregations.topics.buckets
            .map(b => b.key).join(', ')
    };
}

// Updated table report
async function generateTableReport() {
    const response = await client.search({
        index: 'messages_unified',
        body: {
            size: 5, // Reduced size for summary
            sort: [{ Timestamp: 'desc' }]
        }
    });

    const stats = {
        totalMessages: response.hits.total.value,
        recentMessages: response.hits.hits.map(hit => {
            const msg = hit._source;
            return `${msg.Sender} → ${msg.Receiver}: ${msg.Message}`;
        })
    };

    return `Total messages: ${stats.totalMessages}\nRecent messages:\n${stats.recentMessages.join('\n')}`;
}

// Updated question handling
async function handleQuestion(question) {
    const questionType = analyzeQuestionType(question);
    let answer;

    try {
        switch (questionType) {
            case 'REPORT_SUMMARY':
                const summary = await generateMessageSummary();
                answer = `Summary:\nTypes: ${summary.messageTypes}\nParticipants: ${summary.topParticipants}\nTopics: ${summary.mainTopics}`;
                break;
            case 'REPORT_TABLE':
                answer = await generateTableReport();
                break;
            case 'WHO':
                answer = await answerWhoQuestion(question);
                break;
            case 'WHEN':
                answer = await answerWhenQuestion(question);
                break;
            case 'VERIFICATION':
                answer = await answerVerificationQuestion(question);
                break;
            case 'GENERAL':
                answer = await answerGeneralQuestion(question);
                break;
            default:
                answer = "Question type not recognized. Please rephrase.";
        }
        console.log(`\nQ: ${question}\nA: ${answer}`);
    } catch (error) {
        console.error("Error handling question:", error);
    }
}

// Main function
async function main() {
    try {
        const questions = [
            "Who is involved in the meeting?",
            "What time is the meeting?",
            "Is there a meeting planned?",
            "Who sent messages to Bob?",
            "Could you please provide a summary of all messages?",
            "Could you present today's report in a table format?"
        ];

        for (const question of questions) {
            await handleQuestion(question);
        }

    } catch (error) {
        console.error("Main operation error:", error);
    } finally {
        process.exit(0);
    }
}

// Run the application
main();