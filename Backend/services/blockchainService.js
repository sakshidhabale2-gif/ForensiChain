let blockchain = [];

function addBlock(hash) {
  const previousHash =
    blockchain.length > 0 ? blockchain[blockchain.length - 1].hash : "0";

  const block = {
    id: blockchain.length + 1,
    hash: hash,
    previousHash: previousHash,
    timestamp: new Date(),
  };

  blockchain.push(block);

  return block;
}

function getBlockchain() {
  return blockchain;
}

module.exports = {
  addBlock,
  getBlockchain,
};