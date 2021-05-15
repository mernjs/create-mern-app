const Helpers = require('../helpers/Helpers')

class WelcomeController {

    home(req, res){
        Helpers.view(res, 'pages/welcome', 'WelcomeTS')
    }

}

module.exports = new WelcomeController();