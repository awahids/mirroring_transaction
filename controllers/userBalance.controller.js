const { Users, UserBalances, UserBalanceHistory } = require("../models");
const Joi = require("joi");
require("dotenv").config();

module.exports = {
  getBalanceUser: async (req, res) => {
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

  topUpBalance: async (req, res) => {
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

      const createHistoryAddBalanceUser = await UserBalanceHistory.create({
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
      });
    } catch (error) {
      return res.status(500).json({
        status: "Failed",
        message: "Internal Server Error",
      });
    }
  },

  transferBalance: async (req, res) => {
    const { ammount, ip, location, userAgent, author } = req.body;
    const userId = req.user.id;
    const body = req.body;
    const destinationUserId = req.body.userId;

    try {
      const schema = Joi.object({
        ammount: Joi.number().required(),
        userId: Joi.number().required(),
      });

      const { error } = schema.validate({ ...body }, { abortEarly: false });

      if (error) {
        return res.status(400).json({
          status: "failed",
          message: "input uncorectly",
          error: error["details"][0]["message"],
        });
      }

      const findUser = await Users.findOne({
        where: { id: userId },
      });

      if (!findUser) {
        return res.status(400).json({
          status: "Failed",
          message: "Cannot find user",
        });
      }

      let destinationUserBalance = await UserBalances.findOne({
        where: { userId: destinationUserId },
      });
      destinationUserBalance = JSON.parse(
        JSON.stringify(destinationUserBalance)
      );

      let sourceUserBalance = await UserBalances.findOne({
        where: { userId: userId },
      });
      sourceUserBalance = JSON.parse(JSON.stringify(sourceUserBalance));

      if (ammount > sourceUserBalance.balance) {
        return res.status(400).json({
          status: "Failed",
          message: "Your balance is not enough",
        });
      }

      await UserBalances.update(
        { balance: ammount + destinationUserBalance.balance },
        { where: { userId: destinationUserBalance.id } }
      );
      await UserBalances.update(
        { balance: sourceUserBalance.balance - ammount },
        { where: { userId: sourceUserBalance.id } }
      );

      const historyDestinationBalance = await UserBalanceHistory.create({
        userBalanceId: destinationUserBalance.id,
        balanceBefore: destinationUserBalance.balance,
        balanceAfter: ammount + destinationUserBalance.balance,
        activity: "Accept Transder",
        type: "Kredit",
        ip: ip,
        location: location,
        userAgent: userAgent,
        author: author,
      });

      if (!historyDestinationBalance) {
        return res.status(400).json({
          status: "failed",
          message: "Cannot create history destination balance",
        });
      }

      const historySourceBalance = await UserBalanceHistory.create({
        userBalanceId: sourceUserBalance.id,
        balanceBefore: sourceUserBalance.balance,
        balanceAfter: sourceUserBalance.balance - ammount,
        activity: "Transder",
        type: "Debit",
        ip: ip,
        location: location,
        userAgent: userAgent,
        author: author,
      });

      if (!historySourceBalance) {
        return res.status(400).json({
          status: "failed",
          message: "Cannot create history destination balance",
        });
      }
      return res.status(200).json({
        status: "Success",
        message: "Success transfer",
      });
    } catch (error) {
      return res.status(500).json({
        status: "Failed",
        message: "Internal Server Error",
      });
    }
  },
};
