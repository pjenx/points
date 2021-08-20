const express = require("express");

// instead of a DB connection (and assuming a single user)
// global array to hold transactions
global.transactions = [];
// global.transactions = [
//   { "payer": "DANNON", "points": 1000, "timestamp": "2020-11-02T14:00:00Z" },
//   { "payer": "UNILEVER", "points": 200, "timestamp": "2020-10-31T11:00:00Z" },
//   { "payer": "DANNON", "points": -200, "timestamp": "2020-10-31T15:00:00Z" },
//   { "payer": "MILLER COORS", "points": 10000, "timestamp": "2020-11-01T14:00:00Z" },
//   { "payer": "DANNON", "points": 300, "timestamp": "2020-10-31T10:00:00Z" }
// ]

const transactionRouter = require("./routes/transaction");
const pointsRouter = require("./routes/points");

const app = express();

app.use(express.json());
app.use(transactionRouter);
app.use(pointsRouter);

module.exports = app;
