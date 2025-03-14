const { Client } = require('@elastic/elasticsearch');
const readline = require('readline');

// Initialize Elasticsearch client
const client = new Client({
    node: '',
    auth: {
        apiKey: ''
    }
});


(async () => {
    // const ping = await client.ping();
    // console.log('Elasticsearch cluster is up:', ping);
    // const indices = await client.cat.indices();
    // console.log('Indices:', indices);
})()

// Function to search WhatsApp messages in Elasticsearch
async function searchMessages(query) {
    //   const { body } = await client.search({
    //     index: 'whatsapp_messages',
    //     body: {
    //       query: {
    //         match: {
    //           message: query
    //         }
    //       }
    //     }
    //   });

    // Let's search!
    const body = await client.search({
        index: 'whatsapp_messages',
        q: query
    });

    console.log("BODY ==>>", body)

    if (!body || !body.hits) {
        throw new Error('Unexpected response structure');
    }

    return body.hits.hits.map(hit => hit._source);
}

// Simple bot logic to ask a question and retrieve relevant messages
async function chatbot() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('Ask your question: ', async (query) => {
        const results = await searchMessages(query);

        if (results.length) {
            console.log('Here are the relevant messages I found:');
            results.forEach((msg, index) => {
                console.log(`${index + 1}. [${msg.timestamp}] ${msg.sender}: ${msg.message}`);
            });
        } else {
            console.log('No relevant messages found.');
        }

        rl.close();
    });
}

// Start the bot
chatbot();
