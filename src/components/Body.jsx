import React from 'react';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';

function Body() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-pink-50 via-yellow-50 to-white">
      <Navbar />
      {/* Main content area: scrollable and centered */}
      <div className="flex-1 flex items-center justify-center pt-24 pb-40 px-2">
        <div className="w-full max-w-2xl">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Body;