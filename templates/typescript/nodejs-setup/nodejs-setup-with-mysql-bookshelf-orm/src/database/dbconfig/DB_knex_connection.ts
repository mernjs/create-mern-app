import connection from './DB_mysql_config'
import knexPaginator from 'knex-paginator'

const Knex = require('knex')(connection);
knexPaginator(Knex);

export default Knex;