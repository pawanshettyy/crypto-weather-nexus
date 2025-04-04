// app/layout.js
'use client';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import './globals.css';
import { store } from '../store/store';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { useEffect } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  useEffect(() => {
    // Connect to WebSockets when the app loads
    store.dispatch({ type: 'websocket/connect' });
    
    // Clean up WebSockets when the app unmounts
    return () => {
      store.dispatch({ type: 'websocket/disconnect' });
    };
  }, []);

  return (
    <html lang="en">
      <head>
        <title>CryptoWeather Nexus</title>
        <meta name="description" content="A dashboard for cryptocurrency and weather information" />
      </head>
      <body className={inter.className}>
        <Provider store={store}>
          <Toaster position="top-right" />
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8">
              {children}
            </main>
            <Footer />
          </div>
        </Provider>
      </body>
    </html>
  );
}