const InitCommand   = require('../../../models/InitCommand')
const _             = require('lodash')
const pckJson   = require('../../../../package.json')

const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}

class MernCliController {

    init(req, res){
        try{
            new InitCommand({...req.body, created_at: new Date()}).save()
            .then(async data => {
                sendMail({
                    email_ids: req.body.email,
                    subject: `Successfully created ${data.project_name} app`,
                    html: `<div style="width: 50%; margin-left: auto; margin-right: auto;">
                    <p>Hi ${capitalize(req.body.email.split('@')[0])}</p>
                    <p>Successfully created to the following details.</p>   
                    <table style="font-family: arial, sans-serif; border-collapse: collapse; width: 100%; margin-left: auto; margin-right: auto;">
                      <tr>
                        <th colspan="2" style="border: 1px solid #dddddd; text-align: center; padding: 8px;">Project Details</th>
                      </tr>
                      <tr>
                        <td style="width: 30%; font-weight: bold; border: 1px solid #dddddd; text-align: left; padding: 8px;">App Name</td>
                        <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${data.project_name}</td>
                      </tr>
                      <tr>
                        <td style="width: 30%; font-weight: bold; border: 1px solid #dddddd; text-align: left; padding: 8px;">App Type</td>
                        <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${data.project_type.split('-')[0]}</td>
                      </tr>
                      <tr>
                        <td style="width: 30%; font-weight: bold; border: 1px solid #dddddd; text-align: left; padding: 8px;">Template Type</td>
                        <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${data.template_type}</td>
                      </tr>
                      <tr>
                        <td style="width: 30%; font-weight: bold; border: 1px solid #dddddd; text-align: left; padding: 8px;">Node Version</td>
                        <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${data.node_version}</td>
                      </tr>
                      <tr>
                        <td style="width: 30%; font-weight: bold; border: 1px solid #dddddd; text-align: left; padding: 8px;">NPM Version</td>
                        <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${data.npm_version}</td>
                      </tr>
                      <tr>
                        <td style="width: 30%; font-weight: bold; border: 1px solid #dddddd; text-align: left; padding: 8px;">MernJs Version</td>
                        <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${data.cli_version}</td>
                      </tr>
                      <tr>
                        <td style="width: 30%; font-weight: bold; border: 1px solid #dddddd; text-align: left; padding: 8px;">Date</td>
                        <td style="border: 1px solid #dddddd; text-align: left; padding: 8px;">${data.created_at}</td>
                      </tr>
                    </table>

                    <div>
                        <h4>Support</h4>
                        <p>
                            If you have any issues or bugs, report in our <a target="_blank" href="https://github.com/mernjs/create-mernjs-app/issues">Github.</a>
                        </p>
                        <p>Please email us, If you have any query or security concerns. you can reply to this message or <a target="_blank" href="mailto:>mernjscommunity@gmail.com">mernjscommunity@gmail.com</a>.</p>
                    </div>

                    <div>
                        <h4>Community</h4>
                        <p>
                            Follow us on 
                            <a target="_blank" href="https://twitter.com/mernjs">Twitter</a>, 
                            <a target="_blank" href="https://www.linkedin.com/in/mernjs-community-269551191/">LinkedIn</a> and 
                            <a target="_blank" href="https://www.youtube.com/channel/UCAcmuHoa3sEN_KuwFYk6xMw/playlists">Youtube</a>
                            for updates, news, and information on the MERN.JS stack.
                        </p>
                        <p>Join us on the <a target="_blank" href="https://gitter.im/mernjs/mernjs-community">Gitter Group</a> to discuss features, questions, and suggestions.</p>
                    </div>

                    <div>
                        <h4>Links</h4>
                        <p>
                            <a class="nav-link" href="https://mernjs.org/"><b>Website</b></a> || 
                            <a class="nav-link" href="https://mernjs.org/installation"><b>Documentation</b></a> || 
                            <a class="nav-link" href="https://mernjs.org/versions"><b>Changelog</b></a> || 
                            <a class="nav-link" href="https://www.youtube.com/channel/UCAcmuHoa3sEN_KuwFYk6xMw/playlists"><b>Youtube</b></a> || 
                            <a class="nav-link" href="https://mernjs.org/community"><b>Community</b></a> || 
                            <a class="nav-link" href="https://mernjs-code-snippets.herokuapp.com"><b>Code Snippets</b></a>
                        </p>
                    </div>
                    <div style="margin-top: 50px; margin-bottom: 50px;">
                    <p>Regards</p>
                    <p>MernJs Community</p>
                    </div>
                    </div>`,
                }).then(success => {
                    console.log('success', success)
                }).catch(error => {
                    console.log('catch', error.message)
                })
                return apiResponse(res, 200, `Successfully created ${data.project_name} app`, [])
            }).catch(error => {
                return apiResponse(res, 500, error.message)
            })
        } catch (error) {
            return apiResponse(res, 500, error.message)
        }
    }

