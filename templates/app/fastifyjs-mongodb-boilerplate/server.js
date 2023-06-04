require('dotenv').config();
require('./src/database/dbconfig/DB_mongodb_connection');
const fastify = require('fastify')({ logger: true });
const routes = require('./src/Routes');

routes.forEach((route) => {
    fastify.route(route);
});

fastify.listen(process.env.PORT || process.env.APP_PORT, (error, address) => {
    if (error) {
        console.log(
            '********** \x1b[31mPort ' +
            error.port +
            ' is already in use\x1b[0m **********',
        );
        return
    }
    console.log(`********** Server is running on  http://localhost:${address}  **********`);
})