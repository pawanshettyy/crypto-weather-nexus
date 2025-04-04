// app/weather/[city]/page.js
'use client';
import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeatherByCity, fetchWeatherHistory } from '../../../store/slices/weatherSlice';
import WeatherCard from '../../../components/weather/WeatherCard';
import WeatherChart from '../../../components/weather/WeatherChart';
import Loading from '../../../components/common/Loading';

export default function CityDetailPage() {
  const params = useParams();
  const city = decodeURIComponent(params.city);
  const dispatch = useDispatch();
  const weatherData = useSelector((state) => state.weather.data[city]);
  const historyData = useSelector((state) => state.weather.history[city]);
  const loading = useSelector((state) => state.weather.loading);
  
  useEffect(() => {
    if (city) {
      dispatch(fetchWeatherByCity(city));
      dispatch(fetchWeatherHistory(city));
    }
  }, [dispatch, city]);
  
  if (loading && (!weatherData || !historyData)) {
    return <Loading />;
  }
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">{city} Weather</h1>
      
      <div className="mb-8">
        <WeatherCard city={city} weatherData={weatherData} />
      </div>
      
      <div>
        <h2 className="text-2xl font-semibold mb-4">Forecast & History</h2>
        <WeatherChart historyData={historyData} city={city} />
      </div>
    </div>
  );
}