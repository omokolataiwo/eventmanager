module.exports = (sequelize, DataTypes) => {
  const Center = sequelize.define('centers', {
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    area: DataTypes.STRING,
    state: DataTypes.INTEGER,
    capacity: DataTypes.INTEGER,
    type: DataTypes.INTEGER,
    ownerId: DataTypes.INTEGER,
    contactId: DataTypes.INTEGER,
    facilities: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    details: DataTypes.TEXT,
    image: DataTypes.TEXT
  });

  Center.associate = models => {
    Center.hasMany(models.events, {
      foreignKey: 'centerId',
      as: 'events'
    });

    Center.belongsTo(models.users, {
      foreignKey: 'ownerId',
      as: 'evnts'
    });
  };

  return Center;
};
