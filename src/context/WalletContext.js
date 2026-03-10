import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';

const WalletContext = createContext(null);

export function WalletProvider({ children }) {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [balance, setBalance] = useState(null);
  const [networkName, setNetworkName] = useState(null);

  const resetState = useCallback(() => {
    setAccount(null);
    setProvider(null);
    setSigner(null);
    setBalance(null);
    setNetworkName(null);
  }, []);

  const connectWallet = useCallback(async () => {
    if (!window.ethereum) {
      alert('MetaMask is not installed. Please install MetaMask to use this app.');
      return;
    }

    try {
      const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
      await web3Provider.send('eth_requestAccounts', []);

      const web3Signer = web3Provider.getSigner();
      const userAccount = await web3Signer.getAddress();
      const userBalance = await web3Provider.getBalance(userAccount);
      const network = await web3Provider.getNetwork();

      setProvider(web3Provider);
      setSigner(web3Signer);
      setAccount(userAccount);
      setBalance(ethers.utils.formatEther(userBalance));
      setNetworkName(network.name === 'unknown' ? `Chain ${network.chainId}` : network.name);
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  }, []);

  const disconnectWallet = useCallback(() => {
    resetState();
  }, [resetState]);

  useEffect(() => {
    if (!window.ethereum) return;

    const handleAccountsChanged = async (accounts) => {
      if (accounts.length === 0) {
        resetState();
      } else {
        const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
        const web3Signer = web3Provider.getSigner();
        const userBalance = await web3Provider.getBalance(accounts[0]);
        const network = await web3Provider.getNetwork();

        setAccount(accounts[0]);
        setProvider(web3Provider);
        setSigner(web3Signer);
        setBalance(ethers.utils.formatEther(userBalance));
        setNetworkName(network.name === 'unknown' ? `Chain ${network.chainId}` : network.name);
      }
    };

    const handleChainChanged = () => {
      window.location.reload();
    };

    window.ethereum.on('accountsChanged', handleAccountsChanged);
    window.ethereum.on('chainChanged', handleChainChanged);

    return () => {
      window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      window.ethereum.removeListener('chainChanged', handleChainChanged);
    };
  }, [resetState]);

  return (
    <WalletContext.Provider
      value={{ account, provider, signer, balance, networkName, connectWallet, disconnectWallet }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}
