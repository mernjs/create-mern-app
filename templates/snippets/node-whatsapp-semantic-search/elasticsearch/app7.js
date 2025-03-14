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
            console.log(JSON.stringify({ message: "Existing index deleted." }));
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
        console.log(JSON.stringify({ message: "Index created successfully." }));
    } catch (error) {
        console.error(JSON.stringify({ error: "Error creating index:", details: error.meta?.body?.error || error }));
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
            console.log(JSON.stringify({ error: "Indexing errors:", details: errors }));
        } else {
            console.log(JSON.stringify({ message: `Successfully indexed ${dataset.length} documents.` }));
        }
    } catch (error) {
        console.error(JSON.stringify({ error: "Indexing error:", details: error.meta?.body?.error || error }));
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
                console.log(JSON.stringify({ message: "I'm not sure how to answer that question. Could you rephrase it?" }));
        }
    } catch (error) {
        console.error(JSON.stringify({ error: "Error handling question:", details: error }));
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

    const answer = { message: "Answer:", participants: [] };

    if (response.hits.hits.length === 0) {
        answer.participants.push("I couldn't find any relevant information.");
        console.log(JSON.stringify(answer));
        return;
    }

    const participants = new Set();
    response.hits.hits.forEach(hit => {
        participants.add(hit._source.Sender);
        participants.add(hit._source.Receiver);
    });

    answer.participants.push("The following people are involved:");
    participants.forEach(person => answer.participants.push(`- ${person}`));
    console.log(JSON.stringify(answer));
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

    const answer = { message: "Answer:", details: [] };

    if (response.hits.hits.length === 0) {
        answer.details.push("I couldn't find any specific time information.");
        console.log(JSON.stringify(answer));
        return;
    }

    response.hits.hits.forEach(hit => {
        const msg = hit._source;
        if (msg.Message.toLowerCase().includes('time') ||
            msg.Message.includes(':') ||
            msg.Context.toLowerCase().includes('time')) {
            answer.details.push(`According to ${msg.Sender}: ${msg.Message}`);
        }
    });
    console.log(JSON.stringify(answer));
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

    const answer = { message: "Answer:", details: [] };

    if (response.hits.hits.length === 0) {
        answer.details.push("I couldn't find any relevant information to verify this.");
        console.log(JSON.stringify(answer));
        return;
    }

    const relevantMessages = response.hits.hits.map(hit => hit._source.Message);
    answer.details.push("Based on the messages:");
    relevantMessages.forEach(msg => answer.details.push(`- ${msg}`));
    console.log(JSON.stringify(answer));
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

    const answer = { message: "Answer:", details: [] };

    if (response.hits.hits.length === 0) {
        answer.details.push("I couldn't find any relevant information.");
        console.log(JSON.stringify(answer));
        return;
    }

    answer.details.push("Here are the relevant messages I found:");
    response.hits.hits.forEach((hit, index) => {
        const msg = hit._source;
        answer.details.push(`\n${index + 1}. From ${msg.Sender} to ${msg.Receiver}: "${msg.Message}" at ${msg.Timestamp}`);
    });
    console.log(JSON.stringify(answer));
}

// Generate message summary
async function generateMessageSummary() {
    const response = await client.search({
        index: 'messages_unified',
        body: {
            size: 1000,
            query: {
                match_all: {}
            }
        }
    });

    const summary = {
        totalMessages: response.hits.total.value,
        senders: [],
        receivers: []
    };

    const sendersSet = new Set();
    const receiversSet = new Set();

    response.hits.hits.forEach(hit => {
        sendersSet.add(hit._source.Sender);
        receiversSet.add(hit._source.Receiver);
    });

    summary.senders = Array.from(sendersSet);
    summary.receivers = Array.from(receiversSet);

    console.log(JSON.stringify(summary));
}

// Generate table report
async function generateTableReport() {
    const response = await client.search({
        index: 'messages_unified',
        body: {
            size: 100,
            query: {
                match_all: {}
            }
        }
    });

    const table = new Table({
        head: ['Sender', 'Receiver', 'Timestamp', 'Message', 'Context', 'Topics', 'MessageType', 'Priority'],
        colWidths: [15, 15, 25, 50, 30, 30, 20, 15]
    });

    response.hits.hits.forEach(hit => {
        const msg = hit._source;
        table.push([
            msg.Sender,
            msg.Receiver,
            msg.Timestamp,
            msg.Message,
            msg.Context,
            msg.Topics.join(', '),
            msg.MessageType,
            msg.Priority
        ]);
    });

    console.log(JSON.stringify({ table: table.toString() }));
}

// Execution sequence
(async () => {
    await createIndex();
    await indexDocuments();
    // await handleQuestion("Can you summarize the messages?");
    // await handleQuestion("What are the details of the messages in table format?");
    // await handleQuestion("Who sent the messages?");
    // await handleQuestion("When is the meeting scheduled?");
    // await handleQuestion("Is the meeting still on?");
    // await handleQuestion("Tell me more about the conversation.");
})();
