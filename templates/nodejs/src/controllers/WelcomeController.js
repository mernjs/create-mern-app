const Utilities = require('../Utilities')

class WelcomeController {

    home(req, res){
        try {
            Utilities.apiResponse(res, 200, 'Welcome NodeJs')
        } catch (error) {
            Utilities.apiResponse(res, 500, error)
        }
    }

    users(req, res){
        try {
            Utilities.apiResponse(res, 200, 'User Listing Successfully', [])
        } catch (error) {
            Utilities.apiResponse(res, 500, error)
        }
    }

}

module.exports = new WelcomeController();