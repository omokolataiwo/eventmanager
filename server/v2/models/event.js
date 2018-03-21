module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('events', {
    title: DataTypes.STRING,
    startdate: DataTypes.DATE,
    enddate: DataTypes.DATE,
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
