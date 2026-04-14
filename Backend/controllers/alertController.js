const { getAlerts } = require("../data/memory");

exports.getAlerts = (req, res) => {
  res.json(getAlerts());
};