const { Client } = require('@elastic/elasticsearch');
const Table = require('cli-table3'); // Additional package for nice console tables

// Initialize Elasticsearch client
const client = new Client({
    node: '',
    auth: {
        apiKey: ''
    }
});

// Expanded dataset with more message details
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
        "Topics": ["meeting", "confirmation"],
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
    }
];

// Step 1: Create an index with enhanced mappings for reporting
async function createIndex() {
    try {
        const indexExists = await client.indices.exists({ index: 'messages_reports' });
        if (indexExists) {
            await client.indices.delete({ index: 'messages_reports' });
            console.log("Existing index deleted.");
        }

        await client.indices.create({
            index: 'messages_reports',
            body: {
                settings: {
                    analysis: {
                        analyzer: {
                            report_analyzer: {
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
                            analyzer: 'report_analyzer',
                            fields: {
                                keyword: { type: 'keyword' }
                            }
                        },
                        Context: { type: 'text', analyzer: 'report_analyzer' },
                        Topics: { type: 'keyword' },
                        MessageType: { type: 'keyword' },
                        Priority: { type: 'keyword' }
                    }
                }
            }
        });
        console.log("Index created successfully with reporting capabilities.");
    } catch (error) {
        console.error("Error creating index:", error.meta?.body?.error || error);
    }
}

// Step 2: Index documents
async function indexDocuments() {
    try {
        const operations = dataset.flatMap(doc => [
            { index: { _index: 'messages_reports' } },
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

// Step 3: Enhanced reporting functions
async function generateReport(question) {
    try {
        const reportType = analyzeReportType(question);

        switch (reportType) {
            case 'SUMMARY':
                await generateMessageSummary();
                break;
            case 'TABLE':
                await generateTableReport();
                break;
            default:
                console.log("Unsupported report type requested.");
        }
    } catch (error) {
        console.error("Report generation error:", error.meta?.body?.error || error);
    }
}

// Helper function to analyze report type
function analyzeReportType(question) {
    const questionLower = question.toLowerCase();

    if (questionLower.includes('summary')) return 'SUMMARY';
    if (questionLower.includes('table') || questionLower.includes('report')) return 'TABLE';
    return 'UNKNOWN';
}

// Function to generate message summary
async function generateMessageSummary() {
    try {
        const response = await client.search({
            index: 'messages_reports',
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

        // Summary statistics
        console.log(`\nTotal Messages: ${response.hits.hits.length}`);

        // Message type breakdown
        console.log("\nMessage Types:");
        response.aggregations.message_types.buckets.forEach(bucket => {
            console.log(`- ${bucket.key}: ${bucket.doc_count} messages`);
        });

        // Participant activity
        console.log("\nParticipant Activity:");
        response.aggregations.participants.buckets.forEach(bucket => {
            console.log(`- ${bucket.key}: ${bucket.doc_count} messages sent`);
        });

        // Topics discussed
        console.log("\nTopics Discussed:");
        response.aggregations.topics.buckets.forEach(bucket => {
            console.log(`- ${bucket.key}: ${bucket.doc_count} mentions`);
        });

        // Chronological summary
        console.log("\nChronological Message Flow:");
        response.hits.hits.forEach(hit => {
            const msg = hit._source;
            console.log(`- ${new Date(msg.Timestamp).toLocaleString()}: ${msg.Sender} → ${msg.Receiver}: ${msg.Message}`);
        });

    } catch (error) {
        console.error("Error generating summary:", error);
    }
}

// Function to generate table report
async function generateTableReport() {
    try {
        const response = await client.search({
            index: 'messages_reports',
            body: {
                size: 1000,
                sort: [{ Timestamp: 'asc' }]
            }
        });

        // Create table
        const table = new Table({
            head: ['Time', 'From', 'To', 'Type', 'Message', 'Topics'],
            colWidths: [25, 10, 10, 12, 40, 20]
        });

        // Add rows to table
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

        // Additional statistics
        const stats = calculateMessageStats(response.hits.hits);

        console.log("\nReport Statistics");
        console.log("=================");
        console.log(`Total Messages: ${stats.totalMessages}`);
        console.log(`Active Users: ${stats.activeUsers}`);
        console.log(`Most Active User: ${stats.mostActiveUser}`);
        console.log(`Most Common Topic: ${stats.mostCommonTopic}`);

    } catch (error) {
        console.error("Error generating table report:", error);
    }
}

// Helper function to calculate message statistics
function calculateMessageStats(hits) {
    const senderCount = {};
    const topicCount = {};
    const uniqueUsers = new Set();

    hits.forEach(hit => {
        const msg = hit._source;

        // Count sender messages
        senderCount[msg.Sender] = (senderCount[msg.Sender] || 0) + 1;

        // Count topics
        msg.Topics.forEach(topic => {
            topicCount[topic] = (topicCount[topic] || 0) + 1;
        });

        // Track unique users
        uniqueUsers.add(msg.Sender);
        uniqueUsers.add(msg.Receiver);
    });

    return {
        totalMessages: hits.length,
        activeUsers: uniqueUsers.size,
        mostActiveUser: Object.entries(senderCount).sort((a, b) => b[1] - a[1])[0][0],
        mostCommonTopic: Object.entries(topicCount).sort((a, b) => b[1] - a[1])[0][0]
    };
}

// Main function
async function main() {
    try {
        console.log("Starting Reporting System...");

        await createIndex();
        console.log("Waiting for index creation...");
        await new Promise(resolve => setTimeout(resolve, 2000));

        await indexDocuments();
        console.log("Waiting for indexing to complete...");
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Example report requests
        const questions = [
            "Could you please provide a summary of all messages?",
            "Could you present today's report in a table format?"
        ];

        for (const question of questions) {
            console.log(`\nProcessing request: "${question}"`);
            await generateReport(question);
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