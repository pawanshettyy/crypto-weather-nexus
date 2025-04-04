// components/common/Header.js
import Link from 'next/link';
import React from 'react';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-md">
      <div className="container mx-auto py-6 px-4">
        <nav className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold hover:text-blue-200 transition">
              CryptoWeather Nexus
            </Link>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link href="/" className="hover:text-blue-200 transition font-medium">
              Dashboard
            </Link>
            <Link href="/weather" className="hover:text-blue-200 transition font-medium">
              Weather
            </Link>
            <Link href="/crypto" className="hover:text-blue-200 transition font-medium">
              Cryptocurrency
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;