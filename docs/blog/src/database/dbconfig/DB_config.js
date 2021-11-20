require('dotenv').config()

let ENV = {}
ENV.MONGO_URI=process.env.MONGO_URI
ENV.DB_MIGRATION = process.env.DB_MIGRATION = 'migration';
ENV.APP_DEBUG = process.env.APP_DEBUG === "true" ? true : false,
module.exports = ENV
