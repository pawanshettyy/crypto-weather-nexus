// components/crypto/CryptoChart.js
import React from 'react';

const CryptoChart = ({ historyData, cryptoName }) => {
  if (!historyData || historyData.length === 0) {
    return <div className="text-center py-6">No historical data available</div>;
  }
  
  // Format the history data for display in a table and potentially for charting
  const formattedData = historyData.map(item => ({
    date: new Date(item.time).toLocaleDateString(),
    priceUsd: parseFloat(item.priceUsd).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 6
    })
  }));
  
  // For a simple display, show in a table
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-xl font-semibold mb-4">{cryptoName} Historical Prices</h3>
      
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-3 text-left">Date</th>
              <th className="py-2 px-3 text-right">Price (USD)</th>
            </tr>
          </thead>
          <tbody>
            {formattedData.map((item, index) => (
              <tr key={index} className="border-b border-gray-200">
                <td className="py-2 px-3">{item.date}</td>
                <td className="py-2 px-3 text-right">{item.priceUsd}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CryptoChart;
