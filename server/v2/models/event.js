'use strict';

module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('events', {
    name: DataTypes.STRING,
    startdate: DataTypes.DATE,
    enddate: DataTypes.DATE,
    centerid: DataTypes.INTEGER,
    userid: DataTypes.INTEGER
  });

  Event.associate = (models) => {
    Event.belongsTo(models.users, {
      foreignKey: 'userid',
      onDelete: 'CASCADE',
    });
  };

  return Event;
};
