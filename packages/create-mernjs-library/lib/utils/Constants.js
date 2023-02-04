const pkg = require('../../package.json');
const path = require('path')

let Constants = {}

Constants.help = '--help'

Constants.package = {
    name: 'create-mern-library',
    version: pkg.version,
    description: pkg.description
}

Constants.select_form = [
    {
        type: "list",
        name: "project_type",
        message: "Choose your favourite library",
        choices: ['JavaScript Library', 'ReactJS Library', 'NodeJS Library', 'NextJS Library', 'GatsbyJS Library', 'ExpressJS Library', 'ElectronJS Library', 'React Native Library']
    }
]

Constants.confirm = [
    {
        type: 'confirm',
        name: 'confirm',
        message: 'Is this OK ?',
    }
]

Constants.message = 'Create MERN Library'

Constants.errormessage = 'An Unexpected Error Occurred'

Constants.mernjs = {
    serve: 'npm run dev'
}


module.exports = Constants;