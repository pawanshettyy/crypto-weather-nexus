// components/weather/WeatherList.js
import React from 'react';
import WeatherCard from './WeatherCard';

const WeatherList = ({ cities, weatherData, favoriteCities }) => {
  if (!cities || cities.length === 0) {
    return <div className="text-center py-6">No cities configured</div>;
  }
  
  // Filter out favorites if any
  const favorites = cities.filter(city => favoriteCities && favoriteCities.includes(city));
  const nonFavorites = cities.filter(city => !favoriteCities || !favoriteCities.includes(city));
  
  return (
    <div>
      {favorites.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Favorite Cities</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {favorites.map(city => (
              <WeatherCard key={city} city={city} weatherData={weatherData[city]} />
            ))}
          </div>
        </div>
      )}
      
      <div>
        {favorites.length > 0 && <h3 className="text-lg font-semibold mb-3">All Cities</h3>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {nonFavorites.map(city => (
            <WeatherCard key={city} city={city} weatherData={weatherData[city]} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherList;