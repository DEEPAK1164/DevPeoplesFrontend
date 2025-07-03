import React from 'react';

function Footer() {
  return (
    <footer className="w-full bg-gradient-to-r from-pink-500 via-red-400 to-yellow-400 text-white shadow-inner">
      <div className="max-w-4xl mx-auto px-4 py-8 flex flex-col gap-6">
        {/* Dummy Review Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="User"
              className="w-14 h-14 rounded-full border-2 border-white shadow"
            />
            <div>
              <p className="font-semibold text-lg">John Doe</p>
              <p className="text-sm text-yellow-100">"DevPeoples helped me find my dream dev team! 💖"</p>
            </div>
          </div>
          <div className="flex gap-3 text-2xl">
            <a href="#" className="hover:text-yellow-300 transition">🐦</a>
            <a href="#" className="hover:text-yellow-300 transition">💼</a>
            <a href="#" className="hover:text-yellow-300 transition">📸</a>
          </div>
        </div>
        {/* Divider */}
        <div className="border-t border-pink-200 opacity-50"></div>
        {/* Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-sm">
          <div>
            &copy; {new Date().getFullYear()} DevPeoples. All rights reserved.
          </div>
          <div className="flex gap-4">
            <a href="/about" className="hover:underline">About</a>
            <a href="/privacy" className="hover:underline">Privacy</a>
            <a href="/terms" className="hover:underline">Terms</a>
            <a href="/contact" className="hover:underline">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;