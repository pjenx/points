const Payer = require('./SpendSevicePayer');
const addTransaction = require('../transaction/addTransactionService');

const spendService = (pointsToSpend) => {

  const transactions = global.transactions;

  // is the requested point spending > 0
  if ((!pointsToSpend) || (pointsToSpend < 0)) {
    throw new Error("Spent points must be a positive number");
  }
  // does the user have enough points?
  if (pointsToSpend > userPointTotal(transactions)) {
    throw new Error("Request exceeds available points");
  }
  
  const allPayers = getAllPayers(transactions);
  // console.log(allPayers);

  const allTransactionsSorted = sortTransactionsOldestFirst(transactions);
  // console.log(allTransactionsSorted);
  let ptsToSpendRemaining = pointsToSpend;
  // console.log(ptsToSpendRemaining);

  for (transaction of allTransactionsSorted) {
      
      // if pts to spend are used up, we are done
      if (ptsToSpendRemaining <= 0) break;
      // if the current line is negative or 0, skip it
      if (transaction.pts <= 0) continue;
      //-----

      const payer = allPayers.find((payr) => {
        return payr.getName() === transaction.payer
      });
      // add positve transaction points and remaining negative payer points
      const ptsAvailThisTransaction = transaction.points + payer.getNegPtsRemaining();

      // this transaction's pts can't be spent, negative pts equal or exceed it
      if (ptsAvailThisTransaction <= 0) {
        // update the remaining negative pts of this payer 
        // after cancelling out the current transaction
        payer.updateNegPtsRemaining(ptsAvailThisTransaction);
      }
      // points availabe are positive - negative points have been used up
      // and we can spend
      else {
        let spendAmt = 0;
        // update the negative pts of this payer to 0
        payer.updateNegPtsRemaining(0);

        if (ptsAvailThisTransaction > ptsToSpendRemaining) {
          spendAmt = ptsToSpendRemaining;
        } else {
          spendAmt = ptsAvailThisTransaction;
        }
        // update remaining points to spend
        ptsToSpendRemaining -= spendAmt;
        // update payer to hold spend amounts
        payer.updatePointsSpent(spendAmt);
      }
  }

  let returnValue = [];
  // console.log(allPayers);
  for (payer of allPayers) {
    // for each payer
    if (payer.getPointsSpent() < 0) {
      // create spend transaction
      addTransaction({
        payer: payer.getName(),
        points: payer.getPointsSpent(),
        timestamp: new Date().toISOString().split('.')[0] + "Z"
      });

      returnValue = [...returnValue, {
        payer: payer.getName(),
        points: payer.getPointsSpent()
      }];
    }
  }

  return returnValue;


  
}
const getAllPayers = (transactions) => {
  let allPayers = [];
    
  try {
    for (trans of transactions) {
      // is the payer in our running list of payers yet?
      const foundPayer = allPayers.find(payer => {
        return payer?.getName() === trans.payer;
      });
      // if not, add a new SpendServicePayer
      if (!foundPayer) {
        allPayers = [...allPayers, new Payer(trans.payer, transactions)];
      }
    }
  } catch (e) {
    throw new Error(e);
  }  
  // return array of unique payers
  return allPayers;
}

// could come from db model
const userPointTotal = (transactions) => {
  return transactions.reduce(function (tot, trans) {
    return tot + trans.points;
  }, 0);
};

const sortTransactionsOldestFirst = (transactions) => {
  return transactions.sort((a, b) => {
    return new Date(a.timestamp) - new Date(b.timestamp);
  });
}

module.exports = spendService;