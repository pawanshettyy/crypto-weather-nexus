// app/crypto/page.js
'use client';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCryptos } from '../../store/slices/cryptoSlice';
import CryptoList from '../../components/crypto/CryptoList';
import Loading from '../../components/common/Loading';

export default function CryptoPage() {
  const dispatch = useDispatch();
  const crypto = useSelector((state) => state.crypto);
  const userPreferences = useSelector((state) => state.userPreferences);
  
  useEffect(() => {
    dispatch(fetchCryptos());
    
    // Refresh every 60 seconds
    const intervalId = setInterval(() => {
      dispatch(fetchCryptos());
    }, 60000);
    
    return () => clearInterval(intervalId);
  }, [dispatch]);
  
  if (crypto.loading && (!crypto.list || crypto.list.length === 0)) {
    return <Loading />;
  }
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Cryptocurrency Dashboard</h1>
      <CryptoList 
        cryptos={crypto.list} 
        favoriteCryptos={userPreferences.favoriteCryptos}
        realTimeUpdates={crypto.realTimeUpdates}
      />
    </div>
  );
}