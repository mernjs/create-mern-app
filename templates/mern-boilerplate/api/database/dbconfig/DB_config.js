require('dotenv').config();

const ENV = {};
ENV.MONGO_URI = process.env.MONGO_URI;
module.exports = ENV;
