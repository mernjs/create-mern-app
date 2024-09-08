const pkg = require('../../package.json');
const path = require('path')

let Constants = {}

Constants.init = {
    command: "init <project_name>",
    alias: "new",
    description: "Create New Project"
}

Constants.help = '--help'

Constants.package = {
    name: pkg.name,
    version: pkg.version,
    description: pkg.description
}

Constants.select_form = [
    {
        type: "list",
        name: "project_type",
        message: "Choose your favourite boilerplate",
        choices: ['MERN Boilerplate', 'NextJS Boilerplate', 'ReactJS Boilerplate', 'Expo Boilerplate', 'GatsbyJS Boilerplate', 'ElectronJS Boilerplate', 'React Native Boilerplate', 'NodeJS MySQL Boilerplate', 'NodeJS MongoDB Boilerplate', 'ReactJS Webpack Boilerplate', 'ReactJS Chrome Extension Boilerplate']
    }
]

Constants.select_library_form = [
    {
        type: "list",
        name: "project_type",
        message: "Choose your favourite boilerplate",
        choices: ['JavaScript Library Boilerplate', 'ReactJS Library Boilerplate', 'NodeJS Library Boilerplate', 'ExpressJS Library Boilerplate', 'NextJS Library Boilerplate', 'React Native Library Boilerplate']
    }
]

Constants.nodejs_db = [
    {
        type: "list",
        name: "database",
        message: "Choose your favourite database",
        choices: ['MongoDB', 'MySQL'],
    }
]

Constants.frontend_library = [
    {
        type: "list",
        name: "library",
        message: "Choose your favourite library",
        choices: ['Redux Thunk', 'Redux Saga'],
    }
]

Constants.type = [
    {
        type: "list",
        name: "type",
        message: "What type do you need",
        choices: ['With API', 'Without API'],
    }
]

Constants.mysql_orm = [
    {
        type: "list",
        name: "orm",
        message: "Choose your favourite ORM",
        choices: ['Sequelize ORM', 'Bookshelf ORM', 'SQL Query'],
    }
]

Constants.confirm = [
    {
        type: 'confirm',
        name: 'confirm',
        message: 'Is this OK ?',
    }
]

const isEmail = async (values) => {
    if (!values) {
        return 'Please enter your email ID.';
    } else if (!values.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
        return 'Please enter your valid email ID.';
    }
    return true;
}

Constants.emailFiled = [
    {
        type: 'input',
        name: 'email',
        message: 'Author email (package.json)',
        validate: isEmail
    }
]

Constants.templatepath = path.join(__dirname, `../node_modules/@mernjs/generate/lib`)

Constants.message = 'Create MERN App'

Constants.errormessage = 'An Unexpected Error Occurred'

Constants.mernjs = {
    serve: 'npm run dev'
}


module.exports = Constants;