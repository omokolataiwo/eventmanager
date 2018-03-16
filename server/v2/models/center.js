
module.exports = (sequelize, DataTypes) => {
  const Center = sequelize.define('centers', {
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    state: DataTypes.INTEGER,
    capacity: DataTypes.INTEGER,
    type: DataTypes.INTEGER,
    ownerid: DataTypes.INTEGER,
    contactid: DataTypes.INTEGER,
    facilities: DataTypes.STRING,
    amount: DataTypes.INTEGER,
  });

  Center.associate = (models) => {
    Center.hasMany(models.events, {
      foreignKey: 'centerid',
      as: 'events',
    });

    Center.belongsTo(models.users, {
      foreignKey: 'ownerid',
      as: 'evnts',
    });
  };

  return Center;
};
