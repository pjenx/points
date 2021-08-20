class SpendServicePayer {
  constructor(name, transactions) {
    this.name = name;
    this.negPtsTot = this._getNegPtsTot(transactions);
    this.negPtsRemaining = this.negPtsTot;
    this.pointsSpent = 0;
  }
  _getNegPtsTot(transactions) {
    let neg = 0;
    // for each transaction in history
    for (const trans of transactions) {
      if ((trans.payer === this.name) && (trans.points < 0)) {
        neg += trans.points;
      }
    }
    return neg;
  }
  getName() {
    return this.name;
  }
  getNegPtsRemaining() {
    return this.negPtsRemaining;
  }
  updateNegPtsRemaining(pts) {
    this.negPtsRemaining = pts;
  }
  updatePointsSpent(pts) {
    this.pointsSpent -= pts;
  }
  getPointsSpent() {
    return this.pointsSpent;
  }
}



module.exports = SpendServicePayer;