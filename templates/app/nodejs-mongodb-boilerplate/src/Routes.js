const Utilities = require('./Utilities');
const express = require('express');
const Route = express.Router();

const AuthController = require('./controllers/AuthController');
const CrudController = require('./controllers/CrudController')

Route.route('/').get((req, res) => Utilities.apiResponse(res, 200, 'Server Running'))

Route.route('/api/v1/login')
	.post(Utilities.decryptRequestBody, AuthController.login)
	.all((req, res) => Utilities.apiResponse(res, 405, `Not Allowed`));

Route.route('/api/v1/signup')
	.post(Utilities.decryptRequestBody, AuthController.signup)
	.all((req, res) => Utilities.apiResponse(res, 405, `Not Allowed`));

Route.route('/api/v1/users')
	.post(CrudController.createUser)
	.get(CrudController.getUsers)
	.put(CrudController.updateUser)
	.delete(CrudController.deleteUser)
	.all((req, res) => Utilities.apiResponse(res, 405, `Not Allowed`));

Route.route('/api/v1/user/:userId')
	.get(CrudController.getUser)

Route.route('/api/v1/validate-token')
	.get(Utilities.verifyAccessToken, AuthController.validateToken)

module.exports = Route;