const express = require("express");
const cors = require("cors");
const { generateHash } = require("./services/hashService");

const app = express();

const { addBlock, getBlockchain } = require("./services/blockchainService");

// ✅ ROUTES
const evidenceRoute = require("./routes/evidence");
const alertRoute = require("./routes/alerts");
const blockchainRoute = require("./routes/blockchain");
const uploadRoute = require("./routes/upload");

// middleware
app.use(cors());
app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.send("ForensiChain Backend Running");
});

app.get("/test-hash", (req, res) => {
  const hash = generateHash("test-file.mp4");
  res.json({ hash });
});

app.get("/test-blockchain", (req, res) => {
  const hash = generateHash("file-" + Date.now());
  const block = addBlock(hash);

  res.json({
    message: "Block added",
    block: block,
  });
});

// ✅ IMPORTANT ROUTES (THIS WAS MISSING)
app.use("/upload", uploadRoute);
app.use("/evidence", evidenceRoute);
app.use("/alerts", alertRoute);
app.use("/blockchain", blockchainRoute);

// start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});