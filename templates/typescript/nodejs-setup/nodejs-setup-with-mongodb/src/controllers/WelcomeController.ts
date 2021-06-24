import * as Helpers from '../helpers/Helpers'

class WelcomeController {

    home(req: any, res: any){
        Helpers.view(res, 'pages/welcome', 'WelcomeTS', '', [])
    }

}

export default new WelcomeController();