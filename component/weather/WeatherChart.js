// components/weather/WeatherChart.js
import React from 'react';

const WeatherChart = ({ historyData, city }) => {
  if (!historyData || !historyData.list || historyData.list.length === 0) {
    return <div className="text-center py-6">No historical data available for {city}</div>;
  }
  
  // Format the history data for display in a table
  const formattedData = historyData.list.map(item => ({
    date: new Date(item.dt * 1000).toLocaleDateString(),
    time: new Date(item.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    temp: Math.round(item.main.temp),
    description: item.weather[0].description,
    humidity: item.main.humidity,
    wind: item.wind.speed
  }));
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-xl font-semibold mb-4">{city} Weather Forecast</h3>
      
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-3 text-left">Date</th>
              <th className="py-2 px-3 text-left">Time</th>
              <th className="py-2 px-3 text-right">Temp (°C)</th>
              <th className="py-2 px-3 text-left">Condition</th>
              <th className="py-2 px-3 text-right">Humidity (%)</th>
              <th className="py-2 px-3 text-right">Wind (m/s)</th>
            </tr>
          </thead>
          <tbody>
            {formattedData.map((item, index) => (
              <tr key={index} className="border-b border-gray-200">
                <td className="py-2 px-3">{item.date}</td>
                <td className="py-2 px-3">{item.time}</td>
                <td className="py-2 px-3 text-right">{item.temp}°</td>
                <td className="py-2 px-3 capitalize">{item.description}</td>
                <td className="py-2 px-3 text-right">{item.humidity}</td>
                <td className="py-2 px-3 text-right">{item.wind}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WeatherChart;