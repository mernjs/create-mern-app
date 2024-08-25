const fs = require('fs');
const { PDFDocument } = require('pdf-lib');

async function extractImagesFromPDF(pdfPath, outputDir) {
    // Read the PDF file
    const existingPdfBytes = fs.readFileSync(pdfPath);

    // Load the PDF document
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    // Ensure the output directory exists
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }

    // Loop through each page of the PDF
    const pages = pdfDoc.getPages();
    for (let i = 0; i < pages.length; i++) {
        const page = pages[i];
        const images = page.node.resources.XObject || {};

        // Loop through each image in the page
        for (const key in images) {
            const image = images[key];

            // Only extract images (not forms, shadings, patterns, etc.)
            if (image.dict.lookup('Subtype').name === 'Image') {
                const imageBytes = image.getBytes();

                // Get image format
                const format = image.dict.lookup('Filter').name;

                // Set the file extension based on the image format
                let extension = '';
                if (format === 'DCTDecode') {
                    extension = 'jpg';
                } else if (format === 'JPXDecode') {
                    extension = 'jp2';
                } else if (format === 'FlateDecode') {
                    extension = 'png';
                }

                // Write the image to a file
                const imagePath = `${outputDir}/page_${i + 1}_${key}.${extension}`;
                fs.writeFileSync(imagePath, imageBytes);

                console.log(`Extracted image: ${imagePath}`);
            }
        }
    }
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
