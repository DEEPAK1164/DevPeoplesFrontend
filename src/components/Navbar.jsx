import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useNavigation } from 'react-router-dom';
// Importing useSelector to access Redux state if needed
// If you need to access user data or any other state from Redux, you can use this
// import { useSelector } from 'react-redux';
import { logoutUser } from '../utils/userSlice'; // adjust path if needed
import { useDispatch } from 'react-redux';
import { BASE_URL } from '../utils/constant';


function Navbar() {
  const navigate=useNavigate();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const res = useSelector((store) => store.user); // Accessing user data from Redux store
  // console.log("User data from Redux:", res);
  // Hide dropdown when mouse leaves the dropdown box
  const handleMenuMouseLeave = () => setOpen(false);
  
const dispatch = useDispatch();

const handleLogout = async () => {
  try {
    await axios.post(BASE_URL+"/logout", {}, { withCredentials: true });
    dispatch(logoutUser()); // ✅ clears user from Redux
    setOpen(false);         // close dropdown if open
    navigate("/login");
  } catch (err) {
    console.error("Logout failed:", err);
  }
};
  return (
    <nav className="w-full bg-gradient-to-r from-pink-500 via-red-400 to-yellow-400 shadow-lg flex items-center justify-between px-6 py-4 fixed top-0 left-0 z-50">
      {/* App Name */}
           <div className="flex items-center gap-2">
        <Link to="/" className="text-white text-3xl font-extrabold drop-shadow tracking-wide font-sans flex items-center gap-2">
          <span className="inline-block animate-bounce">🔥</span> DevPeoples
        </Link>
      </div>
      {/* User Dropdown */}
      <div className="relative">
       
<div className="relative flex items-center gap-3">
  {res?.data?.firstName && (
    <span className="text-white font-semibold text-lg hidden sm:inline-block">
      Welcome, {res.data.firstName}
    </span>
  )}

  <button
    className="p-1 rounded-full hover:bg-white/20 transition cursor-pointer flex items-center select-none"
    onClick={() => setOpen((prev) => !prev)}
    aria-label="User menu"
  >
    {res?.data?.photoUrl && (
      <img
        src={res.data.photoUrl}
        alt={res.data.firstName || "User"}
        className="w-10 h-10 rounded-full border-2 border-white shadow object-cover"
      />
    )}
  </button>
</div>

        {open && (
          <div
            ref={menuRef}
            className="absolute right-0 mt-3 w-56 bg-white border border-pink-100 rounded-xl shadow-2xl z-50"
            onMouseLeave={handleMenuMouseLeave}
            onMouseEnter={() => setOpen(true)}
          >
            <ul className="py-2">
              <li>
                <Link
                  to="/profile"
                  className="block px-5 py-3 text-gray-700 font-semibold hover:bg-pink-50 rounded-xl transition"
                >
                  Profile
                </Link>
              </li>
              <li>
                <a
                  href="/requests"
                  className="block px-5 py-3 text-gray-700 font-semibold hover:bg-pink-50 rounded-xl transition"
                >
                  Requests
                </a>
              </li>
              <li>
                <Link
                  to="/connections"
                  className="block px-5 py-3 text-gray-700 font-semibold hover:bg-pink-50 rounded-xl transition"
                >
                  Connections
                </Link>
              </li>
              <li>
                <button onClick={handleLogout}
                  className="w-full text-left px-5 py-3 text-gray-700 font-semibold hover:bg-pink-50 rounded-xl transition"
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