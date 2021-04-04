'use strict';
const faker = require('faker')
module.exports = {
  up: (queryInterface, Sequelize) => {
    const users = []
    for (let i = 0; i < 100; i++) {
      users.push({
        firstName: faker.name.findName(),
        lastName: faker.internet.userName(),
        email: faker.internet.email(),
        updatedAt: faker.date.recent(),
        createdAt: faker.date.recent()
      })
    }
    return queryInterface.bulkInsert('Users', users, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};