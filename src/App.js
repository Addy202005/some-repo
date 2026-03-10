import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { WalletProvider, useWallet } from './context/WalletContext';
import Navbar from './components/Navbar';
import ConnectWallet from './components/ConnectWallet';
import StockList from './components/StockList';
import BuyShares from './components/BuyShares';
import SellShares from './components/SellShares';
import Portfolio from './components/Portfolio';
import SettlementConfirmation from './components/SettlementConfirmation';
import './App.css';

function AppRoutes() {
  const { account } = useWallet();

  return (
    <>
      <Navbar />
      <main>
        {account ? (
          <Routes>
            <Route path="/" element={<StockList />} />
            <Route path="/buy" element={<BuyShares />} />
            <Route path="/sell" element={<SellShares />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/confirmation" element={<SettlementConfirmation />} />
          </Routes>
        ) : (
          <ConnectWallet />
        )}
      </main>
    </>
  );
}

export default function App() {
  return (
    <WalletProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </WalletProvider>
  );
}
