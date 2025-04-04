// store/middleware/websocketMiddleware.js
import { updateCryptoPrice } from '../slices/cryptoSlice';
import { simulateWeatherAlert } from '../slices/weatherSlice';

// Map to track active WebSocket connections
const activeConnections = {};

const websocketMiddleware = store => next => action => {
  if (action.type === 'websocket/connect') {
    // CoinCap WebSocket for crypto updates
    const coinCapWS = new WebSocket('wss://ws.coincap.io/prices?assets=bitcoin,ethereum,litecoin');
    
    coinCapWS.onopen = () => {
      console.log('WebSocket connected to CoinCap');
    };
    
    coinCapWS.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      // Update Redux store with new prices
      Object.keys(data).forEach(asset => {
        const currentState = store.getState().crypto;
        const assetId = asset; // e.g., 'bitcoin'
        
        // Find the asset in our store to get its current data
        const assetData = currentState.byId[assetId] || 
                         currentState.list.find(c => c.id === assetId);
        
        if (assetData) {
          const newPrice = data[asset];
          const oldPrice = parseFloat(assetData.priceUsd);
          const percentChange = ((newPrice - oldPrice) / oldPrice) * 100;
          
          // Only dispatch action if there's a significant change
          const significantChange = Math.abs(percentChange) > 0.1;
          
          if (significantChange) {
            store.dispatch(updateCryptoPrice({
              id: assetId,
              price: newPrice,
              changePercent24Hr: assetData.changePercent24Hr, // Maintain existing 24h change
              type: 'price_alert'
            }));
            
            // Show notification for significant changes
            if (Math.abs(percentChange) > 1) {
              store.dispatch({
                type: 'notification/show',
                payload: {
                  type: 'price_alert',
                  message: `${assetId.charAt(0).toUpperCase() + assetId.slice(1)} price ${percentChange > 0 ? 'up' : 'down'} by ${Math.abs(percentChange).toFixed(2)}%`,
                  price: newPrice
                }
              });
            }
          }
        }
      });
    };
    
    coinCapWS.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
    
    coinCapWS.onclose = () => {
      console.log('WebSocket disconnected from CoinCap');
    };
    
    // Store the connection
    activeConnections.coinCap = coinCapWS;
    
    // Simulate weather alerts
    const weatherAlertInterval = setInterval(() => {
      const cities = ['New York', 'London', 'Tokyo'];
      const alerts = [
        'Heavy rain expected in the next 24 hours',
        'Temperature will drop significantly',
        'Strong winds alert',
        'High UV index warning',
        'Air quality warning'
      ];
      
      const randomCity = cities[Math.floor(Math.random() * cities.length)];
      const randomAlert = alerts[Math.floor(Math.random() * alerts.length)];
      
      store.dispatch(simulateWeatherAlert({
        city: randomCity,
        message: randomAlert,
        type: 'weather_alert',
        timestamp: new Date().toISOString()
      }));
      
      store.dispatch({
        type: 'notification/show',
        payload: {
          type: 'weather_alert',
          message: `${randomCity}: ${randomAlert}`,
        }
      });
    }, 60000); // Simulate an alert every minute
    
    // Store the interval
    activeConnections.weatherAlertInterval = weatherAlertInterval;
  }
  
  if (action.type === 'websocket/disconnect') {
    // Clean up WebSocket connections
    if (activeConnections.coinCap) {
      activeConnections.coinCap.close();
    }
    
    if (activeConnections.weatherAlertInterval) {
      clearInterval(activeConnections.weatherAlertInterval);
    }
    
    // Clear the connections map
    Object.keys(activeConnections).forEach(key => {
      delete activeConnections[key];
    });
  }
  
  return next(action);
};

export default websocketMiddleware;