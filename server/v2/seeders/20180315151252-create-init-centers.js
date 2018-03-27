const bcrypt = require('bcryptjs');
const details = require('./../seedSupport/centerDetails');
let facilities = require('../seedSupport/facilities');
const address = require('../seedSupport/address');
// const type = require('../seedSupport/types');
facilities = facilities.join(',');

module.exports = {
  up: (queryInterface, Sequelize) =>
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
    */
    queryInterface.bulkInsert(
      'centers',
      [
        {
          name: 'Classique Events Place Pearl Hall',
          address: address[0].address,
          area: address[0].area,
          state: 25,
          capacity: 4000,
          type: 1,
          ownerid: 1,
          contactid: 1,
          facilities,
          amount: 70000,
          details: details[0],
          createdAt: '12-12-2018',
          updatedAt: '12-12-2018',
        },
        {
          name: 'Platinum Hall',
          address: address[1].address,
          area: address[1].area,
          state: 25,
          capacity: 2000,
          type: 2,
          ownerid: 2,
          contactid: 2,
          details: details[1],
          facilities,
          amount: 70000,
          createdAt: '12-12-2018',
          updatedAt: '12-12-2018',
        },
        {
          name: 'FM EVENT Centre',
          address: address[2].address,
          area: address[2].area,
          state: 25,
          capacity: 3000,
          type: 1,
          ownerid: 1,
          contactid: 1,
          facilities,
          details: details[2],
          amount: 65000,
          createdAt: '12-12-2018',
          updatedAt: '12-12-2018',
        },

        {
          name: 'Tobol Event Centre',
          address: address[3].address,
          area: address[3].area,
          state: 25,
          capacity: 3000,
          type: 2,
          ownerid: 2,
          contactid: 2,
          details: details[3],
          facilities:
            'Chairs, Lighting, Parking Space, Sound System, Stage, Tables, Projector, White Board',
          amount: 65000,
          createdAt: '12-12-2018',
          updatedAt: '12-12-2018',
        },

        {
          name: 'Sheba Centre',
          address: address[4].address,
          area: address[4].area,
          state: 25,
          capacity: 3000,
          type: 1,
          ownerid: 1,
          contactid: 1,
          details: details[4],
          facilities,
          amount: 65000,
          createdAt: '12-12-2018',
          updatedAt: '12-12-2018',
        },
        {
          name: 'Knightbridge Hotels Big Hall',
          address: address[5].address,
          area: address[5].area,
          state: 25,
          capacity: 3000,
          type: 2,
          ownerid: 2,
          contactid: 2,
          details: details[5],
          facilities,
          amount: 65000,
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
    queryInterface.bulkDelete('centers', null, {}),
};
