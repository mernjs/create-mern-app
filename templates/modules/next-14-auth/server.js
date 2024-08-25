require('./src/api/database/dbconfig/DB_mongodb_connection');
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const next = require('next');
const path = require('path');
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

nextApp
	.prepare()
	.then(() => {
		const app = express();

		app.use(cors());
		app.use(bodyParser.json({ limit: '10mb', extended: true }));
		app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
		app.use(express.static(path.join(__dirname, './public')));

		app.use(require(`./src/api/Route`));
		app.disable('x-powered-by');

		app.get('*', (req, res) => {
			return handle(req, res);
		});

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
