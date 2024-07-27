const { runImporter } = require("../");

(async () => {
	try {
		await runImporter({
			xmlUrl: `${__dirname}/sample.xml`,
			openingTag: '<food>',
			closingTag: '</food>',
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