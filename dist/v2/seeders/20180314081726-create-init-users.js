'use strict';

var bcrypt = require('bcryptjs');

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return (
      /*
        Add altering commands here.
        Return a promise to correctly handle asynchronicity.
         Example:
      */
      queryInterface.bulkInsert('users', [{
        firstname: 'Kolawole',
        lastname: 'Taiwo',
        address: '11 Oguntade street',
        state: 26,
        phonenumber: '08032108214',
        email: 'omokolataiwo@gmail.com',
        username: 'admin',
        password: bcrypt.hashSync('123', 8),
        role: 2,
        createdAt: '12-12-2018',
        updatedAt: '12-12-2018'
      }], {})
    );
  },

  down: function down(queryInterface, Sequelize) {
    return (
      /*
        Add reverting commands here.
        Return a promise to correctly handle asynchronicity.
         Example:
      */
      queryInterface.bulkDelete('users', null, {})
    );
  }
};