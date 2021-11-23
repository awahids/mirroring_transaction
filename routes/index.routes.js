const express = require("express");
const router = express.Router();
const authRouter = require("./auth.routes");
const balanceUserRouter = require("./balanceUser.routes");

router.use("/auth", authRouter);
router.use("/balance", balanceUserRouter);

module.exports = router;