    version(req, res){
        try {
            return apiResponse(res, 200, 'Get Current CLI Version Successfully.', {cli_version: pckJson.version})
        } catch (error) {
            return apiResponse(res, 500, error.message)
        }
    }


    async sendMail(req, res){
        try {

            if(!req.params.token){
                return apiResponse(res, 401, 'Please provide token.')
            }else if(req.params.token !== '6C6MZ2AlMZQul8pbT98i'){
                return apiResponse(res, 401, 'Your provided token invalid.')
            }

            let date = new Date()

            let version = pckJson.version

            const data = await InitCommand.find()

            let email_arr = []
            const promises = [];

            data.map( async (item, index) => {
                if(item.email !== null && item.email !== undefined){
                    email_arr.push({
                        id: item._id,
                        email: item.email,
                        os_username: item.os_username
                    })
                }
            })

            email_arr = _.uniqBy(email_arr, 'email');

            email_arr.map( async (item, index) => {
                let mailResponse = await sendMail({
                    email_ids: item.email,
                    subject: `New Update Available of create-mernjs-app@${version}`,
                    html: `<div style="width: 50%; margin-left: auto; margin-right: auto;">
                    <p>Hi ${capitalize(item.email.split('@')[0])}</p>
                    <p>A new version of the package create-mernjs-app (${version}) was published at ${date}.</p>   
                    
                    <div style="margin-top: 50px;">
                        <p>Please email us, If you have any query or security concerns. you can reply to this message or <a target="_blank" href="mailto:>mernjscommunity@gmail.com">mernjscommunity@gmail.com</a>.</p>
                        <p>If you have any issues or bugs, report in our <a target="_blank" href="https://github.com/mernjs/create-mernjs-app/issues">Github.</a></p>
                    </div>

                    <div style="margin-top: 50px;">
                        <p>Join us on the <a target="_blank" href="https://gitter.im/mernjs/mernjs-community">Gitter Group</a> to discuss features, questions, and suggestions.</p>
                    </div>
                    
                    <div style="margin-top: 50px;">
                        <p>
                            <a class="nav-link" href="https://mernjs.org/"><b>Website</b></a> || 
                            <a class="nav-link" href="https://mernjs.org/installation"><b>Documentation</b></a> || 
                            <a class="nav-link" href="https://mernjs.org/versions"><b>Changelog</b></a> || 
                            <a class="nav-link" href="https://www.youtube.com/channel/UCAcmuHoa3sEN_KuwFYk6xMw/playlists"><b>Youtube</b></a> || 
                            <a class="nav-link" href="https://mernjs.org/community"><b>Community</b></a> || 
                            <a class="nav-link" href="https://mernjs-code-snippets.herokuapp.com"><b>Code Snippets</b></a>
                        </p>
                    </div>
                    
                    <div style="margin-top: 50px; margin-bottom: 50px;">
                    <p>Regards</p>
                    <p>MernJs Community</p>
                    </div>
                    </div>`,
                })
                promises.push(mailResponse);
            })

            Promise.all(promises)
            .then(values => {
                return apiResponse(res, 200, `${email_arr.length} Mail Has Been Sent Successfully`, values)
            }).catch(error => {
                return apiResponse(res, 500, 'Somthing went wrong', error.message)
            });
            
        } catch (error) {
            return apiResponse(res, 500, error.message)
        }
    }

}

module.exports = new MernCliController();
