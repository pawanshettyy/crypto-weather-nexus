// lib/websocket/cryptoWebSocket.js
let socket = null;
let priceCallback = null;

export const connectWebSocket = (onPriceUpdate) => {
  // Store the callback
  priceCallback = onPriceUpdate;
  
  // Create WebSocket connection
  socket = new WebSocket('wss://ws.coincap.io/prices?assets=bitcoin,ethereum,litecoin');
  
  socket.onopen = () => {
    console.log('WebSocket connected');
  };
  
  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    
    if (priceCallback) {
      priceCallback(data);
    }
  };
  
  socket.onerror = (error) => {
    console.error('WebSocket error:', error);
  };
  
  socket.onclose = () => {
    console.log('WebSocket disconnected');
  };
  
  return socket;
};

export const disconnectWebSocket = () => {
  if (socket) {
    socket.close();
    socket = null;
    priceCallback = null;
  }
};