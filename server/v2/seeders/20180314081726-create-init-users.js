const bcrypt = require('bcryptjs');

module.exports = {
  up: queryInterface =>
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
          phoneNumber: '08132108214',
          email: 'omokolataiwo@gmail.cm',
          username: 'admin',
          password: bcrypt.hashSync('123', 8),
          role: 2,
          createdAt: '12-12-2018',
          updatedAt: '12-12-2018'
        },
        {
          firstName: 'Luke',
          lastName: 'John',
          phoneNumber: '08032108214',
          email: 'omokolataiwo@gmail.com',
          username: 'admin2',
          password: bcrypt.hashSync('123', 8),
          role: 2,
          createdAt: '12-12-2018',
          updatedAt: '12-12-2018'
        },
        {
          firstName: 'Lanre',
          lastName: 'Taiwo',
          phoneNumber: '08032108215',
          email: 'omokolataiwo@yahoo.com',
          username: 'user',
          password: bcrypt.hashSync('123', 8),
          role: 3,
          createdAt: '12-12-2018',
          updatedAt: '12-12-2018'
        },
        {
          firstName: 'Super',
          lastName: 'Admin',
          phoneNumber: '07032108215',
          email: 'super@yahoo.com',
          username: 'super',
          password: bcrypt.hashSync('123', 8),
          role: 1,
          createdAt: '12-12-2018',
          updatedAt: '12-12-2018'
        }
      ],
      {}
    ),

  down: queryInterface =>
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
    */
    queryInterface.bulkDelete('users', null, {})
};
