const express = require("express");
const router = express.Router();
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/")
  },
  filename: function (req, file, cb) {
    const ext = file.originalname.split('.').pop() || "bin";
    cb(null, "evidence-" + Date.now() + "." + ext);
  }
});
const upload = multer({ storage: storage });

const { uploadFile } = require("../controllers/uploadController");

router.post("/", upload.single("file"), uploadFile);

module.exports = router;