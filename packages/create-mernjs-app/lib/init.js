const path          = require('path')
const chalk         = require("chalk")
const fs            = require("fs-extra");
const { spawn }     = require("child_process");
const Constants     = require('./utils/Constants')
const Helpers       = require('./utils/Helpers')
const ApiRequest    = require('./utils/ApiRequest')

module.exports = async (projectname, {project_type, email}) => {
    const currentWorkingDir = process.cwd()
    console.log(' ')
    console.log(chalk.hex('#4c84ff')(`Creating a new ${chalk.yellow(projectname)} project in`), chalk.green(`${currentWorkingDir}/${projectname}`))
    console.log(' ')
    let project_typ = project_type.replace(/ /g,'-').toLowerCase()
    project_key = `${Helpers.generateRadomeString(32)}_${project_typ}`
    
    const destinationPath = `${currentWorkingDir}/${projectname}`
    const sourcePath = path.join(__dirname, `../node_modules/mernjs/templates/${project_typ}/`)
    const gitSourcePath = path.join(__dirname, `utils/gitignore.js`)

    const appID = Helpers.generateRadomeString(32)

    ApiRequest.init({project_name: projectname, project_path: currentWorkingDir, project_type: project_typ, email, app_id: appID})

    if(project_typ === 'react-native-cli'){
        let command = `npx react-native init ${projectname} --version 0.66.0`
        const child = spawn(command, { stdio: "inherit", shell: true });
        child.on("close", code => {
            if(code !== 0) return Helpers.errormessage({message: `${command}`});
            console.log(" ");
            console.log(chalk.cyan(`Installing mernjs dependencies... This might take a couple of minutes.`))
            fs.unlinkSync(`${destinationPath}/App.js`)
            fs.unlinkSync(`${destinationPath}/index.js`)
            fs.unlinkSync(`${destinationPath}/package.json`)
            fs.copy(sourcePath, destinationPath, error => {
                if (error) return Helpers.errormessage(error)
                // Helpers.copyGitignoreFile(gitSourcePath, destinationPath)
                process.chdir(destinationPath)
                Helpers.rewritePackageName(`${destinationPath}/package.json`, projectname, appID, email)

                let command = 'npm install'
                const child = spawn(command, { stdio: "inherit", shell: true });
                child.on("close", code2 => {
                    if(code2 !== 0) return  console.log({message: `${command}`});
                    process.chdir(`${destinationPath}/ios`)
                    let command = 'pod install'
                    const child = spawn(command, { stdio: "inherit", shell: true });
                    child.on("close", code3 => {
                        if(code3 !== 0) return  console.log({message: `${command}`});
                        console.log(" ");
                        console.log(" ");
                        let message = `Congratulations! Your ${chalk.yellow(projectname)} project has been Created at`
                        console.log(message, chalk.green(`${currentWorkingDir}/${projectname}`))
                        console.log(" ");
                        console.log(chalk.hex('#008000').bold('  We suggest that you begin by typing:'))
                        console.log(" ");
                        console.log(chalk.hex('#4c84ff')(`    cd ${projectname}`))
                        console.log(`       Go to your project directory`)
                        console.log(" ");
                        console.log(chalk.hex('#4c84ff')(`    npm run ios`))
                        console.log(`       Run instruction for iOS.`)
                        console.log(" ");
                        console.log(chalk.hex('#4c84ff')(`    npm run android`))
                        console.log(`       Run instruction for Android.`)
                        console.log(" ");
                        console.log(" ");
                        console.log("All Done!");
                        process.exit(0);
                    })
                })
            });
            console.log(" ");
        });
        return false
    }
    Helpers.createDirAndCopy(sourcePath, destinationPath)
    .then((success) => {
        Helpers.copyGitignoreFile(gitSourcePath, destinationPath)
        console.log(" ")
        let message = `Congratulations! Your ${chalk.yellow(projectname)} project has been Created at`
        console.log(message, chalk.green(`${currentWorkingDir}/${projectname}`))

        process.chdir(destinationPath)
        Helpers.rewritePackageName(`${destinationPath}/package.json`, projectname, appID, email)

        if(project_typ === 'react-native-expo') Helpers.rewritePackageName(`${destinationPath}/app.json`, projectname, appID, email)

        console.log(" ")
        console.log(chalk.hex('#4c84ff').bold("Installing dependencies... This might take a couple of minutes."));
        console.log(" ")
        let command = 'npm install'
        const child = spawn(command, { stdio: "inherit", shell: true });
        child.on("close", code => {
            if(code !== 0) return  console.log({message: `${command}`});
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