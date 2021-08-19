const express = require("express");
const router = new express.Router();

router.post("/transaction", async (req, res) => {
  //check validity
  const keys = Object.keys(req.body);
  const reqiredKeys = ["payer", "points", "timestamp"];
  const isValid = keys.every((key) => reqiredKeys.includes(key));
  if (!isValid) {
    return res.status(400).send({ error: "Invalid transaction field(s)!" });
  }

  try {
    global.transactions = [...global.transactions, req.body];
    res.send({
      message: "transaction added.",
      // transactions: global.transactions,
    });
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
