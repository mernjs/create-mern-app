const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const client = new Client();

// Generate and display the QR code
client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
    console.log('QR code generated, please scan it with your phone.');
});

// Listen for the 'authenticated' event to check if the client is logged in
client.on('authenticated', () => {
    console.log('Client authenticated successfully!');
});

// Listen for the 'ready' event, which is triggered after the QR code is scanned and the session is active
client.on('ready', async () => {
    console.log('Client is ready!');

    // Get user info (the logged-in user's profile details)
    const userInfo = client.info;
    console.log(`Logged in as ${userInfo.pushname} (Phone: ${userInfo.me.user})`);

    // Get all chats
    const chats = await client.getChats();
    console.log(`You have ${chats.length} chats`);

    // Get contacts
    const contacts = await client.getContacts();
    console.log(`You have ${contacts.length} contacts`);

    // Filter out group chats
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

// Log messages received
client.on('message', async msg => {
    console.log("Message received:", msg.body);

    // Example response to a specific message
    if (msg.body === '!ping') {
        msg.reply('pong');
    }
});

// Initialize the client and begin the QR code generation process
client.initialize();
