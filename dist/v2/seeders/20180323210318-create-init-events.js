'use strict';

var userid = 3;

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return (
      /*
        Add altering commands here.
        Return a promise to correctly handle asynchronicity.
         Example:
      */
      queryInterface.bulkInsert('events', [{
        title: 'Wedding Party',
        startdate: '12-02-2018',
        enddate: '12-02-2018',
        centerid: 1,
        userid: 1,
        createdAt: '12-12-2018',
        updatedAt: '12-12-2018'
      }, {
        title: 'Wedding Anniversary',
        startdate: '12-03-2018',
        enddate: '12-03-2018',
        centerid: 6,
        userid: userid,
        createdAt: '12-12-2018',
        updatedAt: '12-12-2018'
      }, {
        title: 'House warming',
        startdate: '12-04-2018',
        enddate: '12-05-2018',
        centerid: 5,
        userid: userid,
        createdAt: '12-12-2018',
        updatedAt: '12-12-2018'
      }, {
        title: 'Birthday Party',
        startdate: '12-06-2018',
        enddate: '12-06-2018',
        centerid: 1,
        userid: userid,
        createdAt: '12-12-2018',
        updatedAt: '12-12-2018'
      }, {
        title: 'Comendy Show',
        startdate: '12-07-2018',
        enddate: '12-07-2018',
        centerid: 4,
        userid: userid,
        createdAt: '12-12-2018',
        updatedAt: '12-12-2018'
      }, {
        title: 'Music Concert',
        startdate: '12-08-2018',
        enddate: '12-08-2018',
        centerid: 3,
        userid: userid,
        createdAt: '12-12-2018',
        updatedAt: '12-12-2018'
      }, {
        title: 'Graduation Party',
        startdate: '12-09-2018',
        enddate: '12-09-2018',
        centerid: 2,
        userid: userid,
        createdAt: '12-12-2018',
        updatedAt: '12-12-2018'
      }, {
        title: 'Naming Ceremony',
        startdate: '12-10-2018',
        enddate: '12-10-2018',
        centerid: 1,
        userid: userid,
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
      queryInterface.bulkDelete('events', null, {})
    );
  }
};