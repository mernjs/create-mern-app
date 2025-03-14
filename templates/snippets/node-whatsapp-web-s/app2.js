const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode');
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const client = new Client();
let qrCodeImagePath = null;  // Store the path to the generated QR code image
let isConnected = false;      // A flag to track if the client is connected

// Generate QR code and save it as an image
client.on('qr', (qr) => {
    console.log('QR received, generating image...');
    const filePath = path.join(__dirname, 'qr_code.png');  // Define the path for the image
    qrCodeImagePath = filePath;

    // Generate the QR code and save it to a file
    qrcode.toFile(filePath, qr, (err) => {
        if (err) {
            console.error('Failed to save QR code image:', err);
        } else {
            console.log('QR code image saved successfully!');
        }
    });
});

// Listen for the 'authenticated' event
client.on('authenticated', () => {
    console.log('Client authenticated successfully!');
});

// Listen for the 'ready' event to know when the client is connected
client.on('ready', async () => {
    console.log('Client is ready and connected!');

    // Set the connection status to true
    isConnected = true;

    // Log user info after QR code is scanned and the client is authenticated
    const userInfo = client.info;
    console.log(`Logged in as ${userInfo.pushname} (Phone: ${userInfo.me.user})`);

    // Get and display all chats
    const chats = await client.getChats();
    console.log(`You have ${chats.length} chats`);

    // Get and display group chats
    const groupChats = chats.filter(chat => chat.isGroup);
    if (groupChats.length > 0) {
        console.log(`You are in ${groupChats.length} group(s):`);
        groupChats.forEach(group => {
            console.log(`Group Name: ${group.name}, Participants: ${group.participants.length}`);
        });
    } else {
        console.log('No group chats found.');
    }
});

// Handle incoming messages
client.on('message', async msg => {
    console.log('Message received:', msg.body);

    if (msg.body === '!ping') {
        msg.reply('pong');
    }
});

// Initialize the WhatsApp client
client.initialize();

// Express API route to serve the QR code image or connection status
app.get('/qr', (req, res) => {
    if (isConnected) {
        // If the client is connected, send a success response
        res.send('Connected successfully!');
    } else if (qrCodeImagePath && fs.existsSync(qrCodeImagePath)) {
        // If the client is not connected yet, send the QR code image
        res.sendFile(qrCodeImagePath);
    } else {
        res.status(404).send('QR code not yet generated. Please try again later.');
    }
});

// Start the Express server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
