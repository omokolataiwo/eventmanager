module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('centers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false
      },
      area: {
        type: Sequelize.STRING,
        allowNull: false
      },
      state: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      capacity: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      type: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      ownerId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      contactId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      facilities: {
        type: Sequelize.STRING,
        allowNull: false
      },
      amount: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      details: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      image: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      approve: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      active: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }),
  down: queryInterface => queryInterface.dropTable('centers')
};
