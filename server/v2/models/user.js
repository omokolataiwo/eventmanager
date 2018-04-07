module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('users', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    address: DataTypes.STRING,
    state: DataTypes.INTEGER,
    phoneNumber: DataTypes.STRING,
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.INTEGER,
  });

  User.associate = (models) => {
    User.hasMany(models.events, {
      foreignKey: 'userid',
      as: 'events',
    });
  };

  return User;
};
