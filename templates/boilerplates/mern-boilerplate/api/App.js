const Utilities = require('./Utilities');
const express = require('express');
const Route = express.Router();

const AuthController = require('./controllers/AuthController');
/**
 * APIs V1 Routes
 */
Route.route('/api')
  .get((req, res) => Utilities.apiResponse(res, 200, 'Welcome API'))
  .all(Utilities.send405);

Route.route('/api/v1')
  .get((req, res) => Utilities.apiResponse(res, 200, 'APIs V1'))
  .all(Utilities.send405);

Route.route('/api/v1/auth/login')
  .post(AuthController.login)
  .all(Utilities.send405);

Route.route('/api/v1/auth/signup')
  .post(AuthController.signup)
  .all(Utilities.send405);

Route.route('/api/v1/auth/users')
  .get(Utilities.verifyAccessToken, AuthController.users)
  .all(Utilities.send405);

Route.route('/api/v1/auth/user')
  .get(Utilities.verifyAccessToken, AuthController.getUserByID)
  .all(Utilities.send405);

module.exports = Route;
