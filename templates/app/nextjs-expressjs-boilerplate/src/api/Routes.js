const Utilities = require('./Utilities');
const express = require('express');
const Route = express.Router();

const AuthController = require('./controllers/AuthController');
const CrudController = require('./controllers/CrudController')

Route.route('/api/v1/login')
	.post(Utilities.decryptRequestBody, AuthController.login)
	.all((req, res) => Utilities.apiResponse(res, 405, `Not Allowed`));

Route.route('/api/v1/signup')
	.post(Utilities.decryptRequestBody, AuthController.signup)
	.all((req, res) => Utilities.apiResponse(res, 405, `Not Allowed`));

Route.route('/api/v1/users/:userId?')
	.post(CrudController.create)
	.get(CrudController.read)
	.put(CrudController.update)
	.delete(CrudController.delete)
	.all((req, res) => Utilities.apiResponse(res, 405, `Not Allowed`));

module.exports = Route;