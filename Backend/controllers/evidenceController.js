const { getEvidence } = require("../data/memory");

exports.getEvidence = (req, res) => {
  res.json(getEvidence());
};