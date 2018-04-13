const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) =>
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
    */
    queryInterface.bulkInsert(
      'users',
      [
        {
          firstName: 'Kolawole',
          lastName: 'Taiwo',
          address: '11 Oguntade street',
          state: 26,
          phoneNumber: '08132108214',
          email: 'omokolataiwo@gmail.cm',
          username: 'admin',
          password: bcrypt.hashSync('123', 8),
          role: 2,
          createdAt: '12-12-2018',
          updatedAt: '12-12-2018',
        },
        {
          firstName: 'Luke',
          lastName: 'John',
          address: '11 Oguntade street',
          state: 26,
          phoneNumber: '08032108214',
          email: 'omokolataiwo@gmail.com',
          username: 'admin2',
          password: bcrypt.hashSync('123', 8),
          role: 2,
          createdAt: '12-12-2018',
          updatedAt: '12-12-2018',
        },
        {
          firstName: 'Lanre',
          lastName: 'Taiwo',
          address: '11 Oguntade street',
          state: 26,
          phoneNumber: '08032108215',
          email: 'omokolataiwo@yahoo.com',
          username: 'user',
          password: bcrypt.hashSync('123', 8),
          role: 3,
          createdAt: '12-12-2018',
          updatedAt: '12-12-2018',
        },
      ],
      {},
    ),

  down: (queryInterface, Sequelize) =>
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
    */
    queryInterface.bulkDelete('users', null, {}),
};
