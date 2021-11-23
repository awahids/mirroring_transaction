"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("UserBalanceHistories", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userBalanceId: {
        type: Sequelize.INTEGER,
        references: {
          model: "UserBalances",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      balanceBefore: {
        type: Sequelize.INTEGER,
      },
      balanceAfter: {
        type: Sequelize.INTEGER,
      },
      activity: {
        type: Sequelize.STRING,
      },
      type: {
        type: Sequelize.ENUM("Debit", "Kredit"),
      },
      ip: {
        type: Sequelize.STRING,
      },
      location: {
        type: Sequelize.STRING,
      },
      userAgent: {
        type: Sequelize.STRING,
      },
      author: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("UserBalanceHistories");
  },
};
