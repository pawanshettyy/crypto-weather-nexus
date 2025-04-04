// components/crypto/CryptoCard.js
import React from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavoriteCrypto } from '../../store/slices/userPreferencesSlice';

const CryptoCard = ({ crypto }) => {
  const dispatch = useDispatch();
  const favoriteCryptos = useSelector(state => state.userPreferences.favoriteCryptos);
  const isFavorite = favoriteCryptos.includes(crypto.id);
  
  const handleToggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleFavoriteCrypto(crypto.id));
  };
  
  // Format price and market cap
  const formatPrice = (price) => {
    return parseFloat(price).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 8
    });
  };
  
  const formatMarketCap = (marketCap) => {
    return parseFloat(marketCap).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    });
  };
  
  // Format percentage change
  const formatPercentChange = (change) => {
    const numChange = parseFloat(change);
    return numChange.toFixed(2);
  };
  
  // Determine if price is up or down
  const priceChangeClass = parseFloat(crypto.changePercent24Hr) >= 0 
    ? 'text-green-600' 
    : 'text-red-600';
  
  return (
    <Link href={`/crypto/${crypto.id}`} className="block">
      <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold">{crypto.name} ({crypto.symbol})</h3>
          <button 
            onClick={handleToggleFavorite}
            className="text-xl focus:outline-none"
          >
            {isFavorite ? '★' : '☆'}
          </button>
        </div>
        
        <div className="text-2xl font-bold mb-2">
          {formatPrice(crypto.priceUsd)}
        </div>
        
        <div className="flex justify-between items-center text-sm">
          <div className={`${priceChangeClass} font-medium`}>
            {formatPercentChange(crypto.changePercent24Hr)}%
            <span className="ml-1">
              {parseFloat(crypto.changePercent24Hr) >= 0 ? '↑' : '↓'}
            </span>
          </div>
          <div className="text-gray-600">
            Mkt Cap: {formatMarketCap(crypto.marketCapUsd)}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CryptoCard;