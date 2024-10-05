const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client();

client.on('qr', (qr) => {
    // Generate and scan this code with your phone
    qrcode.generate(qr, { small: true });
});

client.on('ready', async () => {
    console.log('Client is ready!');
});

client.on('message', async msg => {
    console.log("Received message updated:", msg.body);


    // Fetch all chats
    const chats = await client.getChats();

    // Filter only group chats
    const groupChats = chats.filter(chat => chat.isGroup);


    if (groupChats.length > 0) {
        // Select the first group chat (you can modify to get a specific group)
        const groupChat = groupChats[0];
    console.log("groupChats ==>>", groupChat)

        console.log(`Group name: ${groupChat.name}`);

        // Fetch group participants
        const participants = groupChat.participants;

        console.log('Group Members:', participants);
        participants.forEach(participant => {
            console.log(`Member ID: ${participant.id._serialized}, Is Admin: ${participant.isAdmin}`);
        });
    } else {
        console.log('No group chats found.');
    }

    if (msg.body === '!ping') {
        msg.reply('pong');
    }
});

client.initialize();
