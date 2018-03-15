module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define(
    'contacts',
    {
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      phone_number: DataTypes.STRING,
      email: DataTypes.STRING,
      ownerid: DataTypes.INTEGER,
    },
    {},
  );
  Contact.associate = function (models) {
    // associations can be defined here
  };
  return Contact;
};
