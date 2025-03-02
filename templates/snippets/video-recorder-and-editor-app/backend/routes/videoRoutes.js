// routes/videoRoutes.js
const express = require('express');
const multer = require('multer');
const Video = require('../models/Video');
const path = require('path');

const router = express.Router();

// Set up Multer for file storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Set upload destination
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname)); // Create unique file name
    },
});

const upload = multer({ storage });

// Upload Video Endpoint
router.post('/upload', upload.single('video'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    try {
        // Function to generate a random video title
        const generateRandomTitle = () => {
            const adjectives = ['Amazing', 'Incredible', 'Fantastic', 'Exciting', 'Breathtaking'];
            const nouns = ['Adventure', 'Journey', 'Experience', 'Moment', 'Showcase'];
            const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
            const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
            return `${randomAdjective} ${randomNoun}`; // Combine to form a title
        };

        const video = new Video({
            title: generateRandomTitle(), // Use the generated random title
            filePath: req.file.path,
        });
        await video.save();
        res.status(201).json({ message: 'Video uploaded successfully', video });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to upload video' });
    }
});


// Get all videos and sort by createdAt in descending order
router.get('/', async (req, res) => {
    try {
        const videos = await Video.find().sort({ createdAt: -1 }); // Sort by createdAt descending
        res.status(200).json(videos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch videos' });
    }
});


// New API Endpoint: Get a specific video by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const video = await Video.findById(id);
        if (!video) {
            return res.status(404).json({ error: 'Video not found' });
        }
        res.status(200).json(video);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch video' });
    }
});

module.exports = router;
