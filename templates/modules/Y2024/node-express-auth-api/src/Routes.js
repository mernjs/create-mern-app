const Utilities = require('./Utilities');
const express = require('express');
const Route = express.Router();

const AuthController = require('./controllers/AuthController');
const CrudController = require('./controllers/CrudController')
const UserController = require('./controllers/UserController')
const GalleryController = require('./controllers/GalleryController')
// const DynamoDBCrudController = require('./controllers/DynamoDBCrudController')
/**
 * APIs V1 Routes
 */
Route.route('/')
	.get((req, res) =>
		Utilities.apiResponse(res, 200, 'Create MERN App', {
			By: 'Vijay Pratap Singh',
			postmanCollection: 'https://documenter.getpostman.com/view/9986684/UzJFuJBi'
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

Route.route('/api/v1/get-profile-details')
	.get(Utilities.verifyAccessToken, AuthController.getProfileProfile)
	.all(Utilities.send405);

Route.route('/api/v1/update-profile')
	.put(Utilities.verifyAccessToken, AuthController.updateProfile)
	.all(Utilities.send405);

Route.route('/api/v1/users/:userId?')
	.post(CrudController.create)
	.get(CrudController.read)
	.put(CrudController.update)
	.delete(CrudController.delete)
	.all(Utilities.send405);

Route.route('/api/v1/user/add')
	.post(UserController.addUser)
	.all(Utilities.send405);

Route.route('/api/v1/user/edit/:userId')
	.put(UserController.updateUser)
	.all(Utilities.send405);

Route.route('/api/v1/user/delete/:userId')
	.delete(UserController.deleteUser)
	.all(Utilities.send405);

Route.route('/api/v1/user/get/:userId')
	.get(UserController.getUser)
	.all(Utilities.send405);

Route.route('/api/v1/user/get-all')
	.get(UserController.getAllUsers)
	.all(Utilities.send405);

Route.route('/api/v1/image/gallery/:imageId?')
	.get(GalleryController.getImages)
	.post(GalleryController.addImage)
	.delete(GalleryController.deleteImage)
	.all(Utilities.send405);

// Route.route('/api/v1/dynamodb/curd/:userId?')
// 	.post(DynamoDBCrudController.create)
// 	.get(DynamoDBCrudController.read)
// 	.put(DynamoDBCrudController.update)
// 	.delete(DynamoDBCrudController.delete)
// 	.all(Utilities.send405);

module.exports = Route;
