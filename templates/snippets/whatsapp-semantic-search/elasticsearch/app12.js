import { Client } from '@elastic/elasticsearch';
import { pipeline } from '@xenova/transformers';
import readline from 'readline';

// Initialize Elasticsearch client
const client = new Client({
    node: '',
    auth: {
        apiKey: ''
    }
});

// Dataset remains the same as in your original code
const dataset = [
    {
        "Sender": "Alice",
        "Receiver": "Bob",
        "Timestamp": "2023-10-01 09:00:00",
        "Message": "Hey Bob! Are we still on for the meeting?",
        "Context": "Meeting schedule confirmation",
        "Topics": ["meeting", "schedule"],
        "MessageType": "Question",
        "Priority": "Normal"
    },
    {
        "Sender": "Bob",
        "Receiver": "Alice",
        "Timestamp": "2023-10-01 09:01:00",
        "Message": "Yes, see you at 10!",
        "Context": "Meeting time confirmation",
        "Topics": ["meeting", "time", "confirmation"],
        "MessageType": "Response",
        "Priority": "Normal"
    },
    {
        "Sender": "Alice",
        "Receiver": "Charlie",
        "Timestamp": "2023-10-01 09:05:00",
        "Message": "Hey Charlie, do you want to join the meeting?",
        "Context": "Meeting invitation",
        "Topics": ["meeting", "invitation"],
        "MessageType": "Invitation",
        "Priority": "Normal"
    },
    {
        "Sender": "Charlie",
        "Receiver": "Alice",
        "Timestamp": "2023-10-01 09:06:00",
        "Message": "Sure, I’ll be there!",
        "Context": "Meeting confirmation",
        "Topics": ["meeting", "confirmation"],
        "MessageType": "Response",
        "Priority": "Normal"
    },
    {
        "Sender": "David",
        "Receiver": "Group",
        "Timestamp": "2023-10-01 09:15:00",
        "Message": "Can someone share the meeting link?",
        "Context": "Meeting logistics",
        "Topics": ["meeting", "link"],
        "MessageType": "Request",
        "Priority": "Normal"
    },
    {
        "Sender": "Bob",
        "Receiver": "Group",
        "Timestamp": "2023-10-01 09:16:00",
        "Message": "I’ll send it right now!",
        "Context": "Meeting logistics",
        "Topics": ["meeting", "link"],
        "MessageType": "Response",
        "Priority": "Normal"
    },
    {
        "Sender": "Alice",
        "Receiver": "Bob",
        "Timestamp": "2023-10-02 09:15:00",
        "Message": "Bob, can you share the agenda for today's meeting?",
        "Context": "Agenda request",
        "Topics": ["meeting", "agenda"],
        "MessageType": "Request",
        "Priority": "Normal"
    },
    {
        "Sender": "Bob",
        "Receiver": "Alice",
        "Timestamp": "2023-10-02 09:16:00",
        "Message": "Sure! I'll send it over shortly.",
        "Context": "Agenda confirmation",
        "Topics": ["meeting", "agenda"],
        "MessageType": "Response",
        "Priority": "Normal"
    },
    {
        "Sender": "Charlie",
        "Receiver": "Alice",
        "Timestamp": "2023-10-02 09:20:00",
        "Message": "What time is the meeting today?",
        "Context": "Meeting time inquiry",
        "Topics": ["meeting", "time"],
        "MessageType": "Question",
        "Priority": "Normal"
    },
    {
        "Sender": "Alice",
        "Receiver": "Charlie",
        "Timestamp": "2023-10-02 09:21:00",
        "Message": "It's at 10 AM. Looking forward to seeing you there!",
        "Context": "Meeting time confirmation",
        "Topics": ["meeting", "time", "confirmation"],
        "MessageType": "Response",
        "Priority": "Normal"
    },
    {
        "Sender": "David",
        "Receiver": "Group",
        "Timestamp": "2023-10-02 09:30:00",
        "Message": "Can we have a quick call to discuss the project updates?",
        "Context": "Project update discussion",
        "Topics": ["project", "meeting", "updates"],
        "MessageType": "Request",
        "Priority": "High"
    },
    {
        "Sender": "Eve",
        "Receiver": "Group",
        "Timestamp": "2023-10-02 09:31:00",
        "Message": "I'm available. How about 2 PM?",
        "Context": "Meeting time suggestion",
        "Topics": ["meeting", "time"],
        "MessageType": "Suggestion",
        "Priority": "Normal"
    },
    {
        "Sender": "David",
        "Receiver": "Group",
        "Timestamp": "2023-10-02 09:32:00",
        "Message": "2 PM works for me. Let's confirm with others.",
        "Context": "Meeting time confirmation",
        "Topics": ["meeting", "time", "confirmation"],
        "MessageType": "Response",
        "Priority": "Normal"
    },
    {
        "Sender": "Alice",
        "Receiver": "Group",
        "Timestamp": "2023-10-02 09:35:00",
        "Message": "I'm in! Count me in for 2 PM.",
        "Context": "Meeting confirmation",
        "Topics": ["meeting", "confirmation"],
        "MessageType": "Response",
        "Priority": "Normal"
    },
    {
        "Sender": "Bob",
        "Receiver": "Group",
        "Timestamp": "2023-10-02 09:36:00",
        "Message": "I can join too. Looking forward to it!",
        "Context": "Meeting confirmation",
        "Topics": ["meeting", "confirmation"],
        "MessageType": "Response",
        "Priority": "Normal"
    },
    {
        "Sender": "Charlie",
        "Receiver": "Group",
        "Timestamp": "2023-10-02 09:37:00",
        "Message": "I'll be there as well! See you at 2 PM.",
        "Context": "Meeting confirmation",
        "Topics": ["meeting", "confirmation"],
        "MessageType": "Response",
        "Priority": "Normal"
    },
    {
        "Sender": "Eve",
        "Receiver": "Alice",
        "Timestamp": "2023-10-03 09:00:00",
        "Message": "Alice, can we discuss the budget during today's meeting?",
        "Context": "Budget discussion",
        "Topics": ["budget", "meeting"],
        "MessageType": "Request",
        "Priority": "High"
    },
    {
        "Sender": "Alice",
        "Receiver": "Eve",
        "Timestamp": "2023-10-03 09:01:00",
        "Message": "Absolutely! I’ll add it to the agenda.",
        "Context": "Agenda update",
        "Topics": ["budget", "agenda"],
        "MessageType": "Response",
        "Priority": "Normal"
    },
    {
        "Sender": "David",
        "Receiver": "Group",
        "Timestamp": "2023-10-03 09:15:00",
        "Message": "Reminder: Today's meeting is at 2 PM.",
        "Context": "Meeting reminder",
        "Topics": ["meeting", "reminder"],
        "MessageType": "Notification",
        "Priority": "Normal"
    },
    {
        "Sender": "Charlie",
        "Receiver": "Bob",
        "Timestamp": "2023-10-03 09:20:00",
        "Message": "Bob, do you have the latest sales figures for the meeting?",
        "Context": "Sales figures inquiry",
        "Topics": ["sales", "meeting"],
        "MessageType": "Request",
        "Priority": "Normal"
    },
    {
        "Sender": "Bob",
        "Receiver": "Charlie",
        "Timestamp": "2023-10-03 09:21:00",
        "Message": "Yes, I’ll pull them up before the meeting.",
        "Context": "Sales figures confirmation",
        "Topics": ["sales", "meeting"],
        "MessageType": "Response",
        "Priority": "Normal"
    },
    {
        "Sender": "Eve",
        "Receiver": "Group",
        "Timestamp": "2023-10-04 09:00:00",
        "Message": "Can we set a follow-up meeting for next week?",
        "Context": "Follow-up meeting request",
        "Topics": ["meeting", "follow-up"],
        "MessageType": "Request",
        "Priority": "Normal"
    },
    {
        "Sender": "David",
        "Receiver": "Group",
        "Timestamp": "2023-10-04 09:01:00",
        "Message": "How about Tuesday at 3 PM?",
        "Context": "Follow-up meeting suggestion",
        "Topics": ["meeting", "follow-up", "time"],
        "MessageType": "Suggestion",
        "Priority": "Normal"
    },
    {
        "Sender": "Alice",
        "Receiver": "Group",
        "Timestamp": "2023-10-04 09:02:00",
        "Message": "Tuesday at 3 PM works for me.",
        "Context": "Follow-up meeting confirmation",
        "Topics": ["meeting", "follow-up", "time"],
        "MessageType": "Response",
        "Priority": "Normal"
    },
    {
        "Sender": "Charlie",
        "Receiver": "Group",
        "Timestamp": "2023-10-04 09:03:00",
        "Message": "I'm available then as well.",
        "Context": "Follow-up meeting confirmation",
        "Topics": ["meeting", "follow-up", "time"],
        "MessageType": "Response",
        "Priority": "Normal"
    },
    {
        "Sender": "Bob",
        "Receiver": "Group",
        "Timestamp": "2023-10-04 09:04:00",
        "Message": "Count me in for Tuesday too!",
        "Context": "Follow-up meeting confirmation",
        "Topics": ["meeting", "follow-up", "time"],
        "MessageType": "Response",
        "Priority": "Normal"
    },
    {
        "Sender": "Alice",
        "Receiver": "Bob",
        "Timestamp": "2023-10-05 09:00:00",
        "Message": "Do you think we need more participants for the follow-up meeting?",
        "Context": "Meeting participants inquiry",
        "Topics": ["meeting", "participants"],
        "MessageType": "Question",
        "Priority": "Normal"
    },
    {
        "Sender": "Bob",
        "Receiver": "Alice",
        "Timestamp": "2023-10-05 09:01:00",
        "Message": "Possibly, let's discuss it before we finalize.",
        "Context": "Meeting participants discussion",
        "Topics": ["meeting", "participants"],
        "MessageType": "Response",
        "Priority": "Normal"
    },
    {
        "Sender": "David",
        "Receiver": "Group",
        "Timestamp": "2023-10-05 09:15:00",
        "Message": "Please prepare your updates for the follow-up meeting.",
        "Context": "Meeting preparation",
        "Topics": ["meeting", "preparation"],
        "MessageType": "Notification",
        "Priority": "Normal"
    },
    {
        "Sender": "Charlie",
        "Receiver": "Alice",
        "Timestamp": "2023-10-06 09:00:00",
        "Message": "Alice, can you remind me of the key points from our last meeting?",
        "Context": "Meeting recap request",
        "Topics": ["meeting", "recap"],
        "MessageType": "Request",
        "Priority": "Normal"
    },
    {
        "Sender": "Alice",
        "Receiver": "Charlie",
        "Timestamp": "2023-10-06 09:01:00",
        "Message": "Sure! I'll summarize and send it to you.",
        "Context": "Meeting recap confirmation",
        "Topics": ["meeting", "recap"],
        "MessageType": "Response",
        "Priority": "Normal"
    },
    {
        "Sender": "Eve",
        "Receiver": "Group",
        "Timestamp": "2023-10-06 09:30:00",
        "Message": "Looking forward to our meeting next week! Let's finalize the agenda.",
        "Context": "Agenda finalization",
        "Topics": ["meeting", "agenda"],
        "MessageType": "Notification",
        "Priority": "Normal"
    },
    {
        "Sender": "David",
        "Receiver": "Group",
        "Timestamp": "2023-10-06 09:31:00",
        "Message": "I have some points to add for the agenda.",
        "Context": "Agenda input",
        "Topics": ["meeting", "agenda"],
        "MessageType": "Request",
        "Priority": "Normal"
    },
    {
        "Sender": "Alice",
        "Receiver": "Group",
        "Timestamp": "2023-10-06 09:32:00",
        "Message": "Feel free to share your points, David!",
        "Context": "Agenda encouragement",
        "Topics": ["meeting", "agenda"],
        "MessageType": "Response",
        "Priority": "Normal"
    }
];
// Initialize the embedding pipeline
let embeddingPipeline;

