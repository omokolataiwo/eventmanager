'use strict';

module.exports = function (sequelize, DataTypes) {
  var Event = sequelize.define('events', {
    name: DataTypes.STRING,
    startdate: DataTypes.DATE,
    enddate: DataTypes.DATE,
    centerid: DataTypes.INTEGER,
    userid: DataTypes.INTEGER
  });

  Event.associate = function (models) {
    Event.belongsTo(models.users, {
      foreignKey: 'userid',
      onDelete: 'CASCADE'
    });

    Event.belongsTo(models.centers, {
      foreignKey: 'centerid',
      onDelete: 'CASCADE'
    });
  };

  return Event;
};