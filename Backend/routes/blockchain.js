const express = require("express");
const router = express.Router();
const { getBlockchain } = require("../controllers/blockchainController");

router.get("/", getBlockchain);

module.exports = router;