async function initializePipeline() {
    embeddingPipeline = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
}

async function generateEmbeddings(text) {
    const result = await embeddingPipeline(text);
    return Array.from(result[0][0]);
}

// Enhanced index creation with improved mappings for Q&A
async function createIndex() {
    try {
        const indexExists = await client.indices.exists({ index: 'messages_unified' });
        if (indexExists) {
            await client.indices.delete({ index: 'messages_unified' });
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
                        Timestamp: {
                            type: 'date',
                            format: "yyyy-MM-dd HH:mm:ss||strict_date_optional_time||epoch_millis"
                        },
                        Message: {
                            type: 'text',
                            analyzer: 'qa_analyzer',
                            fields: {
                                keyword: { type: 'keyword' }
                            }
                        },
                        Context: {
                            type: 'text',
                            analyzer: 'qa_analyzer',
                            fields: {
                                keyword: { type: 'keyword' }
                            }
                        },
                        Topics: { type: 'keyword' },
                        MessageType: { type: 'keyword' },
                        Priority: { type: 'keyword' },
                        combined_vector: {
                            type: 'dense_vector',
                            dims: 384,
                            index: true,
                            similarity: 'cosine'
                        }
                    }
                }
            }
        });
    } catch (error) {
        console.error("Error creating index:", error.meta?.body?.error || error);
    }
}

