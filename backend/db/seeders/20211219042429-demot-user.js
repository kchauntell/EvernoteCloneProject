'use strict';
const faker = require('faker');
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {

    let users = [
      {
        firstName: 'Demo',
        lastName: 'User',
        username: 'DemoUs',
        email: 'demo@user.io',
        hashedPassword: bcrypt.hashSync('p@sswordDemo1', 10)
      },
      {
        firstName: 'Kendra',
        lastName: 'Miller',
        username: 'KendraChauntell',
        email: 'kcmiller@miller.com',
        hashedPassword: bcrypt.hashSync('p@sswordKCM1', 10)
      },
    ];

    const numOfUsers = 100;

    for (let i=2; i <= numOfUsers; i++) {
      let newUser = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        hashedPassword: bcrypt.hashSync(`password{i}`, 10),
      };
      users.push(newUser)
    }
    return queryInterface.bulkInsert('Users', users, {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;

    return queryInterface.bulkDelete('Users',
      {
        username: { [Op.in]: ['DemoUs', 'KendraChauntell', users] },
      },
      {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  }
};
