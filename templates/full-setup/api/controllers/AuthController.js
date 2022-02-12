const Utilities = require('../../Utilities')

class AuthController {

    login(req, res){
        try {
            let user = {
                name: 'John Due',
                email: 'johndue@gmail.com'
            }
            Utilities.apiResponse(res, 200, 'User Loggedin Successfully!', user)
        } catch (error) {
            Utilities.apiResponse(res, 500, error)
        }
    }

    signup(req, res){
        try {
            Utilities.apiResponse(res, 200, 'User Signup Successfully!')
        } catch (error) {
            Utilities.apiResponse(res, 500, error)
        }
    }

    users(req, res){
        try {
            Utilities.apiResponse(res, 200, 'Get Users Successfully', [])
        } catch (error) {
            Utilities.apiResponse(res, 500, error)
        }
    }

}

module.exports = new AuthController();