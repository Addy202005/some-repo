import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function truncateHash(hash) {
  if (!hash) return '';
  return `${hash.slice(0, 10)}...${hash.slice(-8)}`;
}

export default function SettlementConfirmation() {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;

  if (!data) {
    return (
      <div className="page-container">
        <p className="error-message">
          No confirmation data found.{' '}
          <button className="btn-secondary" onClick={() => navigate('/')}>
            Go back
          </button>
        </p>
      </div>
    );
  }

  const { type, stock, quantity, totalCost, receipt } = data;
  const isBuy = type === 'BUY';

  return (
    <div className="page-container">
      <div className="confirmation-card">
        <div className="confirmation-icon">{isBuy ? '✅' : '💸'}</div>
        <h2 className="confirmation-title">Settlement Confirmed!</h2>
        <p className="confirmation-subtitle">
          {isBuy
            ? `You successfully purchased ${quantity} share(s) of ${stock.symbol}`
            : `You successfully sold ${quantity} share(s) of ${stock.symbol}`}
        </p>

        <div className="confirmation-details">
          <div className="detail-row">
            <span className="detail-key">Type</span>
            <span className={`trade-badge ${isBuy ? 'badge-buy' : 'badge-sell'}`}>{type}</span>
          </div>
          <div className="detail-row">
            <span className="detail-key">Stock</span>
            <span className="detail-val">
              {stock.symbol} — {stock.name}
            </span>
          </div>
          <div className="detail-row">
            <span className="detail-key">Quantity</span>
            <span className="detail-val">{quantity} share(s)</span>
          </div>
          <div className="detail-row">
            <span className="detail-key">{isBuy ? 'Total Cost' : 'Total Revenue'}</span>
            <span className={`detail-val ${isBuy ? 'cost-value' : 'revenue-value'}`}>
              {totalCost} ETH
            </span>
          </div>
          <div className="detail-row">
            <span className="detail-key">Transaction Hash</span>
            <span className="detail-val monospace">{truncateHash(receipt.transactionHash)}</span>
          </div>
          <div className="detail-row">
            <span className="detail-key">Block Number</span>
            <span className="detail-val">{receipt.blockNumber?.toLocaleString()}</span>
          </div>
          <div className="detail-row">
            <span className="detail-key">Confirmations</span>
            <span className="detail-val">{receipt.confirmations}</span>
          </div>
          <div className="detail-row">
            <span className="detail-key">Gas Used</span>
            <span className="detail-val">{String(receipt.gasUsed)}</span>
          </div>
          <div className="detail-row">
            <span className="detail-key">Status</span>
            <span className="detail-val settled-status">✅ Settled T+0</span>
          </div>
        </div>

        <div className="confirmation-actions">
          <button className="btn-secondary" onClick={() => navigate('/')}>
            Back to Stocks
          </button>
          <button className="btn-buy-large" onClick={() => navigate('/portfolio')}>
            View Portfolio
          </button>
        </div>
      </div>
    </div>
  );
}
