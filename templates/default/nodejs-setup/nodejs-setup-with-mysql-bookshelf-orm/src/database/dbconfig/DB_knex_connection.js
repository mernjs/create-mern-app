const connection = require('./DB_mysql_config')

const Knex = require('knex')(connection);

module.exports = Knex;