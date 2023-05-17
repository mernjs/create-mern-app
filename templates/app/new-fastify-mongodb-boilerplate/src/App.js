const AuthController = require('./controllers/AuthController');
const CrudController = require('./controllers/CrudController')

/**
 * APIs V1 Routes
 */
const routes = [
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