const connection = require('./DB_mysql_config')
const knexPaginator = require('knex-paginator')

const Knex = require('knex')(connection);
knexPaginator(Knex);

module.exports = Knex;