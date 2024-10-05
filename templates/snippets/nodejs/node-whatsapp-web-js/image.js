const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

dotenv.config();
const app = express();

// Function to transform image using Hugging Face model
async function transformImage(imagePath) {
    const imageData = fs.readFileSync(imagePath);
    const base64Image = imageData.toString('base64');

    const response = await axios.post(
        'https://api-inference.huggingface.co/models/CompVis/stable-diffusion-v1-4', // Change to a valid model
        {
            inputs: base64Image,
        },
        {
            headers: {
                'Authorization': `Bearer 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`,
                'Content-Type': 'application/json'
            }
        }
    );

    console.log("RES ==>>", response)

    // Check the response structure and extract the image correctly
    return response.data; // Adjust this based on your model's output
}

function isBase64(string) {
    const base64Pattern = /^[A-Za-z0-9+/]+={0,2}$/;
    return base64Pattern.test(string);
}

// Endpoint to handle image uploads and transformation
app.get('/transform', async (req, res) => {
    try {
        const imagePath = "./input/IMG20230524071742.jpg"; // Ensure this path is correct
        const transformedImageData = await transformImage(imagePath);

        // console.log("transformedImage ==>", transformedImage)

        const outputPath = path.join('uploads', 'transformed_image.png');
        let imageBuffer;

        if (isBase64(transformedImageData)) {
            imageBuffer = Buffer.from(transformedImageData, 'base64');
        } else {
            imageBuffer = Buffer.from(transformedImageData, 'binary');
        }

        fs.writeFileSync(outputPath, imageBuffer);

        res.json({ message: 'Image transformed successfully!', url: outputPath });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred during image transformation.' });
    }
});

// Serve a simple HTML form for uploading images
app.get('/', (req, res) => {
    res.send(`
        <h1>Image Enhancer</h1>
        <form action="/transform" method="post" enctype="multipart/form-data">
            <input type="file" name="image" accept="image/*" required />
            <button type="submit">Transform Image</button>
        </form>
    `);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
