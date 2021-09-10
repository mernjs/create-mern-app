import * as Helpers 		from '../helpers/Helpers'
import express  	from 'express'
const Route    	= express.Router();

import WelcomeController from '../controllers/api/v1/WelcomeController'
/**
 * APIs V1 Routes
 */
Route.route('/api')
	.get((req, res) => Helpers.apiResponse(res, 200, 'Welcome API', []))
	.all(Helpers.send405);

Route.route('/api/v1')
	.get((req, res) => Helpers.apiResponse(res, 200, 'APIs V1', []))
	.all(Helpers.send405);

Route.route('/api/v1/users')
	.get(WelcomeController.users)
	.post(WelcomeController.users)
	.all(Helpers.send405);

export default Route