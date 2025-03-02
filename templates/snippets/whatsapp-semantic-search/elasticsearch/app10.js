import { Client } from '@elastic/elasticsearch';
import Table from 'cli-table3';
import { pipeline } from '@xenova/transformers';

// Initialize Elasticsearch client
const client = new Client({
    node: '',
    auth: {
        apiKey: ''
    }
});

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

function createCombinedText(doc) {
    return `${doc.Message} ${doc.Context} ${doc.Topics.join(' ')}`;
}

// Modified index creation with improved mappings
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
                                keyword: {
                                    type: 'keyword'
                                }
                            }
                        },
                        Context: {
                            type: 'text',
                            analyzer: 'qa_analyzer',
                            fields: {
                                keyword: {
                                    type: 'keyword'
                                }
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

// Enhanced indexing function
async function indexDocuments() {
    try {
        const operations = [];

        for (const doc of dataset) {
            const combinedText = createCombinedText(doc);
            const embedding = await generateEmbeddings(combinedText);

            operations.push(
                { index: { _index: 'messages_unified' } },
                {
                    ...doc,
                    combined_vector: embedding
                }
            );
        }

        const response = await client.bulk({
            refresh: true,
            body: operations
        });

        if (response.errors) {
            const errors = response.items
                .filter(item => item.index.error)
                .map(item => item.index.error);
            console.log("Indexing errors:", errors);
        }
    } catch (error) {
        console.error("Indexing error:", error.meta?.body?.error || error);
    }
}

// Improved semantic search with query handling
async function semanticSearch(query, options = {}) {
    const {
        topK = 50,
        includeAll = false,
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

    const searchBody = includeAll ? {
        size: topK,
        sort: [{ Timestamp: "asc" }],
        query: {
            bool: {
                must: mustClauses.length ? mustClauses : [{ match_all: {} }]
            }
        }
    } : {
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
    };

    const response = await client.search({
        index: 'messages_unified',
        body: searchBody
    });

    return response.hits.hits;
}

// Enhanced conversation analysis
async function analyzeConversation(query) {
    console.log(`\nAnalyzing: "${query}"`);

    const options = {
        topK: 50,
        includeAll: query.toLowerCase().includes('all messages') ||
            query.toLowerCase().includes('messages summary')
    };

    const results = await semanticSearch(query, options);

    console.log("\nMessage Analysis:");
    console.log("=================");

    const table = new Table({
        head: ['Time', 'From', 'To', 'Message', 'Context', 'Topics', 'Priority'],
        colWidths: [20, 10, 10, 30, 20, 20, 10],
        wordWrap: true
    });

    results.forEach(hit => {
        const source = hit._source;
        const date = new Date(source.Timestamp).toLocaleString();

        table.push([
            date,
            source.Sender,
            source.Receiver,
            source.Message,
            source.Context,
            source.Topics.join(', '),
            source.Priority
        ]);
    });

    console.log(table.toString());

    // Generate conversation statistics
    const stats = generateConversationStats(results);
    printConversationSummary(stats);
}

// New function to generate conversation statistics
function generateConversationStats(results) {
    const stats = {
        totalMessages: results.length,
        participants: new Set(),
        topics: new Map(),
        messageTypes: new Map(),
        priorities: new Map(),
        dateRange: {
            start: null,
            end: null
        }
    };

    results.forEach(hit => {
        const msg = hit._source;

        // Track participants
        stats.participants.add(msg.Sender);
        if (msg.Receiver !== 'Group') stats.participants.add(msg.Receiver);

        // Track topics
        msg.Topics.forEach(topic => {
            stats.topics.set(topic, (stats.topics.get(topic) || 0) + 1);
        });

        // Track message types
        stats.messageTypes.set(msg.MessageType, (stats.messageTypes.get(msg.MessageType) || 0) + 1);

        // Track priorities
        stats.priorities.set(msg.Priority, (stats.priorities.get(msg.Priority) || 0) + 1);

        // Track date range
        const date = new Date(msg.Timestamp);
        if (!stats.dateRange.start || date < stats.dateRange.start) stats.dateRange.start = date;
        if (!stats.dateRange.end || date > stats.dateRange.end) stats.dateRange.end = date;
    });

    return stats;
}

// New function to print conversation summary
function printConversationSummary(stats) {
    console.log("\nConversation Summary:");
    console.log("====================");
    console.log(`Total Messages: ${stats.totalMessages}`);
    console.log(`Date Range: ${stats.dateRange.start?.toLocaleDateString()} to ${stats.dateRange.end?.toLocaleDateString()}`);
    console.log(`Participants: ${Array.from(stats.participants).join(', ')}`);

    console.log("\nTop Topics:");
    Array.from(stats.topics.entries())
        .sort((a, b) => b[1] - a[1])
        .forEach(([topic, count]) => {
            console.log(`- ${topic}: ${count} messages`);
        });

    console.log("\nMessage Types Distribution:");
    stats.messageTypes.forEach((count, type) => {
        console.log(`- ${type}: ${count} messages`);
    });

    console.log("\nPriority Distribution:");
    stats.priorities.forEach((count, priority) => {
        console.log(`- ${priority}: ${count} messages`);
    });
}

// Main function with improved error handling
async function main() {
    try {
        console.log("Starting Enhanced Conversation Analysis System...");

        await initializePipeline();
        await createIndex();
        await new Promise(resolve => setTimeout(resolve, 2000));
        await indexDocuments();
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Example queries demonstrating different analysis capabilities
        const queries = [
            "Can you share all messages summary?",
            "Show me high priority messages",
            "What was discussed about the budget?",
            "Find all meeting confirmations",
            "Show messages from Alice"
        ];

        for (const query of queries) {
            await analyzeConversation(query);
            console.log("\n-------------------");
        }

    } catch (error) {
        console.error("Application error:", error);
    } finally {
        process.exit(0);
    }
}

// Run the application
main();