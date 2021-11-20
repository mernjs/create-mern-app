const InitCommand	= require('../models/InitCommand')
const iplocation    = require("iplocation").default;

class WelcomeController {

    async index(req, res){
        view(res, 'pages/welcome', 'Welcome', 'Welcome', [])
    }

    async projects(req, res){
        const data = await InitCommand.find().sort({_id: 'desc'}).exec()
        view(res, 'pages/projects', 'Projects', 'Get All Projects Successfully', data)
    }

    async details(req, res){
    	let data = await InitCommand.findOne({_id: req.query.project_id})
        const location  = await iplocation(data.ip_address)
        data.location = JSON.stringify(location)
        view(res, 'pages/project-details', 'Project Details', 'Get Project Details Successfully', data)
    }

}

module.exports = new WelcomeController();