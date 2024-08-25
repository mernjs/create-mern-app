import fs from 'fs';
import path from 'path';
import { PDFDocument } from 'pdf-lib';

async function extractImagesFromPDF(pdfPath, outputDir) {
    // Ensure the output directory exists
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }

    // Load the PDF document
    const pdfBytes = fs.readFileSync(pdfPath);
    const pdfDoc = await PDFDocument.load(pdfBytes);

    // Loop through each page of the PDF
    const pages = pdfDoc.getPages();
    for (let pageIndex = 0; pageIndex < pages.length; pageIndex++) {
        const page = pages[pageIndex];
        const xObjects = page.node.Resources?.XObject?.entries() || [];
        console.log("page.node", page.node)
        for (const [key, xObject] of xObjects) {
            if (xObject.get('Subtype').name === 'Image') {
                const imageBytes = xObject.get('Data');
                const imageName = `page_${pageIndex + 1}_${key}.png`;
                const imagePath = path.join(outputDir, imageName);
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
