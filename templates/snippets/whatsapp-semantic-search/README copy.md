# WhatsApp Web API with QR Code Authentication

This project uses the [whatsapp-web.js](https://github.com/pedroslopez/whatsapp-web.js) library to interact with WhatsApp Web and the [qrcode](https://www.npmjs.com/package/qrcode) library to generate QR codes for authentication. The server runs with Next.js, providing a route to display the QR code and manage client connections.

## Installation

1. **Install dependencies:**

```bash
npm install whatsapp-web.js qrcode
```

## Code Examples

### 1. Initialize the WhatsApp Client

In `index.js`, we initialize the WhatsApp client and handle authentication and messages.

```javascript
const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode');
const fs = require('fs');
const path = require('path');

const client = new Client();
let qrCodeImagePath = null;
let isConnected = false;

client.on('qr', (qr) => handleQR(qr));
client.on('authenticated', handleAuthenticated);
client.on('ready', handleReady);
client.on('message', handleMessage);
client.initialize();
```

### 2. Handling QR Code Generation

The `qr` event is emitted when WhatsApp generates a QR code. This QR code is saved as an image file, `qr_code.png`.

```javascript
function handleQR(qr) {
    console.log('QR received, generating image...');
    const filePath = path.join(__dirname, 'qr_code.png');
    qrCodeImagePath = filePath;

    qrcode.toFile(filePath, qr, (err) => {
        if (err) {
            console.error('Failed to save QR code image:', err);
        } else {
            console.log('QR code image saved successfully!');
        }
    });
}
```

### 3. Handle Authentication and Readiness

- **Authentication Event**: Logs a success message upon successful client authentication.
  
  ```javascript
  function handleAuthenticated() {
      console.log('Client authenticated successfully!');
  }
  ```

- **Ready Event**: Logs the client as ready and retrieves group information.

  ```javascript
  async function handleReady() {
      console.log('Client is ready and connected!');
      isConnected = true;
      await getGroupChats();
  }
  ```

### 4. Retrieving Group Chat Information

```javascript
async function getGroupChats() {
    const chats = await client.getChats();
    console.log(`You have ${chats.length} chats`);

    const groupChats = chats.filter(chat => chat.isGroup);
    if (groupChats.length > 0) {
        console.log(`You are in ${groupChats.length} group(s):`);
        groupChats.forEach(group => {
            console.log(`Group Name: ${group.name}, Participants: ${group.participants.length}`);
        });
    } else {
        console.log('No group chats found.');
    }
}
```

### 5. Handling Incoming Messages and Replies

The `message` event listens for incoming messages. If a message with the body `!ping` is received, the bot replies with `pong`.

```javascript
async function handleMessage(msg) {
    console.log('Message received:', msg.body);
    if (msg.body === '!ping') {
        await replyMessage(msg, 'pong');
    }
}

async function replyMessage(msg, replyText) {
    await msg.reply(replyText);
}
```

### 6. Sending a Message to a Specific Chat

The `sendMessage` function sends a message to a chat by its ID.

```javascript
async function sendMessage(chatId, message) {
    const chat = await client.getChatById(chatId);
    await chat.sendMessage(message);
}
```

### 7. Fetching Messages from a Chat

This function retrieves the latest messages from a specified chat.

```javascript
async function getMessages(chatId) {
    const chat = await client.getChatById(chatId);
    const messages = await chat.fetchMessages({ limit: 10 });
    return messages;
}
```

### 8. Next.js API Route for QR Code and Connection Status

In `pages/api/qr.js`, create an API route to serve the QR code image or connection status:

```javascript
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    if (isConnected) {
        res.send('Connected successfully!');
    } else if (qrCodeImagePath && fs.existsSync(qrCodeImagePath)) {
        res.sendFile(qrCodeImagePath);
    } else {
        res.status(404).send('QR code not yet generated. Please try again later.');
    }
}
```

This endpoint:
- Sends "Connected successfully!" if the client is authenticated.
- Serves the QR code image if available.
- Sends a 404 status if the QR code is not yet generated.


# Elasticsearch Semantic Search

This project demonstrates creating an Elasticsearch index, generating embeddings for documents, and performing semantic searches using cosine similarity on embeddings.

## Account Configuration on Elastic Cloud Instructions

To use Elastic Cloud for hosting your Elasticsearch instance, follow these steps to set up an account and retrieve the necessary credentials.

1. **Create an Elastic Cloud Account:**

   Go to [Elastic Cloud](https://cloud.elastic.co/) and create an account if you don't already have one. Elastic Cloud offers managed Elasticsearch clusters with built-in security and machine learning features.

2. **Create a Deployment:**

   - After logging in, create a new deployment.
   - Choose a deployment name, region, and configurations based on your needs (you can start with the free trial).
   - Ensure **Machine Learning** is enabled if you plan to use embedding models.
   - Once the deployment is ready, take note of the **Deployment URL** and **API Key**.

3. **Retrieve Credentials:**

   - From the **Security** section of the deployment, create an **API Key** with permissions for `read` and `write` access to the machine learning and indexing APIs.
   - Note down the **API Key** as you’ll use it in the environment configuration.

4. **Enable Trained Models:**

   - Make sure that your deployment has the `.elser_model_2` model (or another embedding model) installed and ready to use. You can check this in the Machine Learning section of the deployment.


### Installation

1. **Install dependencies:**

   ```bash
   npm install @elastic/elasticsearch dotenv
   ```

2. **Configure environment variables:**

   Create a `.env` file in the root directory with the following variables:

   ```plaintext
   ELASTICSEARCH_HOST=http://localhost:9200
   ELASTICSEARCH_API_KEY=your_api_key
   INDEX_NAME=your_index_name
   ```

   - `ELASTICSEARCH_HOST`: URL of your Elasticsearch instance.
   - `ELASTICSEARCH_API_KEY`: API key for Elasticsearch authentication.
   - `INDEX_NAME`: Name of the index to be created in Elasticsearch.

3. **Prepare the dataset:**

   Ensure `dataset.json` exists in the root directory. The file should be structured like this:

   ```json
   [
     {
       "Sender": "Alice",
       "Receiver": "Bob",
       "Timestamp": "2024-11-02 15:23:45",
       "Message": "Hello, this is a test message.",
       "Topics": ["test", "message"]
     }
   ]
   ```

## Code Examples

### 1. Configure Elasticsearch Client

The `elasticsearch.js` file sets up an Elasticsearch client using environment variables, enabling the app to connect and authenticate with the Elasticsearch instance.

```javascript
// elasticsearch.js
const { Client } = require('@elastic/elasticsearch');
require('dotenv').config();

const client = new Client({
  node: process.env.ELASTICSEARCH_HOST,
  auth: {
    apiKey: process.env.ELASTICSEARCH_API_KEY,
  },
});

module.exports = client;
```

### 2. Indexing Data

The `indexData.js` file includes functions to create an index with the required mappings and index data with embeddings generated from each document.

#### **Code to Generate Embeddings:**

The `getEmbedding` function uses the `.elser_model_2` model in Elasticsearch to generate embeddings for each document.

```javascript
const client = require('./elasticsearch');
const dataset = require('./dataset.json');
require('dotenv').config();

async function getEmbedding(text) {
    try {
        const response = await client.ml.inferTrainedModel({
            model_id: '.elser_model_2',
            body: {
                docs: [{ text_field: text }],
            },
        });
        const embedding = response.inference_results[0].predicted_value;
        return embedding;
    } catch (error) {
        console.error('Error generating embedding:', error);
        throw error;
    }
}
```

#### **Code to Create the Index:**

The `createIndex` function creates an index with mappings for `sender`, `receiver`, `timestamp`, `message`, `topics`, and `embedding` fields.

```javascript
async function createIndex() {
    const indexExists = await client.indices.exists({ index: process.env.INDEX_NAME });

    if (indexExists) {
        await client.indices.delete({ index: process.env.INDEX_NAME });
        console.log(`Index "${process.env.INDEX_NAME}" deleted.`);
    }

    await client.indices.create({
        index: process.env.INDEX_NAME,
        body: {
            mappings: {
                properties: {
                    sender: { type: 'keyword' },
                    receiver: { type: 'keyword' },
                    timestamp: { type: 'date', format: 'yyyy-MM-dd HH:mm:ss' },
                    message: { type: 'text' },
                    topics: { type: 'keyword' },
                    embedding: {
                        type: 'dense_vector',
                        dims: 768 
                    }
                }
            }
        }
    });

    console.log(`Index "${process.env.INDEX_NAME}" created successfully.`);
}
```

#### **Code to Index Data:**

The `indexData` function reads data from `dataset.json`, generates embeddings, and indexes the data in Elasticsearch.

```javascript
async function indexData() {
    try {
        const bulkOps = [];

        for (const message of dataset) {
            const { Sender, Receiver, Timestamp, Message, Topics } = message;
            const combinedText = `${Sender} ${Receiver} ${Timestamp} ${Message} ${Topics.join(' ')}`;
            const embedding = await getEmbedding(combinedText);
            if (embedding) { 
                bulkOps.push(
                    { index: { _index: process.env.INDEX_NAME } },
                    { ...message, embedding: embedding }
                );
            } else {
                console.warn(`Skipping document due to missing embedding: ${message}`);
            }
        }
        await client.bulk({ refresh: true, body: bulkOps });
        console.log('All messages indexed successfully!');
    } catch (error) {
        console.error('Errors occurred during bulk indexing.', error);
    }
}

(async () => {
    try {
        await createIndex();
        await indexData();
        process.exit(0);
    } catch (error) {
        console.error('Error indexing data:', error);
        process.exit(1);
    }
})();
```

### 3. Performing Semantic Search

The `search.js` file performs semantic searches by generating an embedding for the query and using it to find the most similar documents in the index.

#### **Code to Generate Query Embedding:**

The `getQueryEmbedding` function creates an embedding vector for the search query using the same model.

```javascript
const client = require('./elasticsearch');
require('dotenv').config();

async function getQueryEmbedding(query) {
    try {
        const response = await client.ml.inferTrainedModel({
            model_id: '.elser_model_2',
            body: {
                docs: [{ text_field: query }], 
            },
        });
        const embedding = response.inference_results[0].predicted_value;
        return embedding;
    } catch (error) {
        console.error('Error generating embedding:', error);
        throw error;
    }
}
```

#### **Code to Perform Semantic Search:**

The `semanticSearch` function uses cosine similarity to rank results based on similarity to the query embedding.

```javascript
async function semanticSearch(query, k = 5) {
  try {
    const embedding = await getQueryEmbedding(query);

    const response = await client.search({
      index: process.env.INDEX_NAME,
      size: k,
      body: {
        query: {
          script_score: {
            query: { match_all: {} },
            script: {
              source: "cosineSimilarity(params.query_vector, 'embedding') + 1.0",
              params: { query_vector: embedding }
            }
          }
        },
        _source: {
          includes: ["sender", "receiver", "timestamp", "message", "topics"]
        }
      }
    });

    console.log("FULL RESPONSE ==>>", response);

    const hits = response.hits.hits;

    const results = hits.map(hit => ({
      sender: hit._source.sender,
      receiver: hit._source.receiver,
      timestamp: hit._source.timestamp,
      message: hit._source.message,
      topics: hit._source.topics,
      score: hit._score
    }));

    return results;
  } catch (error) {
    console.error('Error performing semantic search:', error);
    throw error;
  }
}

module.exports = { semanticSearch };
```

### Running a Search Query

To perform a semantic search for `"Hello, this is a test message"` and retrieve the top 5 results:

```javascript
const { semanticSearch } = require('./search');

semanticSearch("Hello, this is a test message", 5)
  .then(results => console.log(results))
  .catch(error => console.error(error));
```