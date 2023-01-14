'use strict';
const faker = require('faker');
module.exports = {
    up: (queryInterface, Sequelize) => {
        const users = [];
        for (let i = 0; i < 100; i++) {
            users.push({
                name: faker.name.findName(),
                email: faker.internet.email(),
                password: '123456',
                updatedAt: faker.date.recent(),
                createdAt: faker.date.recent(),
            });
        }
        return queryInterface.bulkInsert('Users', users, {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Users', null, {});
    },
};
