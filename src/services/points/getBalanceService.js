
const getBalanceService = () => {
  const transactions = global.transactions;
  //empty array for balances
  let balances = [];
  // for each transaction in history
  for (const trans of transactions) {
    // does the payer exist yet in our balances array?
    const balIndex = balances.findIndex((bal) => {
      return bal.payer === trans.payer;
    });

    // if not, add the new payer's balance
    if (balIndex === -1) {
      balances = [...balances, { payer: trans.payer, points: trans.points }];

      // if so, add the transaction points into the payer's balance
    } else {
      balances[balIndex].points += trans.points;
    }
  }

  //adjust balances format
  let balAdj = {}
  for (balance of balances) {
    balAdj[balance.payer] = balance.points;
  }

  return balAdj;
}

module.exports = getBalanceService;