"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert( "UserBalances", [
      {
        userId        : 1,
        balance       : 1000000,
        balanceAchieve: null,
        createdAt     : new Date(),
        updatedAt     : new Date(),
      },
      {
        userId        : 2,
        balance       : 500000,
        balanceAchieve: null,
        createdAt     : new Date(),
        updatedAt     : new Date(),
      },
    ],{} );
  },

  down: async (queryInterface, Sequelize) => {},
};
