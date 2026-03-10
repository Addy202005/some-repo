import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useWallet } from '../context/WalletContext';
// import { getContract } from '../utils/contract';

export default function SellShares() {
  const navigate = useNavigate();
  const location = useLocation();
  // signer is used when contract calls are enabled (see commented-out code below)
  const { account, signer } = useWallet(); // eslint-disable-line no-unused-vars
  const stock = location.state?.stock;

  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!stock) {
    return (
      <div className="page-container">
        <p className="error-message">No stock selected. <button className="btn-secondary" onClick={() => navigate('/')}>Go back</button></p>
      </div>
    );
  }

  const totalRevenue = (parseFloat(stock.pricePerShare) * quantity).toFixed(6);

  const handleSell = async () => {
    setError('');

    if (!account) {
      setError('Please connect your MetaMask wallet first.');
      return;
    }

    const qty = parseInt(quantity, 10);
    if (!qty || qty < 1 || qty > stock.availableShares) {
      setError(`Please enter a valid quantity between 1 and ${stock.availableShares}.`);
      return;
    }

    setLoading(true);
    try {
      // Replace with contract call when deployed:
      // const contract = getContract(signer);
      // const tx = await contract.sellShares(stock.symbol, qty);
      // const receipt = await tx.wait();

      // Demo mode: simulate transaction
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const receipt = {
        transactionHash: `0x${Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`,
        blockNumber: Math.floor(Math.random() * 1000000) + 18000000,
        confirmations: 1,
        gasUsed: (Math.floor(Math.random() * 50000) + 50000).toString(),
      };

      navigate('/confirmation', {
        state: {
          type: 'SELL',
          stock,
          quantity: qty,
          totalCost: totalRevenue,
          receipt,
        },
      });
    } catch (err) {
      setError(err.message || 'Transaction failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="trade-form-card">
        <div className="trade-form-header sell-header">
          <h2>💸 Sell Shares</h2>
        </div>

        <div className="stock-info-section">
          <div className="stock-info-row">
            <span className="stock-symbol-large">{stock.symbol}</span>
            <span className="stock-name-label">{stock.name}</span>
          </div>
          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">Price per Share</span>
              <span className="info-value">{stock.pricePerShare} ETH</span>
            </div>
            <div className="info-item">
              <span className="info-label">Available Shares</span>
              <span className="info-value">{stock.availableShares.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="form-section">
          <label className="form-label" htmlFor="quantity">Quantity</label>
          <input
            id="quantity"
            type="number"
            className="form-input"
            min={1}
            max={stock.availableShares}
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>

        <div className="total-display">
          <span className="total-label">Total Revenue</span>
          <span className="total-value sell-total">{totalRevenue} ETH</span>
        </div>

        {error && <p className="error-message">{error}</p>}

        <div className="form-actions">
          <button
            className="btn-sell-large"
            onClick={handleSell}
            disabled={loading}
          >
            {loading ? 'Processing...' : `Sell ${quantity} Share(s)`}
          </button>
          <button className="btn-secondary" onClick={() => navigate('/')}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
