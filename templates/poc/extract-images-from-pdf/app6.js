const fs = require('fs');
const path = require('path');
const { getDocument } = require('pdfjs-dist');
const { createCanvas, Image } = require('canvas');

async function extractImagesFromPDF(pdfPath, outputDir) {
    // Ensure the output directory exists
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }

    const loadingTask = getDocument(pdfPath);
    const pdf = await loadingTask.promise;

    for (let pageIndex = 0; pageIndex < pdf.numPages; pageIndex++) {
        const page = await pdf.getPage(pageIndex + 1);
        const operatorList = await page.getOperatorList();
        const svgGfx = new pdfjsLib.SVGGraphics(page.commonObjs, page.objs);
        
        for (let i = 0; i < operatorList.fnArray.length; i++) {
            if (operatorList.fnArray[i] === pdfjsLib.OPS.paintImageXObject) {
                const args = operatorList.argsArray[i];
                const objId = args[0];
                const imgData = page.objs.get(objId);
                
                if (imgData) {
                    const { width, height, data, kind } = imgData;
                    const canvas = createCanvas(width, height);
                    const ctx = canvas.getContext('2d');
                    const img = new Image();
                    img.onload = () => {
                        ctx.drawImage(img, 0, 0, width, height);
                        const imagePath = path.join(outputDir, `page_${pageIndex + 1}_image_${i + 1}.png`);
                        const out = fs.createWriteStream(imagePath);
                        const stream = canvas.createPNGStream();
                        stream.pipe(out);
                        out.on('finish', () => console.log(`Extracted image: ${imagePath}`));
                    };
                    img.src = data;
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
