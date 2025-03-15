const pkg = require('../../package.json');
const path = require('path')
const fs = require("fs");

const templatesPath = path.join(__dirname, `../../node_modules/mernjs/templates`)

const sectionMapping = {
    app: {
        id: 'app',
        type: "list",
        name: "project_type",
        message: "Choose your favourite boilerplate",
    },
    library: {
        id: 'library',
        type: "list",
        name: "project_type",
        message: "Choose your favourite boilerplate",
    },
    packages: {
        id: 'packages',
        type: "list",
        name: "project_type",
        message: "Choose your favourite boilerplate",
    },
    snippets: {
        id: 'snippets',
        type: "list",
        name: "project_type",
        message: "Choose your favourite boilerplate",
    },
};

const capitalizeWords = (str) => str.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

const sections = [];

fs.readdirSync(templatesPath, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .forEach((category) => {
        const categoryPath = path.join(templatesPath, category.name);
        const sectionInfo = sectionMapping[category.name];

        if (!sectionInfo) return;

        const choices = fs.readdirSync(categoryPath, { withFileTypes: true })
            .filter((dirent) => dirent.isDirectory())
            .map((dirent) => capitalizeWords(dirent.name));

        if (choices.length > 0) {
            sections.push({
                type: sectionInfo.type,
                name: sectionInfo.name,
                message: sectionInfo.message,
                choices: choices,
            });
        }
    });

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

Constants.templates_form = sections

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

Constants.message = 'Create MERN App'

Constants.errormessage = 'An Unexpected Error Occurred'

Constants.mernjs = {
    serve: 'npm run dev'
}


module.exports = Constants;