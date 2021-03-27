const connection = require('./DB_mysql_config')

const Knex 		= require('knex')(connection);
const Bookshelf = require('bookshelf')(Knex); 

module.exports 	= Bookshelf;
