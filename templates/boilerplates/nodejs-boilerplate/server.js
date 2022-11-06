require('dotenv').config()
require('./src/database/dbconfig/DB_mongodb_connection');
const http = require('http')
const Router = require('router')
const finalhandler = require('finalhandler')
const Utilities = require('./src/Utilities')
const bodyParser   = require('body-parser')
const url = require('url');
const router = Router()

let app = http.createServer((req, res) => {
	req.query = url.parse(req.url, true).query
  	router(req, res, finalhandler(req, res))
})
  
let Routes = Router()
router.use('/', Routes)
Routes.use(bodyParser.json())

const AuthController = require('./src/controllers/AuthController')

Routes.route('/')
	.get((req, res) => Utilities.apiResponse(res, 200, 'Create MERN App', {By: "Vijay Pratap Singh"}))
	.all(Utilities.send405);

Routes.route('/api')
	.get((req, res) => Utilities.apiResponse(res, 200, 'Welcome API'))
	.all(Utilities.send405);

Routes.route('/api/v1')
	.get((req, res) => Utilities.apiResponse(res, 200, 'APIs V1'))
	.all(Utilities.send405);

Routes.route('/api/v1/auth/login')
	.post(AuthController.login)
	.all(Utilities.send405);

Routes.route('/api/v1/auth/signup')
	.post(AuthController.signup)
	.all(Utilities.send405);

Routes.route('/api/v1/auth/users')
	.get(Utilities.verifyAccessToken, AuthController.users)
	.all(Utilities.send405);

Routes.route('/api/v1/auth/user')
	.get(Utilities.verifyAccessToken, AuthController.getUserByID)
	.all(Utilities.send405);
	
let server = app.listen(process.env.PORT || process.env.APP_PORT, () => {
    console.log(`********** Server is running on  http://localhost:${server.address().port}  **********`)
}).on('error', (error) => {
    console.log('********** \x1b[31mPort '+error.port+' is already in use\x1b[0m **********')
})