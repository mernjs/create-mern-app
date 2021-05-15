const ENV = require('./server/database/dbconfig/DB_config')
const config = {
    mongodb: {
        url: ENV.MONGO_URI,
        options: {
            useNewUrlParser: true, 
            useUnifiedTopology: true, 
            //   connectTimeoutMS: 3600000, 
            //   socketTimeoutMS: 3600000,
        }
    },
    migrationsDir: "server/database/migrations",
    changelogCollectionName: "changelog"
}
module.exports = config;