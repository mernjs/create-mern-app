const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Token = require('../models/Token');
const Application = require('../models/Application');

const router = express.Router();
const SECRET_KEY = 'your_secret_key';

// OAuth2.0 Authorization Endpoint
router.get('/authorize', async (req, res) => {
    const { client_id, client_secret, redirect_uri } = req.query;

    // Validate the application
    const app = await Application.findOne({ client_id, client_secret, redirect_uri });
    if (!app) return res.status(400).send('Invalid client_id, client_secret, or redirect_uri');

    // Check if user is already logged in
    if (req.session.userId) {
        try {
            // Find the user by ID from session
            const user = await User.findById(req.session.userId);
            if (user) {
                // Generate an authorization code
                const authCode = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '10m' });
                // Redirect to the provided redirect_uri with the authorization code
                // return res.redirect(`${redirect_uri}?code=${authCode}`);
                return res.render('profile', {
                    redirect_uri,
                    authCode,
                    email: user?.email || ""
                });
            }
        } catch (err) {
            console.error(err);
            return res.status(500).send('Internal Server Error');
        }
    }
    // If not logged in, render the login page
    res.render('login', {
        client_id,
        client_secret,
        redirect_uri,
        message: req.flash('message')
    });
});

// Handle login form submission
router.post('/perform_login', async (req, res) => {
    const { email, password, client_id, client_secret, redirect_uri } = req.body;
    
    // Validate the application
    const app = await Application.findOne({ client_id, client_secret, redirect_uri });
    if (!app) return res.status(400).send('Invalid client_id, client_secret, or redirect_uri');

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
        req.flash('message', 'Invalid credentials');
        return res.redirect(`/auth/authorize?client_id=${client_id}&client_secret=${client_secret}&redirect_uri=${redirect_uri}`);
    }

    // Store user ID in session
    req.session.userId = user._id;

    // Generate authorization code
    const authCode = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '10m' });
    res.redirect(`${redirect_uri}?code=${authCode}`);
});

// Serve the registration page
router.get('/register', (req, res) => {
    const { client_id, client_secret, redirect_uri } = req.query;
    res.render('register', {
        client_id,
        client_secret,
        redirect_uri,
        message: req.flash('message')
    });
});

// Handle registration form submission
router.post('/perform_register', async (req, res) => {
    const { email, password, client_id, client_secret, redirect_uri } = req.body;

    // Validate the application
    const app = await Application.findOne({ client_id, client_secret, redirect_uri });
    if (!app) return res.status(400).send('Invalid client_id, client_secret, or redirect_uri');

    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        req.flash('message', 'Email already in use');
        return res.redirect(`/auth/register?client_id=${client_id}&client_secret=${client_secret}&redirect_uri=${redirect_uri}`);
    }

    const user = new User({ email, password });
    await user.save();

    // Generate authorization code
    const authCode = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '10m' });

    // Redirect to the provided redirect_uri with the authorization code
    res.redirect(`${redirect_uri}?code=${authCode}`);
});

// OAuth2.0 Token Endpoint
router.post('/token', async (req, res) => {
    const { code, client_id, client_secret, redirect_uri } = req.body;

    try {
        // Validate the application
        const app = await Application.findOne({ client_id, client_secret, redirect_uri });
        if (!app) return res.status(400).json({ error: 'Invalid client_id, client_secret, or redirect_uri' });

        const decoded = jwt.verify(code, SECRET_KEY);
        const user = await User.findById(decoded.userId);

        if (user) {
            const accessToken = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1h' });
            const refreshToken = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '7d' });

            // Save the refresh token in the database
            const token = new Token({
                token: refreshToken,
                userId: user._id,
                expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
            });
            await token.save();

            res.json({
                access_token: accessToken,
                refresh_token: refreshToken,
                token_type: 'bearer',
                expires_in: 3600 // 1 hour in seconds
            });
        } else {
            res.status(400).json({ error: 'Invalid authorization code' });
        }
    } catch (err) {
        res.status(400).json({ error: 'Invalid authorization code' });
    }
});


// OAuth2.0 Refresh Token Endpoint
router.post('/refresh', async (req, res) => {
    const { access_token } = req.body;

    try {
        // Verify the access token
        const decoded = jwt.verify(access_token, SECRET_KEY);
        const user = await User.findById(decoded.userId);
        
        if (!user) {
            return res.status(401).json({ error: 'Invalid access token' });
        }

        // Check if a refresh token already exists
        let token = await Token.findOne({ userId: user._id });
        if (!token) {
            return res.status(401).json({ error: 'No refresh token available for this user' });
        }

        // Generate a new refresh token
        const newRefreshToken = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '7d' });
        const newAccessToken = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1h' });

        // Update or save the new refresh token
        token.token = newRefreshToken;
        token.expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
        await token.save();

        res.json({
            access_token: newAccessToken,
            refresh_token: newRefreshToken,
            token_type: 'bearer',
            expires_in: 3600 // 1 hour in seconds
        });
    } catch (err) {
        res.status(400).json({ error: 'Invalid access token' });
    }
});

// Handle logout
router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('Logout failed');
        }
        res.redirect('/auth/authorize');
    });
});

module.exports = router;
