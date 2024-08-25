const fs = require('fs');
const path = require('path');
const { PDFDocument } = require('pdf-lib');

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
        const xObjects = page.node.Resources?.XObject?.entries() || [];
        console.log("imageBytes", xObjects)
        for (const [key, xObject] of xObjects) {
            if (xObject.get('Subtype').name === 'Image') {
                let imageBytes;
                let extension;
                console.log("imageBytes", imageBytes)
                if (xObject.get('Filter').name === 'DCTDecode') {
                    imageBytes = xObject.get('Data');
                    extension = 'jpg';
                } else if (xObject.get('Filter').name === 'FlateDecode') {
                    imageBytes = xObject.get('Data');
                    extension = 'png';
                } else if (xObject.get('Filter').name === 'JPXDecode') {
                    imageBytes = xObject.get('Data');
                    extension = 'jp2';
                }
console.log("imageBytes", imageBytes)
                if (imageBytes) {
                    const imagePath = path.join(outputDir, `page_${i + 1}_${key}.${extension}`);
                    fs.writeFileSync(imagePath, imageBytes);
                    console.log(`Extracted image: ${imagePath}`);
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
