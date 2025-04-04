// components/crypto/CryptoList.js
import React from 'react';
import CryptoCard from './CryptoCard';

const CryptoList = ({ cryptos, favoriteCryptos, realTimeUpdates }) => {
  if (!cryptos || cryptos.length === 0) {
    return <div className="text-center py-6">No cryptocurrency data available</div>;
  }
  
  // Filter out favorites if any
  const favorites = cryptos.filter(crypto => favoriteCryptos && favoriteCryptos.includes(crypto.id));
  const nonFavorites = cryptos.filter(crypto => !favoriteCryptos || !favoriteCryptos.includes(crypto.id));
  
  return (
    <div>
      {favorites.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Favorites</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {favorites.map(crypto => (
              <CryptoCard 
                key={crypto.id} 
                crypto={crypto} 
                isUpdated={realTimeUpdates?.some(update => update.id === crypto.id)}
              />
            ))}
          </div>
        </div>
      )}
      
      <div>
        {favorites.length > 0 && <h3 className="text-lg font-semibold mb-3">All Cryptocurrencies</h3>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {nonFavorites.map(crypto => (
            <CryptoCard 
              key={crypto.id} 
              crypto={crypto} 
              isUpdated={realTimeUpdates?.some(update => update.id === crypto.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CryptoList;