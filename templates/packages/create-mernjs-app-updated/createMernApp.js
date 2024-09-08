const { exec, spawn } = require("child_process"); // Added spawn here
const chalk = require("chalk");
const commander = require("commander");
const { prompt } = require("inquirer")
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
            `echo "${subdirectory}" >> .git/info/sparse-checkout`, // Specify the subdirectory you want to clone
            `git pull origin master`,                        // Pull from the master branch (adjust to main if needed)
            `mv ${subdirectory}/* ./`                       // Move files from the subdirectory to the root
            // `rm -rf ${subdirectory}`,                        // Remove the empty subdirectory
            // `rm -rf .git`                                    // Optional: Remove .git to avoid including Git history
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
        .option('-y, --yes', 'skip Is this OK ? step')
        .option('--template <github-repo-url>', 'specify a GitHub template repository')
        .option('--template-dir <subdirectory>', 'specify a subdirectory in the template repository to use as the template')
        .action(async (project_name, cmd_obj) => {
            projectName = project_name;
            checkAppName(project_name);
            Helpers.checkForLatestVersion().then(async (latest) => {
                if (latest && semver.lt(Constants.package.version, latest)) {
                    const message1 = `You are running \`create-mernjs-app\` ${chalk.bold.red(Constants.package.version)}, which is behind the latest release ${chalk.bold.green(latest)}.`;
                    const message2 = 'We recommend always using the latest version of create-mernjs-app.';
                    const message3 = 'npm install create-mernjs-app -g';
                    const message4 = `https://github.com/mernjs/create-mern-app/releases`;
                    console.log('\n');
                    console.log(yosay(`${chalk.yellow(message1)} \n\n ${chalk.cyan(message2)} \n\n ${chalk.bold.green(message3)} \n\n ${chalk.blue(message4)} `, { maxLength: 55 }));
                    console.log('\n');
                    process.exit(1);
                } else {
                    const currentPath = process.cwd();
                    const destinationPath = `${currentPath}/${project_name}`;
                    if (fs.existsSync(destinationPath)) {
                        console.log('');
                        console.log(chalk.red("Folder already exists"));
                        console.log('');
                        return;
                    }
                    console.log('Press ^C at any time to quit.');
                    prompt(cmd_obj?.template ? Constants.select_library_form : Constants.select_form).then(async (data) => {
                        const repoUrl = cmd_obj?.template || 'https://github.com/mernjs/create-mern-app';
                        const subdirectory = cmd_obj?.templateDir || 'default-template-folder';

                        console.log(chalk.green(`Cloning the template from ${repoUrl}, subdirectory: ${subdirectory}...`));
                        try {
                            await sparseCloneRepo(repoUrl, subdirectory, destinationPath);
                            console.log(chalk.green(`Template cloned successfully to ${destinationPath}`));
                            Helpers.rewritePackageName(`${destinationPath}/package.json`, project_name);
                            console.log(chalk.hex('#4c84ff').bold("Installing dependencies... This might take a couple of minutes."));
                            const command = 'npm install --legacy-peer-deps';
                            const child = spawn(command, { stdio: "inherit", shell: true }); // Updated spawn usage
                            child.on("close", (code) => {
                                if (code !== 0) return;
                                console.log(" ");
                                console.log(chalk.hex('#008000').bold('  We suggest that you begin by typing:'));
                                console.log(" ");
                                console.log(chalk.hex('#4c84ff')(`    cd ${project_name}`));
                                console.log(`       Go to your project directory`);
                                console.log(" ");
                                console.log(chalk.hex('#4c84ff')(`    ${Constants.mernjs.serve}`));
                                console.log(`       Starts the development server.`);
                                console.log(" ");
                                console.log("All Done!");
                                process.exit(0);
                            });
                        } catch (error) {
                            console.error(chalk.red('Error cloning repository:'), error);
                            // fs.rmdirSync(destinationPath, { recursive: true, force: true });
                            process.exit(0);
                        }
                    });
                }
            }).catch((error) => {
                console.log(error);
                process.exit(1);
            });
        })
        .parse(process.argv);

    if (typeof projectName === 'undefined') {
        console.log();
        console.error('Please specify the project directory:');
        console.log();
        console.log(`  ${chalk.cyan(`${program.name()}`)} ${chalk.green('<project-directory>')}`);
        console.log();
        console.log('For example:');
        console.log(`  ${chalk.cyan(`${program.name()}`)} ${chalk.green('my_project')}`);
        console.log();
        console.log(`Run ${chalk.cyan(`${program.name()} --help`)} to see all options.`);
        console.log();
        process.exit(1);
    }
}

module.exports = {
    init,
};
