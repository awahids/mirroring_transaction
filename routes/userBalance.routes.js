const express = require("express");
const router = express.Router();
const userBalanceController = require("../controllers/userBalance.controller");
const { authToken } = require("../utils/middlewares/auth");

router.get("/", authToken, userBalanceController.getBalanceUser);
router.put("/topup", authToken, userBalanceController.topUpBalance);
router.put("/transfer", authToken, userBalanceController.transferBalance);

module.exports = router;
