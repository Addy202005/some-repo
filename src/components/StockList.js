import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DEMO_STOCKS } from '../utils/contract';

export default function StockList() {
  const navigate = useNavigate();
  const [stocks] = useState(DEMO_STOCKS);

  // Replace with contract call when deployed:
  // useEffect(() => {
  //   async function fetchStocks() {
  //     const contract = getContract(provider);
  //     const [symbols, names, prices, available] = await contract.getAvailableStocks();
  //     const fetched = symbols.map((sym, i) => ({
  //       symbol: sym,
  //       name: names[i],
  //       pricePerShare: ethers.utils.formatEther(prices[i]),
  //       availableShares: available[i].toNumber(),
  //     }));
  //     setStocks(fetched);
  //   }
  //   fetchStocks();
  // }, [provider]);

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>📈 Available Stocks</h2>
        <p>Buy and sell tokenized stocks on the blockchain</p>
      </div>

      <div className="stocks-grid">
        {stocks.map((stock) => (
          <div key={stock.symbol} className="stock-card">
            <div className="stock-card-header">
              <span className="stock-symbol">{stock.symbol}</span>
            </div>
            <div className="stock-card-body">
              <h3 className="stock-name">{stock.name}</h3>
              <div className="stock-detail">
                <span className="detail-label">Price per Share</span>
                <span className="detail-value price">{stock.pricePerShare} ETH</span>
              </div>
              <div className="stock-detail">
                <span className="detail-label">Available Shares</span>
                <span className="detail-value">{stock.availableShares.toLocaleString()}</span>
              </div>
            </div>
            <div className="stock-card-actions">
              <button
                className="btn-buy"
                onClick={() => navigate('/buy', { state: { stock } })}
              >
                Buy
              </button>
              <button
                className="btn-sell"
                onClick={() => navigate('/sell', { state: { stock } })}
              >
                Sell
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
