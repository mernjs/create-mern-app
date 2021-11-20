const MernCliController  =	require('../controllers/api/v1/MernCliController')

/**
 * APIs V1 Routes
 */
Route.route('/api')
	.get((req, res) => apiResponse(res, 200, 'Welcome To MernJs API'))
	.all(send405);

Route.route('/api/v1')
	.get((req, res) => apiResponse(res, 200, 'Welcome To MernJs API V1'))
	.all(send405);

Route.route('/api/v1/init')
	.post(MernCliController.init)
	.all(send405);

Route.route('/api/v1/version')
	.get(MernCliController.version)
	.all(send405);

Route.route('/api/v1/broadcast/:token')
	.get(MernCliController.sendMail)
	.all(send405);

module.exports = Route