// Index documents with embeddings
async function indexDocuments() {
    try {
        const operations = [];
        for (const doc of dataset) {
            const combinedText = `${doc.Message} ${doc.Context} ${doc.Topics.join(' ')}`;
            const embedding = await generateEmbeddings(combinedText);
            operations.push(
                { index: { _index: 'messages_unified' } },
                { ...doc, combined_vector: embedding }
            );
        }

        await client.bulk({
            refresh: true,
            body: operations
        });
    } catch (error) {
        console.error("Indexing error:", error.meta?.body?.error || error);
    }
}

// Enhanced question classification with detailed patterns
function classifyQuestion(question) {
    const questionLower = question.toLowerCase();
    const patterns = {
        summary: /(summarize|summary|overview|brief|tell me about)/i,
        participant: /(who|sender|receiver|participant|person|from|to)/i,
        time: /(when|time|date|schedule|what time)/i,
        topic: /(what|topic|discuss|about|subject|regarding)/i,
        count: /(how many|count|number of)/i,
        priority: /(priority|urgent|important|critical)/i,
        context: /(context|situation|circumstance|why|reason)/i,
        message: /(message|say|said|tell|mention)/i,
        specific_date: /(on|at|during) (january|february|march|april|may|june|july|august|september|october|november|december|\d{1,2}\/\d{1,2}\/\d{4}|\d{4}-\d{2}-\d{2})/i
    };

    for (const [type, pattern] of Object.entries(patterns)) {
        if (pattern.test(questionLower)) return type;
    }
    return 'general';
}

