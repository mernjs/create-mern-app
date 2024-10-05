const fs = require('fs');
const path = require('path');
const { extractImages } = require('pdf-lib-extract-images');

async function extractImagesFromPDF(pdfPath, outputDir) {
    // Ensure the output directory exists
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }

    // Read the PDF file
    const pdfBuffer = fs.readFileSync(pdfPath);

    // Extract images from the PDF
    const images = await extractImages(pdfBuffer);

    // Save each image to the output directory
    images.forEach((image, index) => {
        const extension = image.format === 'image/jpeg' ? 'jpg' : 'png';
        const imagePath = path.join(outputDir, `image_${index + 1}.${extension}`);
        fs.writeFileSync(imagePath, image.buffer);
        console.log(`Extracted image: ${imagePath}`);
    });
}

// Usage
const pdfPath = './SampleFileWithImage.pdf'; // Path to your PDF file
const outputDir = './extracted_images'; // Directory to save extracted images

extractImagesFromPDF(pdfPath, outputDir)
    .then(() => {
        console.log('Images extracted successfully.');
    })
    .catch(err => {
        console.error('Error extracting images:', err);
    });
