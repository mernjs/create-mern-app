'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const db = {};

const CONFIG = {
    host: process.env.DB_HOST,
    dialect: process.env.DB_CONNECTION,
    port: process.env.DB_PORT,
    operatorsAliases: 0,
    logging: false,
    pool: {
        min: process.env.DB_POOL_MIN,
        max: process.env.DB_POOL_MAX,
    },
};
const sequelize = new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    CONFIG,
);

sequelize
    .authenticate()
    .then(() => {
        console.log('');
        console.log(
            '********** Successfully Connected To The MySQL **********',
        );
        console.log('');
    })
    .catch((err) => {
        console.log('', err);
        console.log(
            '********** \x1b[31mMissing DB Connection\x1b[0m ***********',
        );
        console.log('');
    });

fs.readdirSync(__dirname)
    .filter((file) => {
        return (
            file.indexOf('.') !== 0 &&
            file !== basename &&
            file.slice(-3) === '.js'
        );
    })
    .forEach((file) => {
        const model = require(path.join(__dirname, file))(sequelize, Sequelize);
        db[model.name] = model;
    });

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
