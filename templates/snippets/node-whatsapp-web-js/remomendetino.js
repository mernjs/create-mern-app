const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.static('public'));

// Define a function to use a Hugging Face model
async function fetchFromHuggingFace(prompt) {
    try {
        console.log("Loading model and fetching response...");
        const response = await axios.post('https://api-inference.huggingface.co/models/distilgpt2', {
            inputs: prompt,
        }, {
            headers: {
                'Authorization': `Bearer `, // Optional if you need to authenticate
            }
        });

        console.log("Hugging Face response:", response.data); // Log the entire response
        return response.data[0]?.generated_text || 'No response generated';
    } catch (error) {
        console.error("Error fetching from Hugging Face:", error);
        return 'Error occurred while fetching recommendations.';
    }
}

// Fetch movies from TMDb based on the search query
async function fetchMovies(query) {
    const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=adf52b4aebd188d07cc115527212a9f8&query=${query}`);
    return response.data.results;
}

// Endpoint to get movie recommendations
app.get('/recommend', async (req, res) => {
    const preferences = "I love action and adventure movies.";

    try {
        const recommendations = await fetchFromHuggingFace(`Based on my preference for action and adventure movies, please suggest 3 movies along with their genres and brief descriptions.`);

        console.log("Recommendations for TMDb query:", recommendations);

        const movies = await fetchMovies(recommendations);

        const movieDetails = movies.map(movie => ({
            title: movie.title,
            description: movie.overview,
            releaseDate: movie.release_date,
            rating: movie.vote_average,
        }));

        res.json({ recommendations: movieDetails });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
});

// Serve index.html
app.get('/', (req, res) => {
    res.json({ recommendations: "" });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
