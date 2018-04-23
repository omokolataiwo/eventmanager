module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('events', {
    title: DataTypes.STRING,
    startDate: DataTypes.DATEONLY,
    endDate: DataTypes.DATEONLY,
    centerId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    active: DataTypes.INTEGER
  });

  Event.associate = (models) => {
    Event.belongsTo(models.users, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });

    Event.belongsTo(models.centers, {
      foreignKey: 'centerId',
      onDelete: 'CASCADE'
    });
  };

  return Event;
};
