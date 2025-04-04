// components/weather/WeatherCard.js
import React from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavoriteCity } from '../../store/slices/userPreferencesSlice';

const WeatherCard = ({ city, weatherData }) => {
  const dispatch = useDispatch();
  const favoriteCities = useSelector(state => state.userPreferences.favoriteCities);
  const isFavorite = favoriteCities.includes(city);
  
  const handleToggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleFavoriteCity(city));
  };
  
  if (!weatherData) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4 min-h-40 flex items-center justify-center">
        <p>Loading {city} weather data...</p>
      </div>
    );
  }
  
  // Extract relevant weather information
  const { main, weather, wind } = weatherData;
  const temperature = Math.round(main.temp);
  const weatherIconCode = weather[0].icon;
  const weatherDescription = weather[0].description;
  const iconUrl = `https://openweathermap.org/img/wn/${weatherIconCode}@2x.png`;
  
  return (
    <Link href={`/weather/${encodeURIComponent(city)}`} className="block">
      <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold">{city}</h3>
          <button 
            onClick={handleToggleFavorite}
            className="text-xl focus:outline-none"
          >
            {isFavorite ? '★' : '☆'}
          </button>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img src={iconUrl} alt={weatherDescription} className="w-16 h-16" />
            <div className="ml-2">
              <div className="text-3xl font-bold">{temperature}°C</div>
              <div className="text-gray-600 capitalize">{weatherDescription}</div>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-sm text-gray-600">Humidity: {main.humidity}%</div>
            <div className="text-sm text-gray-600">Wind: {wind.speed} m/s</div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default WeatherCard;