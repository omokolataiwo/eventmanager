const userId = 3;

module.exports = {
  up: (queryInterface, Sequelize) =>
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
    */
    queryInterface.bulkInsert(
      'events',
      [
        {
          title: 'Wedding Party',
          startDate: '12-02-2018',
          endDate: '12-02-2018',
          centerId: 1,
          userId: 1,
          active: 1,
          createdAt: '12-12-2018',
          updatedAt: '12-12-2018'
        },
        {
          title: 'Wedding Anniversary',
          startDate: '12-03-2018',
          endDate: '12-03-2018',
          centerId: 6,
          userId,
          active: 1,
          createdAt: '12-12-2018',
          updatedAt: '12-12-2018'
        },
        {
          title: 'House warming',
          startDate: '12-04-2018',
          endDate: '12-05-2018',
          centerId: 5,
          userId,
          active: 1,
          createdAt: '12-12-2018',
          updatedAt: '12-12-2018'
        },
        {
          title: 'Birthday Party',
          startDate: '12-06-2018',
          endDate: '12-06-2018',
          centerId: 1,
          userId,
          active: 1,
          createdAt: '12-12-2018',
          updatedAt: '12-12-2018'
        },
        {
          title: 'Comendy Show',
          startDate: '12-07-2018',
          endDate: '12-07-2018',
          centerId: 4,
          userId,
          active: 1,
          createdAt: '12-12-2018',
          updatedAt: '12-12-2018'
        },
        {
          title: 'Music Concert',
          startDate: '12-08-2018',
          endDate: '12-08-2018',
          centerId: 3,
          userId,
          active: 1,
          createdAt: '12-12-2018',
          updatedAt: '12-12-2018'
        },
        {
          title: 'Graduation Party',
          startDate: '12-09-2018',
          endDate: '12-09-2018',
          centerId: 2,
          userId,
          active: 1,
          createdAt: '12-12-2018',
          updatedAt: '12-12-2018'
        },
        {
          title: 'Naming Ceremony',
          startDate: '12-10-2018',
          endDate: '12-10-2018',
          centerId: 1,
          userId,
          active: 1,
          createdAt: '12-12-2018',
          updatedAt: '12-12-2018'
        }
      ],
      {}
    ),

  down: (queryInterface, Sequelize) =>
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
    */
    queryInterface.bulkDelete('events', null, {})
};
