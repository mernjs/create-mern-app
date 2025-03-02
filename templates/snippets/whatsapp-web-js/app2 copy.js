const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode');
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

const client = new Client();

client.on('qr', async (qr) => {
    // Generate QR code and save it as an image
    const qrCodePath = path.join(__dirname, 'qr.png');
    
    await qrcode.toFile(qrCodePath, qr, function (err) {
        if (err) throw err;
        console.log('QR code saved as qr.png');
    });
});

client.on('ready', async () => {
    console.log('Client is ready!');
});

client.on('message', async msg => {
    console.log("Received message updated:", msg.body);
    const chats = await client.getChats();
    const groupChats = chats.filter(chat => chat.isGroup);
    if (groupChats.length > 0) {
        const groupChat = groupChats[0];
        console.log(`Group name: ${groupChat.name}`);
        const participants = groupChat.participants;
        console.log('Group Members:', participants);
    } else {
        console.log('No group chats found.');
    }
    if (msg.body === '!ping') {
        msg.reply('pong');
    }
});

client.initialize();

// Serve the QR code image via an Express endpoint
app.get('/qr', (req, res) => {
    const qrCodePath = path.join(__dirname, 'qr.png');
    
    // Check if the QR code image exists
    fs.access(qrCodePath, fs.constants.F_OK, (err) => {
        if (err) {
            return res.status(404).send('QR code not found.');
        }
        
        // Send the QR code image as a response
        res.sendFile(qrCodePath);
    });
});

// Start the Express server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
