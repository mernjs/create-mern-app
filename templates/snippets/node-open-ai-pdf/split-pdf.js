const fs = require('fs');
const path = require('path');
const { PDFDocument } = require('pdf-lib');

async function createDir(path) {
	if (!fs.existsSync(path)) {
		fs.mkdirSync(path, { recursive: true });
		console.log(`Directory created: ${path}`);
	} else {
		console.log(`Directory already exists: ${path}`);
	}
}

async function removeDir(path) {
	if (fs.existsSync(path)) {
		fs.rmdirSync(path, { recursive: true });
		console.log(`Directory removed: ${path}`);
	} else {
		console.log(`Directory does not exist: ${path}`);
	}
}

async function splitPDF(pdfPath, chunkSize = 5) {
	const outputDir = 'pdfs';
	await removeDir(outputDir);
	await createDir(outputDir); 

	const pdfBytes = fs.readFileSync(pdfPath); 
	const pdfDoc = await PDFDocument.load(pdfBytes);
	const totalPages = pdfDoc.getPageCount(); 

	const baseName = path.basename(pdfPath, path.extname(pdfPath));

	let chunkIndex = 0;
	for (let i = 0; i < totalPages; i += chunkSize) {
		const newPdfDoc = await PDFDocument.create();
		const end = Math.min(i + chunkSize, totalPages);
		for (let j = i; j < end; j++) {
			const [copiedPage] = await newPdfDoc.copyPages(pdfDoc, [j]);
			newPdfDoc.addPage(copiedPage);
		}
		const newPdfBytes = await newPdfDoc.save();
		fs.writeFileSync(`${outputDir}/${baseName}-${chunkIndex + 1}.pdf`, newPdfBytes);
		chunkIndex++;
	}
	console.log(`PDF split into ${chunkIndex} chunks of ${chunkSize} pages each.`);
}

const inputPDF = './ExampleContractA13330013MB.pdf';

splitPDF(inputPDF)
	.then(() => {
		console.log('PDF splitting completed.');
	})
	.catch((err) => {
		console.error('Error splitting PDF:', err);
	});
