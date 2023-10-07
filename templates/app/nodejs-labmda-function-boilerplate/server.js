require('dotenv').config();
require('./src/database/dbconfig/DB_mongodb_connection');
const serverless = require("serverless-http");
const Utilities = require('./src/Utilities');
const bodyParser = require('body-parser');
const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: '10mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './src/views'));
app.use(express.static(path.join(__dirname, './public')));

app.use(require(`./src/App`));

app.use(logger('dev'));
app.use(Utilities.send404);
app.disable('x-powered-by');

module.exports.handler = serverless(app);