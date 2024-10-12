const express = require("express");
const router = express.Router();
const refreshTokenController = require("../controllers/refreshTokenController");

console.log("refresh routte enterd");

router.get("/", refreshTokenController.handleRefreshToken);

module.exports = router;
