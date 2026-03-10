import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DEMO_STOCKS } from '../utils/contract';

// Demo portfolio data
const DEMO_PORTFOLIO = [
  { symbol: 'AAPL', shares: 10 },
  { symbol: 'GOOGL', shares: 5 },
  { symbol: 'TSLA', shares: 15 },
];

// Replace with contract call when deployed:
// async function fetchPortfolio(contract, account) {
//   const [symbols, quantities, avgPrices] = await contract.getPortfolio(account);
//   return symbols.map((sym, i) => ({
//     symbol: sym,
//     shares: quantities[i].toNumber(),
//     avgPrice: ethers.utils.formatEther(avgPrices[i]),
//   }));
// }

function buildHoldings() {
  return DEMO_PORTFOLIO.map((holding) => {
    const stockInfo = DEMO_STOCKS.find((s) => s.symbol === holding.symbol);
    const avgPrice = stockInfo ? stockInfo.pricePerShare : '0';
    const value = (parseFloat(avgPrice) * holding.shares).toFixed(6);
    return { ...holding, avgPrice, value, stockInfo };
  });
}

function getFallbackStock(holding) {
  return {
    symbol: holding.symbol,
    name: holding.symbol,
    pricePerShare: holding.avgPrice,
    availableShares: holding.shares,
  };
}

export default function Portfolio() {
  const navigate = useNavigate();
  const holdings = buildHoldings();

  const totalShares = holdings.reduce((sum, h) => sum + h.shares, 0);
  const totalValue = holdings.reduce((sum, h) => sum + parseFloat(h.value), 0).toFixed(6);

  if (holdings.length === 0) {
    return (
      <div className="page-container">
        <div className="empty-state">
          <div className="empty-icon">📭</div>
          <h3>No Holdings Yet</h3>
          <p>You don't have any stocks in your portfolio.</p>
          <button className="btn-buy-large" onClick={() => navigate('/')}>
            Browse Stocks
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>💼 My Portfolio</h2>
        <p>Your current stock holdings</p>
      </div>

      <div className="portfolio-summary">
        <div className="summary-card">
          <div className="summary-icon">📊</div>
          <div className="summary-label">Total Holdings</div>
          <div className="summary-value">{holdings.length}</div>
        </div>
        <div className="summary-card">
          <div className="summary-icon">🔢</div>
          <div className="summary-label">Total Shares</div>
          <div className="summary-value">{totalShares.toLocaleString()}</div>
        </div>
        <div className="summary-card">
          <div className="summary-icon">💰</div>
          <div className="summary-label">Portfolio Value</div>
          <div className="summary-value">{totalValue} ETH</div>
        </div>
      </div>

      <div className="portfolio-table-wrapper">
        <table className="portfolio-table">
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Shares</th>
              <th>Avg. Price</th>
              <th>Value (ETH)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {holdings.map((holding) => (
              <tr key={holding.symbol}>
                <td>
                  <span className="table-symbol">{holding.symbol}</span>
                  <span className="table-name">{holding.stockInfo?.name}</span>
                </td>
                <td>{holding.shares.toLocaleString()}</td>
                <td>{holding.avgPrice} ETH</td>
                <td className="value-cell">{holding.value} ETH</td>
                <td>
                  <button
                    className="btn-sell-small"
                    onClick={() =>
                      navigate('/sell', {
                        state: { stock: holding.stockInfo || getFallbackStock(holding) },
                      })
                    }
                  >
                    Sell
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