// Enhanced semantic search function with dynamic query building
async function semanticSearch(query, options = {}) {
    const {
        topK = 5,
        questionType = 'general',
        filterByDate,
        filterBySender,
        filterByReceiver,
        filterByTopic
    } = options;

    const queryEmbedding = await generateEmbeddings(query);

    const buildSearchQuery = () => {
        const mustClauses = [];
        const shouldClauses = [
            {
                multi_match: {
                    query: query,
                    fields: ['Message^3', 'Context^2', 'Topics'],
                    type: 'best_fields',
                    fuzziness: 'AUTO'
                }
            }
        ];

        if (questionType === 'specific_date') {
            const dateMatch = query.match(/\d{4}-\d{2}-\d{2}|\d{1,2}\/\d{1,2}\/\d{4}/);
            if (dateMatch) {
                const date = dateMatch[0];
                mustClauses.push({
                    range: {
                        Timestamp: {
                            gte: `${date}T00:00:00`,
                            lte: `${date}T23:59:59`
                        }
                    }
                });
            }
        }

        if (filterByDate) {
            mustClauses.push({
                range: {
                    Timestamp: {
                        gte: filterByDate.start,
                        lte: filterByDate.end
                    }
                }
            });
        }

        if (filterBySender) mustClauses.push({ match: { Sender: filterBySender } });
        if (filterByReceiver) mustClauses.push({ match: { Receiver: filterByReceiver } });
        if (filterByTopic) mustClauses.push({ match: { Topics: filterByTopic } });

        if (questionType === 'priority') {
            shouldClauses.push({ term: { Priority: { value: 'High', boost: 2.0 } } });
        }

        return {
            bool: {
                must: mustClauses,
                should: shouldClauses,
                minimum_should_match: shouldClauses.length > 0 ? 1 : 0
            }
        };
    };

    const response = await client.search({
        index: 'messages_unified',
        body: {
            size: topK,
            query: {
                script_score: {
                    query: buildSearchQuery(),
                    script: {
                        source: "cosineSimilarity(params.query_vector, 'combined_vector') + 1.0",
                        params: { query_vector: queryEmbedding }
                    }
                }
            },
            sort: [
                { _score: { order: 'desc' } },
                { Timestamp: { order: 'asc' } }
            ]
        }
    });

    return response.hits.hits;
}

