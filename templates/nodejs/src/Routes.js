const Utilities = require('./Utilities')
const express = require('express');
const Route = express.Router();

const WelcomeController = require('./controllers/WelcomeController')
/**
 * APIs V1 Routes
 */
Route.route('/')
	.get(WelcomeController.home)
	.all(Utilities.send405);

Route.route('/api')
	.get((req, res) => Utilities.apiResponse(res, 200, 'Welcome API'))
	.all(Utilities.send405);

Route.route('/api/v1')
	.get((req, res) => Utilities.apiResponse(res, 200, 'APIs V1'))
	.all(Utilities.send405);

Route.route('/api/v1/users')
	.get(WelcomeController.users)
	.post(WelcomeController.users)
	.all(Utilities.send405);

module.exports = Route