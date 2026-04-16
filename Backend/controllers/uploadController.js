const { addEvidence, addBlock, addAlert } = require("../data/memory");
const { generateHash } = require("../services/hashService");

exports.uploadFile = async (req, res) => {
  try {
    const file = req.file;

    const hash = await generateHash(file.path);

    const isTampered = Math.random() < 0.3;
    const trustScore = Math.floor(Math.random() * 40) + 60;

    const evidence = {
      fileName: file.originalname,
      serverFileName: file.filename,
      hash,
      status: isTampered ? "Compromised" : "Safe",
      trustScore,
      time: Date.now(),
    };

    // ✅ STORE
    addEvidence(evidence);

    // ⛓ BLOCKCHAIN
    addBlock({
      id: Date.now(),
      hash,
      prevHash: "0000",
    });

    // 🚨 ALERT
    if (isTampered) {
      addAlert({
        message: `Tampering detected in ${file.originalname}`,
      });
    }

    res.json({
      ...evidence,
      blockId: Date.now(),
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Upload failed" });
  }
};