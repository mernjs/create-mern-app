// app.js
const express = require('express');
const { semanticSearch } = require('./search');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

/**
 * @route POST /search
 * @desc Perform semantic search on WhatsApp messages
 * @body { query: string }
 */
app.post('/search', async (req, res) => {
  const { query, k } = req.body;

  if (!query) {
    return res.status(400).json({ error: 'Query is required.' });
  }

  try {
    const results = await semanticSearch(query, k || 5);
    res.json({ results });
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'An error occurred while performing the search.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
