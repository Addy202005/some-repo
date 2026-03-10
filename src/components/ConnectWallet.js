import React from 'react';
import { useWallet } from '../context/WalletContext';

export default function ConnectWallet() {
  const { connectWallet } = useWallet();

  return (
    <div className="connect-wallet-page">
      <div className="connect-wallet-card">
        <div className="brand-logo">⛓️</div>
        <h1 className="brand-title">BlockSettle</h1>
        <p className="brand-tagline">Blockchain-Powered Stock Settlement</p>

        <button className="btn-connect-large" onClick={connectWallet}>
          🦊 Connect MetaMask Wallet
        </button>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Instant Settlement</h3>
            <p>Trades settle immediately on-chain with T+0 finality</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Secure</h3>
            <p>Smart contract enforced rules with no intermediaries</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔍</div>
            <h3>Transparent</h3>
            <p>Every trade is publicly verifiable on the blockchain</p>
          </div>
        </div>
      </div>
    </div>
  );
}
