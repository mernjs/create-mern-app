import path  from 'path'
import ENV   from './DB_config'

export default {
    client: ENV.DB_CONNECTION,
    connection: {
        host : ENV.DB_HOST,
        user : ENV.DB_USERNAME,
        password : ENV.DB_PASSWORD,
        database : ENV.DB_DATABASE,
        port : ENV.DB_PORT
    },
    pool: { 
        min: 2, 
        max: 10
    },
    migrations: {
        directory:  path.join(__dirname, '../migrations'),
        tableName: 'migrations',
    },
    debug: ENV.APP_DEBUG,
    seeds: {
        directory:  path.join(__dirname, '../seeders')
    }
}