const express = require("express");
const router = express.Router();
const userBalanceController = require("../controllers/userBalance.controller");
const { authToken } = require("../utils/middlewares/auth");

router.get("/", authToken, userBalanceController.showBalanceCurrentUser);
router.put("/topup", authToken, userBalanceController.addBalanceUser);

module.exports = router;
