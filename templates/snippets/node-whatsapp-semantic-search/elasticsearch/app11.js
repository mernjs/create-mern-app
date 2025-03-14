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

// Question type classification
function classifyQuestion(question) {
    const questionLower = question.toLowerCase();
    const patterns = {
        summary: /(summarize|summary|overview|brief|tell me about)/,
        participant: /(who|sender|receiver|participant|person)/,
        time: /(when|time|date|schedule)/,
        topic: /(what|topic|discuss|about|subject)/,
        count: /(how many|count|number of)/,
        priority: /(priority|urgent|important)/,
        context: /(context|situation|circumstance)/
    };

    for (const [type, pattern] of Object.entries(patterns)) {
        if (pattern.test(questionLower)) return type;
    }
    return 'general';
}

// Enhanced semantic search for Q&A
async function semanticSearch(query, options = {}) {
    const {
        topK = 10,
        questionType = 'general',
        filterByDate,
        filterBySender,
        filterByTopic
    } = options;

    const queryEmbedding = await generateEmbeddings(query);

    const mustClauses = [];
    const shouldClauses = [
        { match: { Message: query } },
        { match: { Context: query } },
        { terms: { Topics: query.toLowerCase().split(' ') } }
    ];

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

    if (filterBySender) {
        mustClauses.push({ term: { Sender: filterBySender } });
    }

    if (filterByTopic) {
        mustClauses.push({ term: { Topics: filterByTopic } });
    }

    const response = await client.search({
        index: 'messages_unified',
        body: {
            size: topK,
            query: {
                script_score: {
                    query: {
                        bool: {
                            must: mustClauses,
                            should: shouldClauses
                        }
                    },
                    script: {
                        source: "cosineSimilarity(params.query_vector, 'combined_vector') + 1.0",
                        params: { query_vector: queryEmbedding }
                    }
                }
            }
        }
    });

    return response.hits.hits;
}

// Generate natural language response
function generateResponse(question, results, questionType) {
    if (results.length === 0) {
        return "I couldn't find any relevant information about that in the conversation history.";
    }

    switch (questionType) {
        case 'summary':
            return generateSummaryResponse(results);
        case 'participant':
            return generateParticipantResponse(results);
        case 'time':
            return generateTimeResponse(results);
        case 'topic':
            return generateTopicResponse(results);
        case 'count':
            return generateCountResponse(results);
        case 'priority':
            return generatePriorityResponse(results);
        case 'context':
            return generateContextResponse(results);
        default:
            return generateGeneralResponse(results);
    }
}

// Response generation helpers
function generateSummaryResponse(results) {
    const topics = new Set(results.flatMap(hit => hit._source.Topics));
    const participants = new Set(results.map(hit => hit._source.Sender));

    return `Here's a summary of the conversation:\n\n` +
        `The discussion involved ${Array.from(participants).join(', ')} ` +
        `and covered topics including ${Array.from(topics).join(', ')}.\n\n` +
        `Key messages:\n${results.slice(0, 3).map(hit =>
            `- ${hit._source.Sender}: ${hit._source.Message}`
        ).join('\n')}`;
}

function generateParticipantResponse(results) {
    const participants = new Map();
    results.forEach(hit => {
        const sender = hit._source.Sender;
        if (!participants.has(sender)) {
            participants.set(sender, []);
        }
        participants.get(sender).push(hit._source.Message);
    });

    return Array.from(participants.entries())
        .map(([participant, messages]) =>
            `${participant} participated with messages like: "${messages[0]}"`
        ).join('\n');
}

function generateTimeResponse(results) {
    const timelineMessages = results
        .sort((a, b) => new Date(a._source.Timestamp) - new Date(b._source.Timestamp))
        .map(hit => {
            const date = new Date(hit._source.Timestamp).toLocaleString();
            return `${date}: ${hit._source.Sender} - ${hit._source.Message}`;
        });

    return `Here's the timeline of relevant messages:\n\n${timelineMessages.join('\n')}`;
}

function generateTopicResponse(results) {
    const topicCounts = new Map();
    results.forEach(hit => {
        hit._source.Topics.forEach(topic => {
            topicCounts.set(topic, (topicCounts.get(topic) || 0) + 1);
        });
    });

    const topTopics = Array.from(topicCounts.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3);

    return `The main topics discussed were:\n` +
        topTopics.map(([topic, count]) =>
            `- ${topic} (mentioned ${count} times)`
        ).join('\n');
}

function generateCountResponse(results) {
    const uniqueSenders = new Set(results.map(hit => hit._source.Sender));
    const uniqueTopics = new Set(results.flatMap(hit => hit._source.Topics));

    return `Found ${results.length} relevant messages ` +
        `from ${uniqueSenders.size} participants ` +
        `discussing ${uniqueTopics.size} different topics.`;
}

function generatePriorityResponse(results) {
    const priorityMessages = results
        .filter(hit => hit._source.Priority === 'High')
        .map(hit => ({
            sender: hit._source.Sender,
            message: hit._source.Message,
            timestamp: new Date(hit._source.Timestamp).toLocaleString()
        }));

    return priorityMessages.length > 0
        ? `Found ${priorityMessages.length} high-priority messages:\n` +
        priorityMessages.map(msg =>
            `- ${msg.timestamp}: ${msg.sender} - ${msg.message}`
        ).join('\n')
        : `No high-priority messages found in the relevant results.`;
}

function generateContextResponse(results) {
    return results.map(hit => {
        const source = hit._source;
        return `Context: ${source.Context}\n` +
            `From: ${source.Sender} To: ${source.Receiver}\n` +
            `Message: ${source.Message}\n` +
            `Topics: ${source.Topics.join(', ')}\n`;
    }).join('\n');
}

function generateGeneralResponse(results) {
    return results.slice(0, 3).map(hit => {
        const source = hit._source;
        const date = new Date(source.Timestamp).toLocaleString();
        return `On ${date}, ${source.Sender} said: "${source.Message}"`;
    }).join('\n');
}

// Main Q&A function
async function handleQuestion(question) {
    console.log(`\nQ: ${question}`);

    const questionType = classifyQuestion(question);
    const results = await semanticSearch(question, { questionType });
    const response = generateResponse(question, results, questionType);

    console.log(`\nA: ${response}\n`);
    return { response, results };
}

// Main function
async function main() {
    try {
        console.log("Initializing Conversation Q&A System...");

        await initializePipeline();
        await createIndex();
        await indexDocuments();

        // Example questions to demonstrate the system's capabilities
        const questions = [
            "Can you summarize the main points of discussion?",
            "Who were the most active participants in the conversation?",
            "When were the budget discussions held?",
            "What topics were discussed in the meetings?",
            "How many high-priority messages were there?",
            "Tell me about the follow-up meetings.",
            "What was the context of Alice's messages to Bob?",
            "Were there any urgent matters discussed?"
        ];

        for (const question of questions) {
            await handleQuestion(question);
            console.log("-------------------");
        }

    } catch (error) {
        console.error("Application error:", error);
    }
}

// Interactive mode for Q&A
async function startInteractiveMode() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    console.log("\nConversation Q&A System Ready!");
    console.log("Type your questions (or 'exit' to quit)");

    const askQuestion = () => {
        rl.question('\nYour question: ', async (question) => {
            if (question.toLowerCase() === 'exit') {
                rl.close();
                process.exit(0);
            }

            await handleQuestion(question);
            askQuestion();
        });
    };

    await initializePipeline();
    await createIndex();
    await indexDocuments();
    askQuestion();
}

// Uncomment the following line for interactive mode:
startInteractiveMode();

// Or use the example questions mode:
// main();