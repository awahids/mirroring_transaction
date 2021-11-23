"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert( "Users", [
      {
        username  : "privyid",
        email     : "wahid@privy.id",
        password  : "$2b$10$67y1OebdvWM7TaeVIUyIS.rxEA71E3z89DmWLrbOqBXDda81blXhq",
        createdAt : new Date(),
        updatedAt : new Date(),
      },
      {
        username  : "privyid1",
        email     : "aws@privy.id",
        password  : "$2b$10$67y1OebdvWM7TaeVIUyIS.rxEA71E3z89DmWLrbOqBXDda81blXhq",
        createdAt : new Date(),
        updatedAt : new Date(),
      },
    ], {} );
  },

  down: async (queryInterface, Sequelize) => {},
};
