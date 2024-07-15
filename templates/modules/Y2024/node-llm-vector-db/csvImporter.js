import fs from 'fs'
import { MongoClient } from 'mongodb'
import csvParser from 'csv-parser'
const mongoURI = '';
const dbName = 'db';
const collectionName = 'faq';

async function insertDataFromCSV() {
	const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
	try {
		await client.connect();
		const db = client.db(dbName);
		const collection = db.collection(collectionName);
		const data = [];
		fs.createReadStream('./data.csv')
			.pipe(csvParser())
			.on('data', (row) => {
				data.push(row);
			})
			.on('end', async () => {
				if (data.length > 0) {
					await collection.insertMany(data);
					console.log('Data inserted successfully!');
				} else {
					console.log('No data found in the CSV file.');
				}
				await client.close();
			});
	} catch (error) {
		await client.close();
	}
}

insertDataFromCSV();