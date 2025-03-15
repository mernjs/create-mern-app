const pkg = require('../../package.json');
const { execSync } = require("child_process");

const repoOwner = "mernjs";
const repoName = "create-mern-app";
const branch = "master";
const githubApiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/templates?ref=${branch}`;

const sectionMapping = {
    app: { id: "app", type: "list", name: "project_type", message: "Choose your favourite boilerplate" },
    library: { id: "library", type: "list", name: "project_type", message: "Choose your favourite boilerplate" },
    packages: { id: "packages", type: "list", name: "project_type", message: "Choose your favourite boilerplate" },
    snippets: { id: "snippets", type: "list", name: "project_type", message: "Choose your favourite boilerplate" },
};

const capitalizeWords = (str) => str.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

function fetchFromGitHub(url) {
    try {
        const curlCommand = `curl -s -H "User-Agent: node.js" "${url}"`;
        const response = execSync(curlCommand, { encoding: "utf-8" });
        return JSON.parse(response);
    } catch (error) {
        console.error("Error fetching data from GitHub:", error.message);
        return [];
    }
}

function fetchTemplates() {
    const categories = fetchFromGitHub(githubApiUrl);
    const sections = [];

    for (const category of categories) {
        if (category.type !== "dir") continue;

        const sectionInfo = sectionMapping[category.name];
        if (!sectionInfo) continue;

        const templates = fetchFromGitHub(category.url);
        const choices = templates
            .filter((template) => template.type === "dir")
            .map((template) => capitalizeWords(template.name));

        if (choices.length > 0) {
            sections.push({
                type: sectionInfo.type,
                name: sectionInfo.name,
                message: sectionInfo.message,
                choices,
            });
        }
    }

    return sections;
}

const sections = fetchTemplates();

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