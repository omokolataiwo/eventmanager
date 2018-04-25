const details = require('../seedSupport/centerDetails');
let facilities = require('../seedSupport/facilities');
const address = require('../seedSupport/address');
const images = require('../seedSupport/images');

facilities = facilities.join(',');

module.exports = {
  up: queryInterface =>
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
          ownerId: 1,
          contactId: 1,
          facilities,
          amount: 70000,
          image: images[0],
          details: details[0],
          approve: 1,
          active: 1,
          createdAt: '12-12-2018',
          updatedAt: '12-12-2018'
        },
        {
          name: 'Platinum Hall',
          address: address[1].address,
          area: address[1].area,
          state: 25,
          capacity: 2000,
          type: 2,
          ownerId: 2,
          contactId: 2,
          details: details[1],
          facilities,
          amount: 70000,
          image: images[1],
          approve: 1,
          active: 1,
          createdAt: '12-12-2018',
          updatedAt: '12-12-2018'
        },
        {
          name: 'FM EVENT Centre',
          address: address[2].address,
          area: address[2].area,
          state: 25,
          capacity: 3000,
          type: 1,
          ownerId: 1,
          contactId: 1,
          facilities,
          details: details[2],
          amount: 65000,
          image: images[2],
          approve: 1,
          active: 1,
          createdAt: '12-12-2018',
          updatedAt: '12-12-2018'
        },
        {
          name: 'Tobol Event Centre',
          address: address[3].address,
          area: address[3].area,
          state: 25,
          capacity: 3000,
          type: 2,
          ownerId: 2,
          contactId: 2,
          details: details[3],
          facilities:
            'Chairs, Lighting, Parking Space, Sound System, Stage, Tables, Projector, White Board',
          amount: 65000,
          image: images[3],
          approve: 1,
          active: 1,
          createdAt: '12-12-2018',
          updatedAt: '12-12-2018'
        },
        {
          name: 'Sheba Centre',
          address: address[4].address,
          area: address[4].area,
          state: 25,
          capacity: 3000,
          type: 1,
          ownerId: 1,
          contactId: 1,
          details: details[4],
          facilities,
          amount: 65000,
          image: images[4],
          approve: 1,
          active: 1,
          createdAt: '12-12-2018',
          updatedAt: '12-12-2018'
        },
        {
          name: 'Knightbridge Hotels Big Hall',
          address: address[5].address,
          area: address[5].area,
          state: 25,
          capacity: 3000,
          type: 2,
          ownerId: 2,
          contactId: 2,
          details: details[5],
          facilities,
          amount: 65000,
          image: images[5],
          approve: 1,
          active: 1,
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
    queryInterface.bulkDelete('centers', null, {})
};
