// app/page.js
'use client';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeatherByCity } from '../store/slices/weatherSlice';
import { fetchCryptos } from '../store/slices/cryptoSlice';
import { fetchCryptoNews } from '../store/slices/newsSlice';
import WeatherList from '../components/weather/WeatherList';
import CryptoList from '../components/crypto/CryptoList';
import NewsList from '../components/news/NewsList';
import Loading from '../components/common/Loading';

export default function Home() {
  const dispatch = useDispatch();
  const weather = useSelector((state) => state.weather);
  const crypto = useSelector((state) => state.crypto);
  const news = useSelector((state) => state.news);
  const userPreferences = useSelector((state) => state.userPreferences);

  useEffect(() => {
    // Fetch initial data
    weather.cities.forEach(city => {
      dispatch(fetchWeatherByCity(city));
    });
    dispatch(fetchCryptos());
    dispatch(fetchCryptoNews());

    // Set up periodic refresh every 60 seconds
    const intervalId = setInterval(() => {
      weather.cities.forEach(city => {
        dispatch(fetchWeatherByCity(city));
      });
      dispatch(fetchCryptos());
      dispatch(fetchCryptoNews());
    }, 60000);

    return () => clearInterval(intervalId);
  }, [dispatch, weather.cities]);

  const isLoading = weather.loading || crypto.loading || news.loading;

  if (isLoading && (!weather.data || Object.keys(weather.data).length === 0) && 
      (!crypto.list || crypto.list.length === 0) && 
      (!news.articles || news.articles.length === 0)) {
    return <Loading />;
  }

  return (
    <div className="grid grid-cols-1 gap-8">
      <section className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">Weather Dashboard</h2>
        <WeatherList 
          cities={weather.cities} 
          weatherData={weather.data} 
          favoriteCities={userPreferences.favoriteCities} 
        />
      </section>

      <section className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">Cryptocurrency Dashboard</h2>
        <CryptoList 
          cryptos={crypto.list.slice(0, 5)} 
          favoriteCryptos={userPreferences.favoriteCryptos}
          realTimeUpdates={crypto.realTimeUpdates}
        />
      </section>

      <section className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">Latest Crypto News</h2>
        <NewsList articles={news.articles} />
      </section>
    </div>
  );
}