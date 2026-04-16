const express = require("express");
const router = express.Router();

let evidenceStore = []; // 🔥 temporary memory storage

// ✅ SAVE evidence (called after upload)
router.post("/add", (req, res) => {
    const evidence = req.body;
    evidenceStore.push(evidence);
    res.json({ message: "Evidence stored" });
});

// ✅ GET all evidence
router.get("/", (req, res) => {
    res.json(evidenceStore);
});

module.exports = router;