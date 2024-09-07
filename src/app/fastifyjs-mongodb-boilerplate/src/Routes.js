const Utilities = require('./Utilities');
const AuthController = require('./controllers/AuthController');
const CrudController = require('./controllers/CrudController')

/**
 * APIs V1 Routes
 */
const routes = [
    {
        method: 'GET',
        url: '/',
        // preHandler: Utilities.verifyAccessToken,
        handler: (req, res) => Utilities.apiResponse(res, 200, 'Create MERN App', {
            By: 'Vijay Pratap Singh',
            postmanCollection: 'https://documenter.getpostman.com/view/9986684/UzJFuJBi'
        }),
    },
    {
        method: 'GET',
        url: '/api',
        handler: (req, res) => Utilities.apiResponse(res, 200, 'Welcome API')
    },
    {
        method: 'GET',
        url: '/api/v1',
        handler: (req, res) => Utilities.apiResponse(res, 200, 'APIs V1')
    },
    {
        method: 'POST',
        url: '/api/v1/login',
        handler: AuthController.login
    },
    {
        method: 'POST',
        url: '/api/v1/signup',
        handler: AuthController.signup
    },
    {
        method: 'GET',
        url: '/api/v1/users',
        // preHandler: Utilities.verifyAccessToken,
        handler: CrudController.read
    },
    {
        method: 'POST',
        url: '/api/v1/users',
        handler: CrudController.create
    },
    {
        method: 'PUT',
        url: '/api/v1/users',
        handler: CrudController.update
    },
    {
        method: 'DELETE',
        url: '/api/v1/users',
        handler: CrudController.delete
    },
];

module.exports = routes;