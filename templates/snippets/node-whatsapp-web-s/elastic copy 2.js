const express = require('express');
const { Client } = require('@elastic/elasticsearch');
const client = new Client({
    node: '',
    auth: {
        apiKey: ''
    }
});

const app = express();
const port = 3000;

app.use(express.json());


(async () => {
    const resp = await client.info();
    console.log("RES =>", resp)
})()

app.post('/webhook', async (req, res) => {
    const messageData = req.body;

    try {
        // Store the message in Elasticsearch
        await client.index({
            index: 'whatsapp_messages',
            body: {
                sender: messageData.sender,
                message: messageData.message,
                timestamp: messageData.timestamp || new Date().toISOString(),
                groupName: messageData.groupName
            }
        });

        res.status(200).send({ message: 'Message received and stored in Elasticsearch' });
    } catch (error) {
        console.error('Error storing message in Elasticsearch:', error);
        res.status(500).send('Error storing message');
    }
});

app.listen(port, () => {
    console.log(`Webhook server listening at http://localhost:${port}`);
});