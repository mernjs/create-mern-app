const express = require('express');
const rateLimit = require('express-rate-limit');

const app = express();
app.use(express.json());

const PORT = 3000;

// Define rate limiting rule
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minutes
    max: 1, // Limit each IP to 100 requests per windowMs
    handler: (req, res) => {
        res.status(429).json({
            message: 'Too many requests from this IP, please try again after 1 minutes'
        });
    },
});

// Apply rate limiting middleware to all requests
app.use(limiter);

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Express Rate Limit Demo' });
});

app.get('/profile', (req, res) => {
    res.json({ message: 'Profile Get Successfully!' });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});