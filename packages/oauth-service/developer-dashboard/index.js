const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const developerRoutes = require('./routes/developer');
const cors = require('cors'); // Import cors

const app = express();
const PORT = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/login-with-vpjs', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Set up CORS to allow all domains
app.use(cors());

// Set up body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set up session management
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
        mongoUrl: 'mongodb://localhost:27017/login-with-vpjs', // MongoDB URI
        collectionName: 'sessions', // Collection name for storing sessions
        ttl: 3 * 30 * 24 * 60 * 60 // Session TTL in seconds (3 months)
    }),
    cookie: {
        maxAge: 3 * 30 * 24 * 60 * 60 * 1000, // 3 months in milliseconds
        secure: false, // Set to true if using HTTPS
        httpOnly: true
    }
}));

// Initialize flash
app.use(flash());

// Make flash messages available to all templates
app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

// Set EJS as the template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files (e.g., CSS)
app.use(express.static(path.join(__dirname, 'public')));

// Use routes
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/developer', developerRoutes);

app.listen(PORT, () => {
    console.log(`OAuth2.0 Server running on port ${PORT}`);
});
