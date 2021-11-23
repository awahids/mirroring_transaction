const { Users, UserBalances, UserBalanceHistorys } = require("../models");
const Joi = require("joi");
require("dotenv").config();

module.exports = {
  showBalanceCurrentUser: async (req, res) => {
    const userId = req.user.id;
    try {
      const findBalance = await UserBalances.findOne({
        where: { userId },
      });

      if (!findBalance) {
        return res.status(400).json({
          status: "Failed",
          message: "Balance cannot find",
        });
      }

      return res.status(200).json({
        status: "Success",
        message: "Success retrieved balance user",
        data: findBalance,
      });
    } catch (error) {
      return res.status(500).json({
        status: "Failed",
        message: "Internal Server Error",
      });
    }
  },

  addBalanceUser: async (req, res) => {
    const { ammount, userBalanceId, ip, location, userAgent, author } =
      req.body;
    const userId = req.user.id;
    const body = req.body;

    try {
      const schema = Joi.object({
        ammount: Joi.number().required(),
      });

      const { error } = schema.validate({ ...body }, { abortEarly: false });

      if (error) {
        return res.status(400).json({
          status: "failed",
          message: "input uncorectly",
          error: error["details"][0]["message"],
        });
      }

      const findUser = await UserBalances.findOne({
        where: { id: userId },
      });

      if (!findUser) {
        console.log("🚀 ~ file: userBalance.controller.js ~ line 59 ~ addBalanceUser: ~ findUser", findUser)
        return res.status(400).json({
          status: "Failed",
          message: "Cannot find user id",
        });
      }

      const addBalanceUser = await UserBalances.update(
        {
          balance: ammount + findUser.balance,
        },
        {
          where: { userId: userId },
        }
      );

      if (!addBalanceUser) {
        return res.status(400).json({
          status: "Failed",
          message: "Cannot create user balance",
        });
      }

      const createHistoryAddBalanceUser = await UserBalanceHistorys.create({
        userBalanceId: userBalanceId,
        balanceBefore: findUser.balance,
        balanceAfter: ammount + findUser.balance,
        activity: "Top Up",
        type: "Kredit",
        ip: ip,
        location: location,
        userAgent: userAgent,
        author: author,
      });

      if (!createHistoryAddBalanceUser) {
        return res.status(400).json({
          status: "failed",
          message: "Cannot create history balance user",
        });
      }

      return res.status(200).json({
        status: "Success",
        message: "Success add balance user",
        data: addBalanceUser,
      });
    } catch (error) {
      console.log("🚀 ~ file: userBalance.controller.js ~ line 107 ~ addBalanceUser: ~ error", error)
      return res.status(500).json({
        status: "Failed",
        message: "Internal Server Error",
      });
    }
  },
};
