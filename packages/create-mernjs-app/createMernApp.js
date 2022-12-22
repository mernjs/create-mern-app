require('shelljs/global');
const commander = require("commander");
const { prompt } = require("inquirer")
const chalk = require("chalk");
const fs = require("fs-extra");
const Constants = require('./lib/utils/Constants')
const yosay = require('yosay')
const validateProjectName = require('validate-npm-package-name');

function checkAppName(appName) {
  const validationResult = validateProjectName(appName);
  if (!validationResult.validForNewPackages) {
    console.log('')
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
    console.log('')
    process.exit(1);
  }
}

function init() {
  const program = new commander.Command(Constants.package.name)
    .version(Constants.package.version)
    .arguments('<project-directory>')
    .usage(`${chalk.green('<project-directory>')}`)
    .option('-y, --yes', 'skip Is this OK ? step')
    .action((project_name, cmd_obj) => {
      projectName = project_name
      checkAppName(project_name)
      const currentPath = process.cwd()
      if (fs.existsSync(`${currentPath}/${project_name}`)) {
        console.log('')
        console.log(chalk.red("Folder already exists"));
        console.log('')
        return;
      }

      console.log('Press ^C at any time to quit.')
      prompt(Constants.select_form)
        .then(async data => {
          let project_type = `${data.project_type}`
          if (cmd_obj.yes) {
            require('./lib/init')(project_name, { project_type })
            return;
          } else {
            prompt(Constants.confirm)
              .then(confirm => {
                if (confirm.confirm === true) {
                  require('./lib/init')(project_name, { project_type })
                } else {
                  console.log('Aborted.')
                  process.exit(0);
                }
              }).catch(error => {
                console.log(error)
                process.exit(0);
              })
          }

        }).catch(error => {
          console.log(error)
          process.exit(0);
        })
    })
    .on(Constants.help, () => {
      let message = `   Create MERN App provide boilerplates with authentication for building Web App, Mobile App, Desktop App & Chrome Extension in JavaScript. ${chalk.cyan('https://mernjs.github.io/create-mern-app')}`;
      console.log(yosay(`${chalk.bold.green(' ** Welcom To Create MERN App ** ')} \n ${chalk.green(' ')} \n ${message} \n\n ${chalk.bold.blue(' By: Vijay Pratap Singh ')} \n ${chalk.green(' ')} `, { maxLength: 55 }));
    })
    .parse(process.argv);


  if (typeof projectName === 'undefined') {
    console.log()
    console.error('Please specify the project directory:');
    console.log()
    console.log(
      `  ${chalk.cyan(`${program.name()}`)} ${chalk.green('<project-directory>')}`
    );
    console.log();
    console.log('For example:');
    console.log(
      `  ${chalk.cyan(`${program.name()}`)} ${chalk.green('my_project')}`
    );
    console.log();
    console.log(
      `Run ${chalk.cyan(`${program.name()} --help`)} to see all options.`
    );
    console.log()
    process.exit(1);
  }

}

module.exports = {
  init,
};