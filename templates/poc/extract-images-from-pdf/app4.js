const fs = require('fs');
const path = require('path');
const { PDFDocument } = require('pdf-lib');
const { createCanvas, loadImage } = require('canvas');

async function extractImagesFromPDF(pdfPath, outputDir) {
    // Ensure the output directory exists
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }

    // Load the PDF document
    const existingPdfBytes = fs.readFileSync(pdfPath);
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    // Loop through each page of the PDF
    const pages = pdfDoc.getPages();
    for (let i = 0; i < pages.length; i++) {
        const page = pages[i];
        const images = page.node.Resources?.XObject?.entries();

        if (images) {
            for (const [key, xObject] of images) {
                if (xObject.get('Subtype').name === 'Image') {
                    const image = await pdfDoc.embedPng(xObject.get('Data'));
                    const { width, height } = image.scale(1);
                    const canvas = createCanvas(width, height);
                    const ctx = canvas.getContext('2d');
                    const img = await loadImage(image.toBuffer());

                    ctx.drawImage(img, 0, 0, width, height);

                    const imagePath = path.join(outputDir, `page_${i + 1}_${key}.png`);
                    const out = fs.createWriteStream(imagePath);
                    const stream = canvas.createPNGStream();
                    stream.pipe(out);
                    out.on('finish', () => console.log(`Extracted image: ${imagePath}`));
                }
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
