import * as Helpers 	from '../helpers/Helpers'
import express  	from 'express'
const Route    	= express.Router();

import WelcomeController from '../controllers/WelcomeController'

Route.route('/')
	.get(WelcomeController.home)
	.all(Helpers.send405);

export default Route