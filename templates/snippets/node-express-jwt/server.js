const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

const APP_PORT = 3000

const generateToken = (payload) => {
    try {
        const token = jwt.sign(payload, 'your_secret_key', { expiresIn: '1h' });
        return token
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

const verifyToken = (req, res, next) => {
    try {
        const token = req.headers['authorization'];
        if (token == null) return res.status(401).json({ message: "Authorization token not provided!" });

        jwt.verify(token, 'your_secret_key', (err, user) => {
            if (err) return res.status(403).json({ message: "Invalid provided authorization token!" });
            req.user = user;
            next();
        });
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
};

app.get('/', (req, res) => {
    try {
        res.status(200).send({ message: 'Welcome to JWT Demo!' });
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
});

app.post('/login', (req, res) => {
    try {
        const { email, password } = req.body;
        const token = generateToken({ email, password })
        res.json({ token });
        res.status(200).send({ message: "User Loggedin Successfully!" })
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
});

app.get('/profile', verifyToken, (req, res) => {
    try {
        res.status(200).send({ message: "Profile Get Successfully!", data: { email: req.user.email } });
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
});

app.listen(APP_PORT, () => {
    console.log(`Server running on http://localhost:${APP_PORT}`);
});
