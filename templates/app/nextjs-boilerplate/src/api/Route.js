const Utils = require('./Utils');
const express = require('express');
const Route = express.Router();

const AuthController = require('./controllers/AuthController');
/**
 * APIs V1 Routes
 */
Route.route('/api')
	.get((req, res) => Utils.apiResponse(res, 200, 'Welcome API'))
	.all(Utils.send405);

Route.route('/api/v1')
	.get((req, res) => Utils.apiResponse(res, 200, 'APIs V1'))
	.all(Utils.send405);

Route.route('/api/v1/auth/login')
	.post(AuthController.login)
	.all(Utils.send405);

Route.route('/api/v1/auth/signup')
	.post(AuthController.signup)
	.all(Utils.send405);

Route.route('/api/v1/auth/users')
	.get(Utils.verifyAccessToken, AuthController.users)
	.all(Utils.send405);

Route.route('/api/v1/auth/user')
	.get(Utils.verifyAccessToken, AuthController.getUserByID)
	.all(Utils.send405);

module.exports = Route;
