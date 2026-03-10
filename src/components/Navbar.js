import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useWallet } from '../context/WalletContext';

function shortenAddress(address) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export default function Navbar() {
  const { account, balance, networkName, connectWallet, disconnectWallet } = useWallet();

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        ⛓️ BlockSettle
      </Link>

      <div className="navbar-links">
        <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          Stocks
        </NavLink>
        <NavLink to="/portfolio" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          Portfolio
        </NavLink>
      </div>

      <div className="navbar-wallet">
        {account ? (
          <>
            <span className="network-badge">{networkName}</span>
            <span className="balance-display">{parseFloat(balance).toFixed(4)} ETH</span>
            <span className="address-display">{shortenAddress(account)}</span>
            <button className="btn-disconnect" onClick={disconnectWallet}>
              Disconnect
            </button>
          </>
        ) : (
          <button className="btn-connect" onClick={connectWallet}>
            🦊 Connect MetaMask
          </button>
        )}
      </div>
    </nav>
  );
}
