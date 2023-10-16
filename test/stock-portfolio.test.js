
import { StockPortfolio, ShareSaleException } from '../src/stock-portfolio'; 

describe('Stock Portfolio', () => {
  let myPortfolio;

  beforeEach(() => {
    myPortfolio = new StockPortfolio();
  });

  it('should create an empty portfolio', () => {
    expect(myPortfolio.listStocks()).toEqual([]);
  });

  it('should know if the portfolio is empty', () =>{
    expect(myPortfolio.isEmptyPortfolio()).toBe(true);
  });

  it('should add a stock to the portfolio', () => {
    myPortfolio.addStock('AAPL', 10);
    expect(myPortfolio.listStocks()).toEqual(['AAPL']);
  });

  it('should know if the portfolio is not empty', () => {
    myPortfolio.addStock('AAPL', 10);
    expect(myPortfolio.isEmptyPortfolio()).toBe(false);
  });

  it('should get the number of shares for a stock', () => {
    myPortfolio.addStock('AAPL', 10);
    expect(myPortfolio.getShares('AAPL')).toEqual(10);
  });

  it('should add and update shares for the same stock', () => {
    myPortfolio.addStock('AAPL', 10);
    myPortfolio.addStock('AAPL', 5);
    expect(myPortfolio.getShares('AAPL')).toEqual(15);
  });

  it('should not allow adding a negative number of shares', () => {
    expect(() => myPortfolio.addStock('AAPL', -5)).toThrow('Shares must be a positive number.');
  });

  it('should list all stocks in the portfolio', () => {
    myPortfolio.addStock('AAPL', 10);
    myPortfolio.addStock('GOOGL', 5);
    expect(myPortfolio.listStocks()).toEqual(['AAPL', 'GOOGL']);
  });

  it('should know the number of unique tickers', () => {
    myPortfolio.addStock('AAPL', 10);
    myPortfolio.addStock('GOOGL', 5);
    expect(myPortfolio.numTickers()).toEqual(2);
  });

  it('should sell stocks and update the share count', () => {
    myPortfolio.addStock('AAPL', 10);
    myPortfolio.addStock('GOOGL', 5);

    myPortfolio.sellStock('AAPL', 3);

    expect(myPortfolio.getShares('AAPL')).toEqual(7);

    myPortfolio.sellStock('GOOGL', 4);

    expect(myPortfolio.getShares('GOOGL')).toEqual(1);
  });

  it('should throw an error if selling more shares than owned', () => {
    myPortfolio.addStock('AAPL', 10);
    expect(() => myPortfolio.sellStock('AAPL', 15)).toThrow(ShareSaleException);
  });

  it('should throw an error if selling a negative number of shares', () => {
    myPortfolio.addStock('AAPL', 10);
    expect(() => myPortfolio.sellStock('AAPL', -5)).toThrow('Shares to sell must be a positive number.');
  });

  it('should throw an error if trying to sell shares of a non-existent stock', () => {
    expect(() => myPortfolio.sellStock('TSLA', 5)).toThrow('No shares of the specified stock in the portfolio.');
  });

});
