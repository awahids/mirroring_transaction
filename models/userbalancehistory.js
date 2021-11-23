"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserBalanceHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserBalanceHistory.init(
    {
      userBalanceId: DataTypes.INTEGER,
      balanceBefore: DataTypes.INTEGER,
      balanceAfter: DataTypes.INTEGER,
      activity: DataTypes.STRING,
      type: DataTypes.ENUM("Debit", "Kredit"),
      ip: DataTypes.STRING,
      location: DataTypes.STRING,
      userAgent: DataTypes.STRING,
      author: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "UserBalanceHistory",
    }
  );
  return UserBalanceHistory;
};
