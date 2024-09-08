const { exec, spawn } = require("child_process");
const chalk = require("chalk");
const commander = require("commander");
const { prompt } = require("inquirer");
const fs = require("fs-extra");
const Constants = require('./lib/utils/Constants');
const yosay = require('yosay');
const validateProjectName = require('validate-npm-package-name');
const Helpers = require('./lib/utils/Helpers');
const semver = require('semver');

function checkAppName(appName) {
    const validationResult = validateProjectName(appName);
    if (!validationResult.validForNewPackages) {
        console.log('');
        console.error(
            chalk.red(
                `Cannot create a project named ${chalk.green(
                    `"${appName}"`
                )} because of npm naming restrictions:\n`
            )
        );
        [
            ...(validationResult.errors || []),
            ...(validationResult.warnings || []),
        ].forEach(error => {
            console.error(chalk.red(`  * ${error}`));
        });
        console.error(chalk.red('\nPlease choose a different project name.'));
        console.log('');
        process.exit(1);
    }
}

async function sparseCloneRepo(repoUrl, subdirectory, destinationPath) {
    return new Promise((resolve, reject) => {
        const commands = [
            `git init ${destinationPath}`,                   // Initialize a new git repo at destinationPath
            `cd ${destinationPath}`,                         // Move to the destination directory
            `git remote add origin ${repoUrl}`,              // Add the remote repo URL
            `git config core.sparseCheckout true`,           // Enable sparse checkout
            `echo "${subdirectory}" >> .git/info/sparse-checkout`, // Specify the subdirectory to clone
            `git pull origin master`,                        // Pull from the master branch (or 'main' if necessary)
            `mv ${subdirectory}/* ./`,                       // Move files from the subdirectory to the root
            `rm -rf ${subdirectory}`,                        // Remove the empty subdirectory
            `rm -rf templates`,
            `rm -rf .git`                                    // Optional: Remove .git to avoid including Git history
        ].join(' && ');

        exec(commands, (error, stdout, stderr) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(stdout.trim());
        });
    });
}

async function init() {
    const program = new commander.Command(Constants.package.name)
        .version(Constants.package.version)
        .arguments('<project-directory>')
        .usage(`${chalk.green('<project-directory>')}`)
        .option('-y, --yes', 'skip Is this OK? step')
        .action(async (project_name) => {
            const projectName = project_name;
            checkAppName(project_name);

            Helpers.checkForLatestVersion().then(async (latest) => {
                if (latest && semver.lt(Constants.package.version, latest)) {
                    console.log(chalk.red('Please update to the latest version.'));
                    process.exit(1);
                } else {
                    const currentPath = process.cwd();
                    const destinationPath = `${currentPath}/${project_name}`;
                    if (fs.existsSync(destinationPath)) {
                        console.log(chalk.red("Folder already exists"));
                        return;
                    }

                    // Hardcoded repository URL and subdirectory
                    const repoUrl = 'https://github.com/mernjs/create-mern-app'; // Hardcoded URL
                    const subdirectory = 'templates/app/electronjs-boilerplate'; // Hardcoded subdirectory (e.g., 'packages')


                    // Create a loader with ora
                    console.log(`Creating a new ${chalk.yellow(project_name)} project in ${chalk.green(destinationPath)}`)

                    try {
                        await sparseCloneRepo(repoUrl, subdirectory, destinationPath);
                        let message = `Congratulations! Your ${chalk.yellow(project_name)} project has been Created at`
                        console.log(message, chalk.green(`${destinationPath}`));

                        process.chdir(destinationPath)

                        Helpers.rewritePackageName(`${destinationPath} / package.json`, project_name);
                        console.log(chalk.hex('#4c84ff').bold("Installing dependencies..."));

                        const command = 'npm install';
                        const child = spawn(command, { stdio: "inherit", shell: true });

                        child.on("close", (code) => {
                            if (code !== 0) return;
                            console.log(chalk.hex('#008000').bold('Project setup complete.'));
                            process.exit(0);
                        });
                    } catch (error) {
                        spinner.fail('Error cloning repository');
                        console.error(chalk.red('Error:', error));
                        fs.rmdirSync(destinationPath, { recursive: true, force: true });
                        process.exit(0);
                    }
                }
            }).catch((error) => {
                console.log(error);
                process.exit(1);
            });
        })
        .parse(process.argv);

    if (typeof program.args[0] === 'undefined') {
        console.error('Please specify the project directory.');
        process.exit(1);
    }
}

module.exports = {
    init,
};
