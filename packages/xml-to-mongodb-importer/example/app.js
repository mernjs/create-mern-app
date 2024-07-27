const { runImporter } = require("xml-to-mongodb-importer");

(async () => {
	try {
		await runImporter({
			xmlUrl: `${__dirname}/sample.xml`,
			openingTag: '<food>',
			closingTag: '</food>',
			connection: {
				mongoURI: 'mongodb://localhost:27017',
				databaseName: 'xml-db',
				collectionName: 'foods'
			}
		});
	} catch (error) {
		console.log("ERRRO ==>>", error)
	}
})()