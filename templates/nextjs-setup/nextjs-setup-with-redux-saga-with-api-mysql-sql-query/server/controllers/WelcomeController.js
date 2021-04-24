const Helpers = require('../helpers/Helpers')

class WelcomeController {

    users(req, res){
        try {
            Helpers.apiResponse(res, 200, 'User Listing Successfully', [])
        } catch (error) {
            Helpers.apiResponse(res, 500, error)
        }
    }

}

module.exports = new WelcomeController();