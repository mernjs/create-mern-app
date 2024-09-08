const fs = require("fs-extra");
const { spawn } = require("child_process");
const https = require('https');

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