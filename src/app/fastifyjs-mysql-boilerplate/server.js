require('dotenv').config();
global.Sequelize = require('sequelize');
const fastify = require('fastify')({ logger: true });
const routes = require('./src/Routes');

routes.forEach((route) => {
    fastify.route(route);
});

fastify.listen(process.env.PORT || process.env.APP_PORT, (error, address) => {
    if (error) {
        console.log(
            '********** \x1b[31mPort ' +
            error +
            ' is already in use\x1b[0m **********',
        );
        return
    }
    console.log(`********** Server is running on  ${address}  **********`);
})