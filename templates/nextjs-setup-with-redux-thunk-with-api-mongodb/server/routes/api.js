const WelcomeController = require('../controllers/WelcomeController')
/**
 * APIs V1 Routes
 */
Route.route('/api')
	.get((req, res) => apiResponse(res, 200, 'Welcome API'))
	.all(send405);

Route.route('/api/v1')
	.get((req, res) => apiResponse(res, 200, 'APIs V1'))
	.all(send405);

Route.route('/api/v1/users')
	.get(WelcomeController.users)
	.post(WelcomeController.users)
	.all(send405);

module.exports = Route