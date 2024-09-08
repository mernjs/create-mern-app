const fs = require('fs');
const xml2js = require('xml2js');
const path = require('path');
const readline = require('readline');

let fileCount = 0;
const OUTPUT_FILE_DIR = `${__dirname}/xmls/`;

async function createXmlsFolder() {
	try {
		if (fs.existsSync(OUTPUT_FILE_DIR)) await fs.promises.rm(OUTPUT_FILE_DIR, { recursive: true });
		await fs.promises.mkdir(OUTPUT_FILE_DIR);
	} catch (error) {
		throw new Error(`Error creating output folder: ${error.message}`);
	}
}

async function saveChunkToFile(data, count) {
	try {
		fileCount++;
		const outputFilePath = `${OUTPUT_FILE_DIR}chunk_${fileCount}.xml`;
		await fs.promises.writeFile(outputFilePath, data);
		console.log(`Chunk Size - ${count} -  Saved ${fileCount} - File Path - ${outputFilePath}`);
	} catch (error) {
		throw new Error(`Error saving chunk ${count}: ${error}`);
	}
}

async function XmlSplitter(xmlUrl, openingTag, closingTag, chunkSize) {
	return new Promise((resolve, reject) => {
		try {
			fileCount = 0;
			let chunkCount = 0;
			let isInsideChunk = false;
			let buffer = [];
			const rl = readline.createInterface({
				input: fs.createReadStream(xmlUrl),
				crlfDelay: Infinity
			});
			rl.on('line', async (line) => {
				if (line.includes(openingTag)) {
					if (!isInsideChunk) isInsideChunk = true;
				}
				if (isInsideChunk) {
					buffer.push(line);
					if (line.includes(closingTag)) {
						isInsideChunk = false;
						chunkCount++;

						if (chunkCount === chunkSize) {
							const chunkData = buffer.join('\n');
							buffer = [];
							await saveChunkToFile(chunkData, chunkCount);
							chunkCount = 0;
						}
					}
				}
			});
			rl.on('close', async () => {
				if (buffer.length > 0) {
					const chunkData = buffer.join('\n');
					await saveChunkToFile(chunkData, chunkCount);
				}
				console.log('\n\nXML SPLITTING COMPLETED \n\n');
				resolve(true);
			});
		} catch (error) {
			reject(error);
		}
	});
}

async function readXmlToJson(openingTag, callback) {
	try {
		const files = await fs.promises.readdir(OUTPUT_FILE_DIR);
		for (const file of files) {
			if (path.extname(file) === '.xml') {
				const filePath = path.join(OUTPUT_FILE_DIR, file);
				const data = await fs.promises.readFile(filePath, 'utf8');
				const wrappedCode = `<source>${data.replace("</source>", "")}</source>`;
				const result = await xml2js.parseStringPromise(wrappedCode);
				const finalData = result.source[openingTag.replace("<", "").replace(">", "")]
				callback(finalData);
			}
		}
		if (fs.existsSync(OUTPUT_FILE_DIR)) await fs.promises.rm(OUTPUT_FILE_DIR, { recursive: true });
	} catch (error) {
		console.log(`ERROR: ${error.message}`);
	}
}

async function validateTags(xmlUrl, openingTag, closingTag) {
	return new Promise((resolve, reject) => {
		const rl = readline.createInterface({
			input: fs.createReadStream(xmlUrl),
			crlfDelay: Infinity
		});

		let openingTagFound = false;
		let closingTagFound = false;
		let lineCount = 0;

		rl.on('line', (line) => {
			lineCount++;
			if (line.includes(openingTag)) {
				openingTagFound = true;
			}
			if (line.includes(closingTag)) {
				closingTagFound = true;
			}
			if (openingTagFound && closingTagFound) {
				rl.close();
			}
		});

		rl.on('close', () => {
			if (!openingTagFound && !closingTagFound) {
				reject(new Error(`Neither opening tag "${openingTag}" nor closing tag "${closingTag}" found in the XML file.`));
			} else if (!openingTagFound) {
				reject(new Error(`Opening tag "${openingTag}" not found in the XML file.`));
			} else if (!closingTagFound) {
				reject(new Error(`Closing tag "${closingTag}" not found in the XML file.`));
			} else {
				resolve(true);
			}
		});
	});
}

module.exports.xmltoJson = async (params) => {
	return new Promise(async (resolve, reject) => {
		try {
			const { xmlUrl, openingTag, closingTag, chunkSize = 2500, callback } = params;
			if (typeof xmlUrl !== 'string' || !xmlUrl.endsWith('.xml')) {
				throw new Error('Invalid xmlUrl: It should be a string ending with .xml');
			}
			if (!fs.existsSync(xmlUrl)) {
				throw new Error('Invalid xmlUrl: File does not exist');
			}
			if (typeof openingTag !== 'string' || !openingTag.startsWith('<') || !openingTag.endsWith('>')) {
				throw new Error('Invalid openingTag: It should be a string enclosed in angle brackets, e.g., "<tag>"');
			}
			if (typeof closingTag !== 'string' || !closingTag.startsWith('</') || !closingTag.endsWith('>')) {
				throw new Error('Invalid closingTag: It should be a string enclosed in angle brackets, e.g., "</tag>"');
			}
			await validateTags(xmlUrl, openingTag, closingTag);
			await createXmlsFolder();
			await XmlSplitter(xmlUrl, openingTag, closingTag, chunkSize);
			await readXmlToJson(openingTag, callback);
			resolve(true);
		} catch (error) {
			reject(error.message);
		}
	});
}