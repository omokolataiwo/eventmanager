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
      queryInterface.bulkInsert('centers', [{
        name: 'The Zone Centre',
        address: 'Gbagada, Kosofe, Lagos',
        state: 25,
        capacity: 4000,
        type: 2,
        ownerid: 1,
        contactid: 1,
        facilities: 'Chairs, Internet, Lighting, Parking Space, Sound System, Stage, Tables, Air-conditioning, Projector, White Board, Boardroom style',
        amount: 70000,
        createdAt: '12-12-2018',
        updatedAt: '12-12-2018'
      }, {
        name: 'Stadplus Event Centre',
        address: 'MKO Abiola Gardens, Opposite NNPC Gas Plant, Alausa',
        state: 25,
        capacity: 2000,
        type: 1,
        ownerid: 1,
        contactid: 1,
        facilities: 'Chairs, Dance Floor, Lighting, Parking Space, Sound System, Stage, Tables, Air-conditioning, Changing Room, Banquet Style',
        amount: 70000,
        createdAt: '12-12-2018',
        updatedAt: '12-12-2018'
      }, {
        name: "PRINCE'S HALL",
        address: '9/11, Kudirat Abiola Way, Oregun Bus-stop',
        state: 25,
        capacity: 3000,
        type: 1,
        ownerid: 1,
        contactid: 1,
        facilities: 'Chairs, Lighting, Parking Space, Sound System, Stage, Tables, Projector, White Board',
        amount: 65000,
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
      queryInterface.bulkDelete('centers', null, {})
    );
  }
};