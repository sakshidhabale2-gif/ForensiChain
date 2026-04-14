const express = require("express");
const router = express.Router();
const { getEvidence } = require("../controllers/evidenceController");

router.get("/", getEvidence);

module.exports = router;