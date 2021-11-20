const 	WelcomeController = require('../controllers/WelcomeController')

Route.route('/')
	.get(WelcomeController.index)
	.all(send405);

Route.route('/projects')
	.get(WelcomeController.projects)
	.all(send405);

Route.route('/project-details')
	.get(WelcomeController.details)
	.all(send405);

module.exports = Route