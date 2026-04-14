let evidenceList = [];
let blockchain = [];
let alerts = [];

module.exports = {
  addEvidence: (data) => {
    evidenceList.push(data);
  },

  getEvidence: () => evidenceList,

  addBlock: (block) => {
    blockchain.push(block);
  },

  getBlockchain: () => blockchain,

  addAlert: (alert) => {
    alerts.push(alert);
  },

  getAlerts: () => alerts,
};