module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('events', {
    title: DataTypes.STRING,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    centerid: DataTypes.INTEGER,
    userid: DataTypes.INTEGER,
  });

  Event.associate = (models) => {
    Event.belongsTo(models.users, {
      foreignKey: 'userid',
      onDelete: 'CASCADE',
    });

    Event.belongsTo(models.centers, {
      foreignKey: 'centerid',
      onDelete: 'CASCADE',
    });
  };

  return Event;
};
