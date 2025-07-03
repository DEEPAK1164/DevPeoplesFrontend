import React, { useRef, useState } from 'react';

function Navbar() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  // Hide dropdown when mouse leaves the dropdown box
  const handleMenuMouseLeave = () => setOpen(false);

  return (
    <nav className="w-full bg-gradient-to-r from-pink-500 via-red-400 to-yellow-400 shadow flex items-center justify-between px-4 py-3 fixed top-0 left-0 z-50">
      {/* App Name */}
      <div className="text-white text-2xl font-bold drop-shadow">DevPeoples</div>
      {/* User Dropdown */}
      <div className="relative">
        <button
          className="p-2 rounded-full hover:bg-white/20 transition text-white text-2xl cursor-pointer flex items-center select-none"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="User menu"
        >
          👤
        </button>
        {open && (
          <div
            ref={menuRef}
            className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
            onMouseLeave={handleMenuMouseLeave}
            onMouseEnter={() => setOpen(true)}
          >
            <ul className="py-2">
              <li>
                <a
                  href="/profile"
                  className="block px-4 py-2 text-gray-700 hover:bg-pink-50 rounded transition"
                >
                  Profile
                </a>
              </li>
              <li>
                <a
                  href="/requests"
                  className="block px-4 py-2 text-gray-700 hover:bg-pink-50 rounded transition"
                >
                  Requests
                </a>
              </li>
              <li>
                <a
                  href="/connections"
                  className="block px-4 py-2 text-gray-700 hover:bg-pink-50 rounded transition"
                >
                  Connections
                </a>
              </li>
              <li>
                <button
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-pink-50 rounded transition"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;