require('dotenv').config();
require("./sentry.js");
require('./src/database/dbconfig/DBConnection');
const Utilities = require('./src/Utilities');
const bodyParser = require('body-parser');
const Sentry = require("@sentry/node");
const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const path = require('path');
const app = express();
if (process.env.APP_DEBUG === 'false') {
	console.log = function () { };
	console.error = function () { };
	console.warn = function () { };
}
const corsOriginOptions = {
	origin: Utilities.allowedOrigin,
	methods: process.env.CORS_METHODS,
	credentials: process.env.CORS_CREDENTIALS === 'true' ? true : false,
	optionsSuccessStatus: process.env.CORS_OPTION_STATUS
};
app.use(logger('dev'));
app.use(cors(corsOriginOptions));
app.use(Utilities.corsError);
app.use(Utilities.setRateLimit);
app.use(bodyParser.json({ limit: '10mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(express.static(path.join(__dirname, './public')));
app.use(require(`./src/Routes`));
app.use((req, res) => Utilities.apiResponse(res, 404, '404 API Not Found'));
Sentry.setupExpressErrorHandler(app);

const server = app.listen(process.env.APP_PORT, () => {
	console.log(`********** Server is running on  http://localhost:${server.address().port}  **********`);
}).on('error', (error) => {
	console.error('********** Port ' + error.port + ' is already in use **********');
});