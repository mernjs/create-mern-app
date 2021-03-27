class WelcomeController {

    constructor () {

    }

    home(req, res){
        view(res, 'pages/welcome', 'Welcome')
    }

}

module.exports = new WelcomeController();