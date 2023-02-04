const path = require('path')
const chalk = require("chalk")
const fs = require("fs-extra");
const { spawn } = require("child_process");
const Constants = require('./utils/Constants')
const Helpers = require('./utils/Helpers')

module.exports = async (projectname, { project_type }) => {
    const currentWorkingDir = process.cwd()
    console.log(' ')
    console.log(chalk.hex('#4c84ff')(`Creating a new ${chalk.yellow(projectname)} library in`), chalk.green(`${currentWorkingDir}/${projectname}`))
    console.log(' ')
    let project_typ = project_type.replace(/ /g, '-').toLowerCase()

    const destinationPath = `${currentWorkingDir}/${projectname}`
    const sourcePath = path.join(__dirname, `../../../node_modules/create-mernjs-app/node_modules/mernjs/templates/${project_typ}/`)
    const gitSourcePath = path.join(__dirname, `utils/gitignore.js`)

    const appID = Helpers.generateRadomeString(32)

    Helpers.createDirAndCopy(sourcePath, destinationPath)
        .then((success) => {
            Helpers.copyGitignoreFile(gitSourcePath, destinationPath)
            console.log(" ")
            let message = `Congratulations! Your ${chalk.yellow(projectname)} project has been Created at`
            console.log(message, chalk.green(`${currentWorkingDir}/${projectname}`))

            process.chdir(destinationPath)
            Helpers.rewritePackageName(`${destinationPath}/package.json`, projectname, appID)

            if (project_typ === 'react-native-library') Helpers.rewritePackageName(`${destinationPath}/app.json`, projectname, appID)

            console.log(" ")
            console.log(chalk.hex('#4c84ff').bold("Installing dependencies... This might take a couple of minutes."));
            console.log(" ")
            let command = 'npm install --legacy-peer-deps'
            const child = spawn(command, { stdio: "inherit", shell: true });
            child.on("close", code => {
                if (code !== 0) return console.log({ message: `${command}` });
                console.log(" ");
                console.log(chalk.hex('#008000').bold('  We suggest that you begin by typing:'))
                console.log(" ");
                console.log(chalk.hex('#4c84ff')(`    cd ${projectname}`))
                console.log(`       Go to your project directory`)
                console.log(" ");
                console.log(chalk.hex('#4c84ff')(`    ${Constants.mernjs.serve}`))
                console.log(`       Starts the development server.`)
                console.log(" ");
                console.log(" ");
                console.log("All Done!");
                console.log(" ");
                console.log(" ");
                process.exit(0);
            })
        }).catch(error => {
            console.log(destinationPath)
            console.log(error)
            fs.rmdirSync(destinationPath, { recursive: true, force: true })
            console.log(chalk.red.bold('Unexpected error occurred.'));
            process.exit(0);
        });
}