const express = require("express");

// instead of a DB connection (and assuming a single user)
// array in memory to hold transactions
global.transactions = [];
const transactionRouter = require("./routes/transaction");
const pointsRouter = require("./routes/points");

const app = express();

app.use(express.json());
app.use(transactionRouter);

module.exports = app;
