const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
 
const client = new Client();
 
client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
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