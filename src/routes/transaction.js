const express = require("express");
const router = new express.Router();
const addTransaction = require('../services/transaction/addTransactionService');

router.post("/transaction", async (req, res) => {

  //check validity of request obj - basic, could be middleware
  const keys = Object.keys(req.body);
  const reqiredKeys = ["payer", "points", "timestamp"];
  const isValid = keys.every((key) => reqiredKeys.includes(key));
  if (!isValid) {
    return res.status(400).send({ error: "Invalid transaction field(s)!" });
  }

  try {
    addTransaction(req.body);
    res.send({
      message: "transaction added.",
    });
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
