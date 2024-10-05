const express = require('express');
const crypto = require('crypto-js');

const app = express();
app.use(express.json());

const PORT = 3000;

const secretKey = 'mySecretKey';

// Encryption function
const encrypt = (text) => {
    return crypto.AES.encrypt(text, secretKey).toString();
};

// Decryption function
const decrypt = (cipherText) => {
    const bytes = crypto.AES.decrypt(cipherText, secretKey);
    return bytes.toString(crypto.enc.Utf8);
};

app.get('/', (req, res) => {
    res.send('Welcome to NodeJS Encryption & Decryption Demo');
});

app.post('/encrypt', (req, res) => {
    const { text } = req.body;
    const encryptedText = encrypt(text);
    res.send({ encryptedText });
});

app.post('/decrypt', (req, res) => {
    const { cipherText } = req.body;
    const decryptedText = decrypt(cipherText);
    res.send({ decryptedText });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});