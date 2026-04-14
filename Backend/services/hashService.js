
const crypto = require("crypto");

// Generate hash from file name + time (simple version)
function generateHash(fileName) {
  const hash = crypto
    .createHash("sha256")
    .update(fileName + Date.now())
    .digest("hex");

  return hash;
}

module.exports = {
  generateHash,
};