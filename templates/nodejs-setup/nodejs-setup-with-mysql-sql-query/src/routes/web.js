const Helpers 	= require('../helpers/Helpers')
const express  	= require('express');
const Route    	= express.Router();

const WelcomeController = require('../controllers/WelcomeController')

Route.route('/')
	.get(WelcomeController.home)
	.all(Helpers.send405);

module.exports = Route