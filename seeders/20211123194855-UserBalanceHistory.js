'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert( "UserBalanceHistories", [
      {
        userBalanceId : 1,
        balanceBefore : 10000,
        balanceAfter  : 40000,
        activity      : "Transfer",
        type          : "Kredit",
        ip            : null,
        userAgent     : null,
        author        : null,
        createdAt     : new Date(),
        updatedAt     : new Date(),
      },
      {
        userBalanceId : 2,
        balanceBefore : 20000,
        balanceAfter  : 450000,
        activity      : "Accept",
        type          : "Debit",
        ip            : null,
        userAgent     : null,
        author        : null,
        createdAt     : new Date(),
        updatedAt     : new Date(),
      },
      {
        userBalanceId : 2,
        balanceBefore : 15000,
        balanceAfter  : 90000,
        activity      : "Transfer",
        type          : "Kredit",
        ip            : null,
        userAgent     : null,
        author        : null,
        createdAt     : new Date(),
        updatedAt     : new Date(),
      },
      {
        userBalanceId : 1,
        balanceBefore : 20000,
        balanceAfter  : 459000,
        activity      : "Accept",
        type          : "Debit",
        ip            : null,
        userAgent     : null,
        author        : null,
        createdAt     : new Date(),
        updatedAt     : new Date(),
      },
    ], {} );
  },

  down: async (queryInterface, Sequelize) => {}
};
