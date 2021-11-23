"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserBalance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserBalance.init(
    {
      userId: DataTypes.INTEGER,
      balance: DataTypes.STRING,
      balanceAchieve: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "UserBalance",
    }
  );
  return UserBalance;
};
