require("./sentry.js");
require('./src/api/database/dbconfig/DBConnection');
const Utilities = require('./src/api/Utilities');
const bodyParser = require('body-parser');
const Sentry = require("@sentry/node");
const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const path = require('path');

const next = require('next');
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

if (process.env.APP_DEBUG === 'false') {
	console.log = function () { };
	console.error = function () { };
	console.warn = function () { };
}

nextApp
	.prepare()
	.then(() => {
		const app = express();
		const corsOriginOptions = {
			origin: Utilities.allowedOrigin,
			methods: process.env.CORS_METHODS,
			credentials: process.env.CORS_CREDENTIALS === 'true' ? true : false,
			optionsSuccessStatus: process.env.CORS_OPTION_STATUS
		};
		app.use(logger('dev'));
		app.use(cors(corsOriginOptions));
		app.use(Utilities.corsError);
		// app.use(Utilities.setRateLimit);
		app.use(bodyParser.json({ limit: '10mb', extended: true }));
		app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
		app.use(express.static(path.join(__dirname, './public')));
		app.use(require(`./src/api/Routes`));

		app.get('*', (req, res) => {
			return handle(req, res);
		});

		Sentry.setupExpressErrorHandler(app);

		const server = app
			.listen(process.env.PORT || process.env.APP_PORT, () => {
				console.log(`********** Server is running on  http://localhost:${server.address().port}  **********`);
			})
			.on('error', (error) => {
				console.error('********** ' + error.port + ' is already in use **********');
			});
	})
	.catch((ex) => {
		console.error(ex.stack);
		process.exit(1);
	});
