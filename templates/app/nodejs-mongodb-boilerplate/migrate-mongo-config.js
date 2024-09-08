const ENV = require('./src/database/dbconfig/DBConfig');
const config = {
	mongodb: {
		url: process.env.MONGO_URI,
		options: {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			//   connectTimeoutMS: 3600000,
			//   socketTimeoutMS: 3600000,
		},
	},
	migrationsDir: 'src/database/migrations',
	changelogCollectionName: 'changelog',
};
module.exports = config;
