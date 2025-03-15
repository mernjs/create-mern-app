const fs = require("fs-extra");
const https = require('https');
const { exec, spawn } = require("child_process");

function errorMessaage(error) {
    console.log(" ");
    process.exit(0);
}

exports.errormessage = errorMessaage

exports.createDirAndCopy = (sourcePath, destinationPath) => {
    return new Promise((resolve, reject) => {
        if (fs.existsSync(`${destinationPath}`)) return reject("Folder already exists");
        fs.mkdirs(`${destinationPath}`, err => {
            if (err) return reject(err);
            fs.copy(sourcePath, destinationPath, err => {
                if (err) return reject(err);
                resolve('success');
            });
        })
    })
}

exports.rewritePackageName = (file, name) => {
    fs.readFile(file, 'utf8', function (err, data) {
        if (err) errorMessaage(err)
        let result = data.replace(/project_name/g, `${name}`);
        fs.writeFile(file, result, 'utf8', function (err) {
            if (err) errorMessaage(err)
        })
    })
}

exports.generateRadomeString = (len, charSet) => {
    charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var randomString = '';
    for (var i = 0; i < len; i++) {
        var randomPoz = Math.floor(Math.random() * charSet.length);
        randomString += charSet.substring(randomPoz, randomPoz + 1);
    }
    return randomString;
}

function gitInit() {
    let command = 'git init'
    const child = spawn(command, { stdio: "inherit", shell: true });
    child.on("close", code => {
        if (code !== 0) return
    })
}

exports.gitInit = gitInit

exports.copyGitignoreFile = (sourcePath, destinationPath) => {
    return new Promise((resolve, reject) => {
        if (fs.existsSync(`${destinationPath}/.gitignore`)) return console.log("");
        fs.copyFile(sourcePath, `${destinationPath}/.gitignore`, error => {
            if (error) return;
            let command = 'git init'
            const child = spawn(command, { stdio: "inherit", shell: true });
            child.on("close", code => {
                if (code !== 0) return
            })
        })
    })
}

exports.checkForLatestVersion = () => {
    return new Promise((resolve, reject) => {
        https
            .get(
                'https://registry.npmjs.org/-/package/create-mernjs-app/dist-tags',
                res => {
                    if (res.statusCode === 200) {
                        let body = '';
                        res.on('data', data => (body += data));
                        res.on('end', () => {
                            resolve(JSON.parse(body).latest);
                        });
                    } else {
                        reject();
                    }
                }
            )
            .on('error', () => {
                reject();
            });
    });
}

exports.sparseCloneRepo = (subdirectory, destinationPath) => {
    const repoUrl = 'https://github.com/mernjs/create-mern-app'; // Hardcoded repo URL

    return new Promise((resolve, reject) => {
        const commands = [
            `mkdir -p ${destinationPath}`,                   // Ensure the destination directory exists
            `git init ${destinationPath}`,                   // Initialize a new git repo at destinationPath
            `cd ${destinationPath}`,                         // Move to the destination directory
            `git remote add origin ${repoUrl}`,              // Add the remote repo URL
            `git config core.sparseCheckout true`,           // Enable sparse checkout
            `echo "${subdirectory}/" >> .git/info/sparse-checkout`, // Include the subdirectory
            `echo "${subdirectory}/.*" >> .git/info/sparse-checkout`, // Include all dotfiles in the subdirectory
            `git pull origin master`,                        // Pull from the master branch (or 'main' if necessary)
            `shopt -s dotglob && mv ${subdirectory}/* ./`,   // Move all files (including hidden files)
            `rm -rf ${subdirectory} .git`,                   // Clean up
            `rm -rf templates`
        ].join(' && ');

        exec(commands, (error, stdout, stderr) => {
            if (error) {
                reject(`Error: ${stderr || error.message}`);
                return;
            }
            resolve(stdout.trim());
        });
    });
};