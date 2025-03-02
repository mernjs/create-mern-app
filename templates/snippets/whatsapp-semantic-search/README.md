# Technical Approach

This project integrates WhatsApp Web API with QR Code-based authentication using the `whatsapp-web.js` library and implements semantic search on chat data using Elasticsearch.

## Table of Contents
1. [Introduction](#introduction)
2. [Prerequisites](#prerequisites)
3. [Project Setup](#project-setup)
4. [WhatsApp Web API with QR Code Authentication](#whatsapp-web-api-with-qr-code-authentication)
   - [Libraries Used](#libraries-used)
   - [Installation](#installation)
   - [Code Explanation](#code-explanation)
5. [Elasticsearch Semantic Search](#elasticsearch-semantic-search)
   - [Setting Up Elastic Cloud](#setting-up-elastic-cloud)
   - [Installation](#installation)
   - [Code Explanation](#code-explanation)

## Introduction

This project showcases two functionalities:
1. **WhatsApp Web API**: Interacting with WhatsApp Web through QR Code-based authentication to manage messaging and retrieve group chats.
2. **Elasticsearch Semantic Search**: Performing semantic search on WhatsApp messages stored in Elasticsearch, using embedding-based search for retrieving relevant messages.

---

## Prerequisites

Ensure the following prerequisites are met:

- **Node.js**: Install Node.js (v12 or later).
- **Elastic Cloud Account**: Optional if you want to host Elasticsearch on the cloud; otherwise, set up a local Elasticsearch instance.

---

## Project Setup

1. **Clone the Repository**:
   ```bash
   git clone <repository_url>
   cd <repository_name>
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

---

## WhatsApp Web API with QR Code Authentication

This component enables WhatsApp Web interaction via a Node.js server, allowing QR code-based authentication to automate messaging tasks.

### Libraries Used

- [`whatsapp-web.js`](https://github.com/pedroslopez/whatsapp-web.js): Handles session management, QR code scanning, and messaging.
- [`qrcode`](https://www.npmjs.com/package/qrcode): Generates QR codes for authentication.

### Installation

1. **Install Libraries**:
   ```bash
   npm install whatsapp-web.js qrcode
   ```

### Code Explanation

#### Initializing the WhatsApp Client

The client manages WhatsApp authentication and listens for incoming messages.

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

#### Handling QR Code Generation

The `qr` event handler generates a QR code image (`qr_code.png`) that can be scanned for authentication.

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

#### Authentication and Readiness Handling

Once authenticated, the bot retrieves all group chat information.

```javascript
function handleAuthenticated() {
    console.log('Client authenticated successfully!');
}

async function handleReady() {
    console.log('Client is ready and connected!');
    isConnected = true;
    await getGroupChats();
}
```

#### Retrieving Group Chat Information

Lists all WhatsApp groups with their names and participant counts.

```javascript
async function getGroupChats() {
    const chats = await client.getChats();
    const groupChats = chats.filter(chat => chat.isGroup);
    
    groupChats.forEach(group => {
        console.log(`Group Name: ${group.name}, Participants: ${group.participants.length}`);
    });
}
```

#### Handling Incoming Messages and Replies

The bot replies "pong" to any message that contains `!ping`.

```javascript
async function handleMessage(msg) {
    if (msg.body === '!ping') {
        await replyMessage(msg, 'pong');
    }
}

async function replyMessage(msg, replyText) {
    await msg.reply(replyText);
}
```

#### Sending Messages and Retrieving Chat Messages

The bot can send messages to specified chat IDs and retrieve chat history.

```javascript
async function sendMessage(chatId, message) {
    const chat = await client.getChatById(chatId);
    await chat.sendMessage(message);
}

async function getMessages(chatId) {
    const chat = await client.getChatById(chatId);
    const messages = await chat.fetchMessages({ limit: 10 });
    return messages;
}
```

### Serving QR Code and Connection Status (Next.js API)

An API endpoint serves the QR code image or displays the connection status.

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

---

## Elasticsearch Semantic Search

This component utilizes Elasticsearch to index WhatsApp messages and perform semantic searches using vector embeddings.

### Setting Up Elastic Cloud

1. **Create an Elastic Cloud Account**: Go to [Elastic Cloud](https://cloud.elastic.co/) and create an account.
2. **Create a Deployment**: Configure the deployment, enabling **Machine Learning** for embedding generation.
3. **Retrieve Credentials**: Obtain the **API Key** and **Deployment URL** for authentication.
4. **Enable Trained Models**: Ensure that the `.elser_model_2` model is available for generating embeddings.

### Installation

1. **Install Elasticsearch Dependencies**:
   ```bash
   npm install @elastic/elasticsearch dotenv
   ```

2. **Configure Environment Variables**:
   Create a `.env` file and add your credentials:

   ```plaintext
   ELASTICSEARCH_HOST=http://localhost:9200
   ELASTICSEARCH_API_KEY=your_api_key
   INDEX_NAME=your_index_name
   ```

3. **Prepare Dataset**:
   Create a `dataset.json` file with WhatsApp messages:

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

### Code Explanation

#### Configuring Elasticsearch Client

The client authenticates with Elasticsearch using environment variables.

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

#### Indexing Data with Embeddings

This module creates an index, generates embeddings for each document, and indexes the data.

##### Generating Embeddings

The `getEmbedding` function creates embeddings for messages using the `.elser_model_2` model.

```javascript
async function getEmbedding(text) {
    const response = await client.ml.inferTrainedModel({
        model_id: '.elser_model_2',
        body: { docs: [{ text_field: text }] },
    });
    return response.inference_results[0].predicted_value;
}
```

##### Creating the Index

Defines the index mappings and creates the index.

```javascript
async function createIndex() {
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
                    embedding: { type: 'dense_vector', dims: 768 }
                }
            }
        }
    });
}
```

##### Indexing Data

Indexes messages from `dataset.json` with embeddings.

```javascript
async function indexData() {
    const bulkOps = [];
    for (const message of dataset) {
        const embedding = await getEmbedding(message.Message);
        bulkOps.push(
            { index: { _index: process.env.INDEX_NAME } },
            { ...message, embedding: embedding }
        );
    }
    await client.bulk({ refresh: true, body: bulkOps });
}
```

#### Performing Semantic Search

The `semanticSearch` function generates query embeddings and retrieves matching documents.

```javascript
async function semanticSearch(query, k = 5) {
  const embedding = await getEmbedding(query);

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
      _source: ["sender", "receiver", "timestamp", "message", "topics"]
    }
  });

  return response.hits.hits.map(hit => ({
    sender: hit._source.sender,
    receiver: hit._source.receiver,
    timestamp: hit._source.timestamp,
    message: hit._source.message,
    score: hit._score
  }));
}
```