// Generate response based on question type
function generateResponse(question, results, questionType) {
    if (results.length === 0) {
        return "I couldn't find any relevant information in the conversation history.";
    }

    const formatMessage = (hit) => {
        const source = hit._source;
        const date = new Date(source.Timestamp).toLocaleString();
        return `[${date}] ${source.Sender} to ${source.Receiver}: "${source.Message}"`;
    };

    switch (questionType) {
        case 'summary':
            const topics = new Set(results.flatMap(hit => hit._source.Topics));
            return `Summary:\nTopics discussed: ${Array.from(topics).join(', ')}\n\nMessages:\n${results.map(formatMessage).join('\n')}`;
        case 'participant':
            return `Relevant messages:\n${results.map(formatMessage).join('\n')}`;
        case 'time':
            return `Timeline:\n${results.map(formatMessage).join('\n')}`;
        case 'topic':
            return `Messages by topic:\n${results.map(hit => `[${hit._source.Topics.join(', ')}] ${formatMessage(hit)}`).join('\n')}`;
        case 'specific_date':
        case 'message':
            return results.map(formatMessage).join('\n');
        case 'priority':
            const highPriorityMessages = results.filter(hit => hit._source.Priority === 'High');
            return highPriorityMessages.length > 0 ?
                `High-priority messages:\n${highPriorityMessages.map(formatMessage).join('\n')}` :
                `No high-priority messages found.\nOther relevant messages:\n${results.map(formatMessage).join('\n')}`;
        default:
            return `Relevant messages:\n${results.map(formatMessage).join('\n')}`;
    }
}

// Main function to initialize and index data
async function main() {
    await initializePipeline();
    await createIndex();
    await indexDocuments();

    // Example usage
    const question = "Who talked about the meeting?";
    const questionType = classifyQuestion(question);
    const results = await semanticSearch(question, { questionType });
    console.log(generateResponse(question, results, questionType));
}

// Interactive mode for real-time Q&A
function startInteractiveMode() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.setPrompt('Ask a question: ');
    rl.prompt();

    rl.on('line', async (line) => {
        const questionType = classifyQuestion(line);
        const results = await semanticSearch(line, { questionType });
        console.log(generateResponse(line, results, questionType));
        rl.prompt();
    }).on('close', () => {
        console.log('Exiting Q&A system.');
        process.exit(0);
    });
}

// Run the main function or start interactive mode
main().then(() => startInteractiveMode()).catch(console.error);
