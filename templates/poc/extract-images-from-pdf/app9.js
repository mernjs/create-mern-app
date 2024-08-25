import fs from 'fs';
import path from 'path';
import { PDFDocument, PDFName, PDFDict } from 'pdf-lib';
import { createCanvas, Image } from 'canvas';

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
        const resources = page.node.get(PDFName.of('Resources'));

        if (resources instanceof PDFDict) {
            const xObject = resources.get(PDFName.of('XObject'));

            if (xObject instanceof PDFDict) {
                const entries = xObject.entries();

                for (const [key, value] of entries) {
                    console.log("VALUE ==>>>", value)
                    console.log("SUB TYPE ==>>", PDFName.of('Subtype'))
                    const xObject = value?.lookupMaybe(PDFName.of('Subtype'));

                    if (xObject && xObject.name === 'Image') {
                        const img = value.lookup(PDFName.of('Data'));
                        const imgData = img.asBytes();

                        const { width, height, bitsPerComponent, colorSpace } = value;
                        const canvas = createCanvas(width, height);
                        const ctx = canvas.getContext('2d');

                        const image = new Image();
                        image.onload = () => {
                            ctx.drawImage(image, 0, 0, width, height);
                            const imagePath = path.join(outputDir, `page_${pageIndex + 1}_${key}.png`);
                            const out = fs.createWriteStream(imagePath);
                            const stream = canvas.createPNGStream();
                            stream.pipe(out);
                            out.on('finish', () => console.log(`Extracted image: ${imagePath}`));
                        };

                        const base64Data = Buffer.from(imgData).toString('base64');
                        image.src = `data:image/png;base64,${base64Data}`;
                    }
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
