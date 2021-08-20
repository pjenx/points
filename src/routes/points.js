const express = require("express");
const router = new express.Router();
const getBalance = require('../services/points/getBalanceService');
const spend = require('../services/points/spendService');

router.get("/points/balance", async (req, res) => {
  
  try {
    const balances = getBalance();
    res.send(balances);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/points/spend", async (req, res) => {

  // check validity of request obj - basic, could be middleware - should futher validate types, etc.
  const keys = Object.keys(req.body);
  const reqiredKeys = ["points"];
  const isValid = keys.every((key) => reqiredKeys.includes(key));
  if (!isValid) {
    return res.status(400).send({ error: "Invalid spend field(s)!" });
  }
  const pointsToSpend = req.body.points;

  try {
    const spent = spend(pointsToSpend);
    res.status(201).send(spent);

  } catch (e) {
    res.status(400).send(e.message);
  }
});

module.exports = router;
