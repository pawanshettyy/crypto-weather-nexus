// app/crypto/[id]/page.js
'use client';
import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCryptoDetails, fetchCryptoHistory } from '../../../store/slices/cryptoSlice';
import CryptoCard from '../../../components/crypto/CryptoCard';
import CryptoChart from '../../../components/crypto/CryptoChart';
import Loading from '../../../components/common/Loading';

export default function CryptoDetailPage() {
  const params = useParams();
  const cryptoId = params.id;
  const dispatch = useDispatch();
  const cryptoData = useSelector((state) => state.crypto.byId[cryptoId]);
  const historyData = useSelector((state) => state.crypto.history[cryptoId]);
  const loading = useSelector((state) => state.crypto.loading);
  
  useEffect(() => {
    if (cryptoId) {
      dispatch(fetchCryptoDetails(cryptoId));
      dispatch(fetchCryptoHistory(cryptoId));
    }
  }, [dispatch, cryptoId]);
  
  if (loading && (!cryptoData || !historyData)) {
    return <Loading />;
  }
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">{cryptoData?.name} ({cryptoData?.symbol})</h1>
      
      {cryptoData && (
        <div className="mb-8">
          <CryptoCard crypto={cryptoData} />
        </div>
      )}