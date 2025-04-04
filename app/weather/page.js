// app/weather/page.js
'use client';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeatherByCity } from '../../store/slices/weatherSlice';
import WeatherList from '../../components/weather/WeatherList';
import Loading from '../../components/common/Loading';

export default function WeatherPage() {
  const dispatch = useDispatch();
  const weather = useSelector((state) => state.weather);
  const userPreferences = useSelector((state) => state.userPreferences);
  
  useEffect(() => {
    // Fetch weather data for each city
    weather.cities.forEach(city => {
      dispatch(fetchWeatherByCity(city));
    });
    
    // Refresh every 60 seconds
    const intervalId = setInterval(() => {
      weather.cities.forEach(city => {
        dispatch(fetchWeatherByCity(city));
      });
    }, 60000);
    
    return () => clearInterval(intervalId);
  }, [dispatch, weather.cities]);
  
  if (weather.loading && !Object.keys(weather.data).length) {
    return <Loading />;
  }
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Weather Dashboard</h1>
      <WeatherList 
        cities={weather.cities} 
        weatherData={weather.data} 
        favoriteCities={userPreferences.favoriteCities} 
      />
    </div>
  );
}