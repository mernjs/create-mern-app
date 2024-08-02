const { xmltoJson } = require("..");

const params = {
	xmlUrl: `${__dirname}/sample1.xml`,
	openingTag: '<PubmedArticle>',
	closingTag: '</PubmedArticle>',
	callback: (data) => {
		console.log('Processed Data:', data);
	}
}

xmltoJson(params)
	.then(() => {
		console.log('XML processing completed successfully!');
	})
	.catch((error) => {
		console.error('Error during XML processing:', error);
	});
