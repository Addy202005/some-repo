# ⛓️ BlockSettle — Blockchain-Powered Stock Settlement

A React frontend for a decentralized stock settlement system powered by Ethereum smart contracts and MetaMask wallet integration.

## Features

- 🦊 **MetaMask Wallet Connection** — Connect/disconnect wallet, display address, balance, and network
- 📈 **View Available Stocks** — Browse tokenized stocks (AAPL, GOOGL, MSFT, TSLA, AMZN)
- 🛒 **Buy Shares** — Enter quantity, see total cost, execute purchase
- 💸 **Sell Shares** — Enter quantity, see total revenue, execute sale
- 💼 **View Portfolio** — Summary cards and holdings table with current values
- ✅ **Settlement Confirmation** — Full transaction receipt with T+0 settlement status

All contract interaction code is present but commented out so you can run the app in demo mode without a deployed contract, then easily switch to live mode.

## Setup

```bash
npm install
npm start
```

The app runs on [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── App.js                          # Root component with router
├── App.css                         # Dark theme styles
├── index.js                        # React entry point
├── context/
│   └── WalletContext.js            # MetaMask wallet state & hooks
├── components/
│   ├── Navbar.js                   # Top navigation bar
│   ├── ConnectWallet.js            # Landing page (no wallet)
│   ├── StockList.js                # Available stocks grid
│   ├── BuyShares.js                # Buy shares form
│   ├── SellShares.js               # Sell shares form
│   ├── Portfolio.js                # Portfolio dashboard
│   └── SettlementConfirmation.js   # Transaction confirmation
├── contracts/
│   └── StockSettlement.json        # Contract address & ABI
└── utils/
    └── contract.js                 # ethers Contract factory + DEMO_STOCKS
```

## Connecting a Real Smart Contract

1. Deploy your `StockSettlement` smart contract to a network.
2. Update the `address` field in `src/contracts/StockSettlement.json` with your deployed contract address (replace the zero address `0x0000000000000000000000000000000000000000`).
3. In `StockList.js`, `BuyShares.js`, `SellShares.js`, and `Portfolio.js`, uncomment the contract call blocks marked with `// Replace with contract call when deployed:`.

## Tech Stack

| Library | Version | Purpose |
|---|---|---|
| React | 18 | UI framework |
| ethers.js | 5.7.2 | Ethereum / MetaMask integration |
| React Router | 6 | Client-side routing |
| MetaMask | — | Wallet & transaction signing |
