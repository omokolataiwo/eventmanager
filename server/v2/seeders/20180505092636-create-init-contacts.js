module.exports = {
  up: (queryInterface, Sequelize) =>
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
    */
    queryInterface.bulkInsert(
      'contacts',
      [
        {
          firstName: 'Folusho',
          lastName: 'Banwo',
          email: 'fbanwo@gmail.com',
          phoneNumber: '1234567890',
          ownerId: 1,
          createdAt: '12-12-2018',
          updatedAt: '12-12-2018'
        },
        {
          firstName: 'Mike',
          lastName: 'Aiyegbe',
          email: 'maiyegbe@yahoo.com',
          phoneNumber: '7334567890',
          ownerId: 1,
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
    queryInterface.bulkDelete('contacts', null, {})
};
