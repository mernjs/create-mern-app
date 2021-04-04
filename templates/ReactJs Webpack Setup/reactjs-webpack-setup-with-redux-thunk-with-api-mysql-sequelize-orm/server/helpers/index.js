require('dotenv').config()
global.express 	= require('express');
global.Route 	= express.Router();
global.chalk    = require('chalk');
global.path     = require('path')
global.fs       = require('fs')
global.Sequelize    = require('sequelize');

function titleCase(str) {
    return str.toLowerCase().split(' ').map(function(chunk){
        return chunk.charAt(0).toUpperCase() + chunk.substring(1);
    }).join(' ');
}

const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toLowerCase() + s.slice(1)
}

//helpers
fs.readdirSync(path.join(__dirname, './')).forEach(dirname => {
    if (dirname.match(/\.js$/) === null) {
        fs.readdirSync(path.join(__dirname, `./${dirname}`)).forEach(function(file) {
            if (file.match(/\.js$/) !== null) {
                var helper_file_name = file.replace('.js', '');
                helper_file_name = helper_file_name.replace(/_/g, ' ');
                helper_file_name = helper_file_name.charAt(0).toUpperCase() + helper_file_name.slice(1)
                helper_file_name = titleCase(helper_file_name)
                helper_file_name = helper_file_name.replace(/ /g, '');
                helper_file_name = capitalize(helper_file_name)
                global[helper_file_name] = require(`./${dirname}/${file}`);
            }
        })
    }
})
