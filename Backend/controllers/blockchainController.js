const { getBlockchain } = require("../data/memory");

exports.getBlockchain = (req, res) => {
  res.json(getBlockchain());
};