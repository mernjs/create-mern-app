const fs = require('fs');
const xml2js = require('xml2js');
const path = require('path');
const readline = require('readline');
const { MongoClient } = require('mongodb');

let fileCount = 0;
const OUTPUT_FILE_DIR = `${__dirname}/xmls/`;

async function createOutputFolder() {
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
			console.log('\n\nXML SPLITTING STARTED \n\n');
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

async function databseConnection(connection) {
	const { mongoURI, databaseName, collectionName } = connection;
	return new Promise(async (resolve, reject) => {
		try {
			const client = new MongoClient(mongoURI);
			await client.connect();
			const db = client.db(databaseName);
			const collection = db.collection(collectionName);
			resolve({ client, collection });
		} catch (error) {
			reject(error);
		}
	});
}

async function readFileAndSaveToMongoDB(connection, openingTag) {
	try {
		const { client, collection } = await databseConnection(connection);
		console.log("DB CONNECTED \n\n");
		let insertedCount = 0;
		const files = await fs.promises.readdir(OUTPUT_FILE_DIR);
		for (const file of files) {
			let counter = insertedCount++;
			if (path.extname(file) === '.xml') {
				const filePath = path.join(OUTPUT_FILE_DIR, file);
				console.log(`Before : Memory Usage - ${Math.round(process.memoryUsage().heapUsed / 1024 / 1024 * 100) / 100} MB -  Inserting - ${counter} - File Path - ${filePath}`);
				const data = await fs.promises.readFile(filePath, 'utf8');
				const wrappedCode = `<source>${data.replace("</source>", "")}</source>`;
				const result = await xml2js.parseStringPromise(wrappedCode);
				await collection.insertMany(result.source[openingTag.replace("<", "").replace(">", "")]);
				console.log(`After : Memory Usage - ${Math.round(process.memoryUsage().heapUsed / 1024 / 1024 * 100) / 100} MB -  Inserted - ${counter} - File Path - ${filePath} \n\n`);
			}
		}
		console.log("ALL DATA INSERTED \n\n");
		await client.close();
		console.log("DB CONNECTION CLOSED \n\n");
		if (fs.existsSync(OUTPUT_FILE_DIR)) await fs.promises.rm(OUTPUT_FILE_DIR, { recursive: true });
		console.log("SPLITTED XML REMOVED \n\n");
	} catch (error) {
		console.log(`ERROR: ${error.message}`);
	}
}

module.exports.runImporter = async (params) => {
	return new Promise(async (resolve, reject) => {
		try {
			const { xmlUrl, openingTag, closingTag, connection, chunkSize = 2500 } = params;
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
			if (typeof connection !== 'object' || !connection.mongoURI || !connection.databaseName || !connection.collectionName) {
				throw new Error('Invalid connection: It should be an object with mongoURI, databaseName, and collectionName properties');
			}
			await createOutputFolder();
			await XmlSplitter(xmlUrl, openingTag, closingTag, chunkSize);
			await readFileAndSaveToMongoDB(connection, openingTag);
			resolve(true);
		} catch (error) {
			reject(error.message);
		}
	});
}