module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define(
    'contacts',
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      email: DataTypes.STRING,
      ownerId: DataTypes.INTEGER
    },
    {}
  );
  Contact.associate = function(models) {
    // associations can be defined here
  };
  return Contact;
};
