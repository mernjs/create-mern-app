require('dotenv').config();
require("./sentry");
require('./src/database/dbconfig/DBConnection');
const Utilities = require('./src/Utilities');
const bodyParser = require('body-parser');
const Sentry = require("@sentry/node");
const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const path = require('path');
const app = express();

process.env.APP_DEBUG === 'true' && app.use(logger('dev'));
app.use(cors(Utilities.corsOriginOptions));
app.use(Utilities.corsError);
app.use(Utilities.setRateLimit);
app.use(bodyParser.json({ limit: process.env.BODYPARSER_LIMIT, extended: true }));
app.use(bodyParser.urlencoded({ limit: process.env.BODYPARSER_LIMIT, extended: true }));
app.use(express.static(path.join(__dirname, './public')));
app.use(require(`./src/Routes`));
app.use((req, res) => Utilities.apiResponse(res, 404, '404 API Not Found'));
Sentry.setupExpressErrorHandler(app);

const server = app.listen(process.env.PORT, () => {
	console.log(`********** Server is running on  http://localhost:${server.address().port}  **********`);
}).on('error', (error) => {
	console.error('********** Port ' + error.port + ' is already in use **********');
});