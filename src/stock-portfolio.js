
class StockPortfolio {
    constructor() {
      this.stocks = {};
    }
  
    addStock(symbol, shares) {
      if (shares <= 0) {
        throw new Error('Shares must be a positive number.');
      }
  
      if (this.stocks[symbol]) {
        this.stocks[symbol] += shares;
      } else {
        this.stocks[symbol] = shares;
      }
    }

    sellStock(symbol, sharesToSell) {
      if (sharesToSell <= 0) {
        throw new Error('Shares to sell must be a positive number.');
      }
  
      if (this.stocks[symbol]) {
        if (this.stocks[symbol] >= sharesToSell) {
          this.stocks[symbol] -= sharesToSell;
        } else {
          throw new ShareSaleException('Insufficient shares to sell.');
        }
      } else {
        throw new Error('No shares of the specified stock in the portfolio.');
      }
    }

    getShares(symbol) {
      return this.stocks[symbol] || 0;
    }

    isEmptyPortfolio() {
      return Object.keys(this.stocks).length === 0;
    }
  
    listStocks() {
      return Object.keys(this.stocks);
    }

    numTickers() {
      return Object.keys(this.stocks).length;
    }
  }

  class ShareSaleException extends Error {
    constructor(message) {
      super(message);
      this.name = 'ShareSaleException';
    }
  }

  export { StockPortfolio, ShareSaleException };
  