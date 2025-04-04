// components/common/Notification.js
import React from 'react';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

// This component doesn't render anything directly but manages notifications
const Notification = () => {
  const showNotification = (type, message) => {
    const notificationStyle = {
      background: type === 'price_alert' ? '#3b82f6' : '#10b981',
      color: 'white',
    };
    
    toast(message, {
      duration: 4000,
      position: 'top-right',
      style: notificationStyle,
      icon: type === 'price_alert' ? '💰' : '🌦️',
    });
  };
  
  // Listen for notification events from the Redux store
  React.useEffect(() => {
    const handleNotification = e => {
      if (e.type === 'notification/show') {
        showNotification(e.payload.type, e.payload.message);
      }
    };
    
    // Subscribe to Redux store changes
    const unsubscribe = store.subscribe(() => {
      const action = store.getState().lastAction;
      if (action && action.type === 'notification/show') {
        showNotification(action.payload.type, action.payload.message);
      }
    });
    
    return () => unsubscribe();
  }, []);
  
  return null; // This component doesn't render any UI elements
};

export default Notification;