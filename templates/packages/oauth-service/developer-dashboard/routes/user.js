const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();
const SECRET_KEY = 'your_secret_key';

// Serve the profile page
router.get('/profile', async (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, SECRET_KEY, async (err, user) => {
        if (err) return res.sendStatus(403);

        try {
            const userProfile = await User.findById(user.userId).select('-password');
            if (!userProfile) {
                return res.status(404).json({ error: 'User not found' });
            }

            res.json(userProfile);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });
});

module.exports = router;
