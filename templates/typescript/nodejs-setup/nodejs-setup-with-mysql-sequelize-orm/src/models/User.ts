'use strict';
export default (sequelize: any, DataTypes: any) => {
  var User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING
  }, {});
  User.associate = function(models: any) {
    // associations can be defined here
  };
  return User;
};