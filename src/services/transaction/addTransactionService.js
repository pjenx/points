// would interact with the model here...

const addTransactionService = (newTransaction) => {
  global.transactions = [...global.transactions, newTransaction];
  return newTransaction;
}

module.exports = addTransactionService;
