import { ethers } from 'ethers';
import contractABI from '../contracts/StockSettlement.json';

const CONTRACT_ADDRESS = contractABI.address;

export function getContract(signerOrProvider) {
  return new ethers.Contract(CONTRACT_ADDRESS, contractABI.abi, signerOrProvider);
}

export const DEMO_STOCKS = [
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    pricePerShare: '0.05',
    availableShares: 1000,
  },
  {
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    pricePerShare: '0.08',
    availableShares: 500,
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    pricePerShare: '0.06',
    availableShares: 800,
  },
  {
    symbol: 'TSLA',
    name: 'Tesla, Inc.',
    pricePerShare: '0.04',
    availableShares: 1200,
  },
  {
    symbol: 'AMZN',
    name: 'Amazon.com, Inc.',
    pricePerShare: '0.07',
    availableShares: 600,
  },
];
