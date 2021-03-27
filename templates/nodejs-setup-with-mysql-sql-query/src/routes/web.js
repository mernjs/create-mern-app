const WelcomeController = require('../controllers/WelcomeController')

Route.route('/')
	.get(WelcomeController.home)
	.all(send405);

module.exports = Route