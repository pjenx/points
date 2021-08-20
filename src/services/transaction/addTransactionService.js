// would interact with the model here...

const addTransactionService = (newTransaction) => {
  global.transactions = [...global.transactions, newTransaction];
}

module.exports = addTransactionService;
