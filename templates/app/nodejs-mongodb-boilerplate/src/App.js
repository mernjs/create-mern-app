const Utilities = require('./Utilities');
const express = require('express');
const Route = express.Router();

const AuthController = require('./controllers/AuthController');
const CrudController = require('./controllers/CrudController')
/**
 * APIs V1 Routes
 */
Route.route('/')
    .get((req, res) =>
        Utilities.apiResponse(res, 200, 'Create MERN App', {
            By: 'Vijay Pratap Singh',
        }),
    )
    .all(Utilities.send405);

Route.route('/api')
    .get((req, res) => Utilities.apiResponse(res, 200, 'Welcome API'))
    .all(Utilities.send405);

Route.route('/api/v1')
    .get((req, res) => Utilities.apiResponse(res, 200, 'APIs V1'))
    .all(Utilities.send405);

Route.route('/api/v1/login')
    .post(AuthController.login)
    .all(Utilities.send405);

Route.route('/api/v1/signup')
    .post(AuthController.signup)
    .all(Utilities.send405);

Route.route('/api/v1/users')
    .post(CrudController.create)
    .get(CrudController.read)
    .put(CrudController.update)
    .delete(CrudController.delete)
    .all(Utilities.send405);

module.exports = Route;
