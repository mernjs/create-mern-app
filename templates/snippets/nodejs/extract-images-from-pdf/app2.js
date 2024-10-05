const fs = require('fs');
const path = require('path');
const { getDocument } = require('pdfjs-dist');
const { PDFDocument } = require('pdf-lib');

async function extractImagesFromPDF(pdfPath, outputDir) {
    // Ensure the output directory exists
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }

    // Load the PDF document
    const loadingTask = getDocument(pdfPath);
    const pdf = await loadingTask.promise;

    for (let i = 0; i < pdf.numPages; i++) {
        const page = await pdf.getPage(i + 1);
        const operatorList = await page.getOperatorList();
        const pdfDocument = await PDFDocument.create();

        const images = [];
        operatorList.fnArray.forEach((fn, index) => {
            if (fn === pdfjsDist.OPS.paintJpegXObject || fn === pdfjsDist.OPS.paintImageXObject) {
                images.push(operatorList.argsArray[index]);
            }
        });

        for (let j = 0; j < images.length; j++) {
            const image = images[j];
            const { width, height } = image;
            const imageBytes = image.getBytes();
            const imageExtension = image.filter === 'DCTDecode' ? 'jpg' : 'png';
            const imageName = `page_${i + 1}_image_${j + 1}.${imageExtension}`;
            const imagePath = path.join(outputDir, imageName);

            fs.writeFileSync(imagePath, imageBytes);
            console.log(`Extracted image: ${imagePath}`);
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
