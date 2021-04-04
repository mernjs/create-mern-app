const { User }              = require('../../../models');

class WelcomeController {

    constructor () {

    }

    users(req, res){
        try {
            apiResponse(res, 200, 'User Listing Successfully', [])
        } catch (error) {
            apiResponse(res, 500, error)
        }
    }

}

module.exports = new WelcomeController();