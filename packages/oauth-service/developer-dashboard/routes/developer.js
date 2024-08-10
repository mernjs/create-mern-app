const express = require('express');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const Developer = require('../models/Developer');
const Application = require('../models/Application');

const router = express.Router();
const SECRET_KEY = 'your_secret_key';

// Render login page
router.get('/login', (req, res) => {
    res.render('developer/login', { error: null });
});

// Handle developer login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const developer = await Developer.findOne({ email });
    if (!developer || !(await developer.comparePassword(password))) {
        return res.render('developer/login', { error: 'Invalid credentials' });
    }

    // Generate an access token for the developer
    const token = jwt.sign({ developerId: developer._id }, SECRET_KEY, { expiresIn: '1h' });
    req.session.token = token;
    res.redirect('/developer/dashboard');
});

// Render registration page
router.get('/register', (req, res) => {
    res.render('developer/register', { error: null });
});

// Handle developer registration
router.post('/register', async (req, res) => {
    const { email, password } = req.body;
    const existingDeveloper = await Developer.findOne({ email });
    if (existingDeveloper) {
        return res.render('developer/register', { error: 'Email already in use' });
    }

    const developer = new Developer({ email, password });
    await developer.save();
    // Automatically log in the developer after registration
    const token = jwt.sign({ developerId: developer._id }, SECRET_KEY, { expiresIn: '1h' });
    req.session.token = token;
    res.redirect('/developer/dashboard');
});

// Middleware to authenticate developer
router.use((req, res, next) => {
    const token = req.session.token;
    if (!token) return res.redirect('/developer/login');

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.redirect('/developer/login');
        req.user = user;
        next();
    });
});

// Render developer dashboard
router.get('/dashboard', async (req, res) => {
    try {
        const applications = await Application.find({ developerId: req.user.developerId });
        res.render('developer/dashboard', { applications });
    } catch (err) {
        res.status(500).send('Error fetching applications');
    }
});

// Handle application creation
router.post('/applications', async (req, res) => {
    const { app_name, redirect_uri } = req.body;
    const developerId = req.user.developerId;

    // Generate client_id and client_secret
    const client_id = crypto.randomBytes(16).toString('hex');
    const client_secret = crypto.randomBytes(32).toString('hex');

    const app = new Application({ app_name, client_id, client_secret, redirect_uri, developerId });
    await app.save();

    res.redirect('/developer/dashboard'); // Redirect to dashboard after creation
});

// DELETE an application
router.post('/applications/:id', async (req, res) => {
    try {
        const appId = req.params.id;
        await Application.findByIdAndDelete(appId); // Find and delete the application by ID
        req.flash('success', 'Application deleted successfully');
        res.redirect('/developer/dashboard');
    } catch (err) {
        req.flash('error', 'Failed to delete application');
        res.redirect('/developer/dashboard');
    }
});


// Handle logout
router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('Logout failed');
        }
        res.redirect('/developer/login');
    });
});

module.exports = router;
