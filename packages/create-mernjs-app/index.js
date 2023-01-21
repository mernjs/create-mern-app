#!/usr/bin/env node

'use strict';
const chalk = require("chalk");
const yosay = require('yosay')
var currentNodeVersion = process.versions.node;
var semver = currentNodeVersion.split('.');
var major = semver[0];

if (major < 18) {
    const message = `Create MERN App requires Node 18 or higher.`
    console.log('\n')
    console.log(yosay(`${chalk.red(`You are running Node ${currentNodeVersion}.`)} \n ${chalk.green(' ')} \n ${message} \n\n ${chalk.bold.blue('Please update your version of Node.')} \n ${chalk.green(' ')} `, { maxLength: 55 }));
    console.log('\n')
    process.exit(1);
}

const { init } = require('./createMernApp');

init();