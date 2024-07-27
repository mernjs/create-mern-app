const { runImporter } = require("xml-to-mongodb-importer");

(async () => {
	try {
		await runImporter({
			xmlUrl: `${__dirname}/books.xml`,
			openingTag: '<job>',
			closingTag: '</job>',
			connection: {
				mongoURI: 'mongodb://localhost:27017',
				databaseName: 'xml-db',
				collectionName: 'job'
			}
		});
	} catch (error) {
		console.log("ERRRO ==>>", error)
	}
})()