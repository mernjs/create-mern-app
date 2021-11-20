const chalk         = require("chalk");
const yosay         = require('yosay')
const network       = require('network');
const axios         = require('axios')
const exec          = require('child_process').exec;
const Constants     = require('./Constants')
const Helpers       = require('./Helpers')
const API_URL       = 'https://mernjs-admin.herokuapp.com/api/v1'
const API_KEY       = 'sdkjfvlsadkjfijaaslkdjfaslkdjfysldkjfalskdjf'    
const API_SECRET    = 'sdkjfvlsadkjfijaaslkdjfaslkdjfyaksldjfalskdfjalskdf'

const message = "Please check your internet connection or try again later"

function ajaxRequest(args = {}){
    args.url = `${API_URL}/${args.url}`
    let headers = {apikey: API_KEY, secretkey: API_SECRET}
    return axios({...args, headers: headers });    
}

function initialData(){
    return new Promise((resolve, reject)=>{
        network.get_public_ip( async (err, ip) => {
            if(err) reject(message)
            exec('npm --version', (error, stdout, stderr) => {
                if (error) reject(message)
                let data = {
                    ip_address      : ip && ip,
                    node_version    : process.version ? process.version : '', 
                    npm_version     : stdout,
                    cli_version     : Constants.package.version,
                    desktop_session : process.env.DESKTOP_SESSION ? process.env.DESKTOP_SESSION : '',
                }
                resolve(data)
            })            
        })
    })
}

exports.init = async (args) => {
    return initialData().then(success => {
        return ajaxRequest({
            method: 'POST', 
            data: {...success, ...args}, 
            url: `init`
        })
    }).catch(error => {
        Helpers.errormessage(message)
    })
}

exports.version = async () => {
    return ajaxRequest({
        method: 'GET',
        url: `version`
    }).then(success => {
        if(Constants.package.version < success.data.data.cli_version){
            let message1 = `New ${chalk.yellow('minor')} version of mernjs available ${chalk.red(Constants.package.version)} -> ${chalk.green(success.data.data.cli_version)}`
            let message2 = `${chalk.yellow('Changelog')} ${chalk.cyan('https://mernjs.org/versions')}`
            let message3 = `Run ${chalk.green('npm i -g create-mernjs-app')} to update!`
            console.log(yosay(`${chalk.bold.green(' ** Update available ** ')} \n ${chalk.green(' ')} \n ${message1} \n ${message2} \n ${message3} \n ${chalk.green(' ')} \n `, {maxLength: 55}));
        }
        process.exit(0);
    }).catch(error => {
        console.log('')
        process.exit(0);
    })
    
}