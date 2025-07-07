import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [pwd, setPassword] = useState("");
  const [eml, setEmailId] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:7777/login", {
        emailId: eml,
        password: pwd
      }, {
        withCredentials: true // Allow cookies
      });

      dispatch(addUser(res.data)); // Store user in Redux
      navigate("/"); // Redirect to home
    } catch (err) {
      console.error("Login failed:", err);
      if (err.response?.data) {
        setError(err.response.data);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm border border-pink-100">
        <h2 className="text-2xl font-extrabold text-pink-500 mb-6 text-center tracking-wide">
          {isLogin ? 'Login to DevPeoples' : 'Sign Up for DevPeoples'}
        </h2>

        <form onSubmit={e => { e.preventDefault(); handleLogin(); }}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2 font-semibold" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={eml}
              onChange={(e) => {
                setEmailId(e.target.value);
                setError("");
              }}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="Enter your email"
              autoComplete="username"
            />
          </div>

          {!isLogin && (
            <div className="mb-4">
              <label className="block text-gray-700 mb-2 font-semibold" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                type="text"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
                placeholder="Enter your name"
                autoComplete="name"
              />
            </div>
            
          )}

          <div className="mb-6">
            <label className="block text-gray-700 mb-2 font-semibold" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={pwd}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="Enter your password"
              autoComplete={isLogin ? "current-password" : "new-password"}
            />
          </div>

          {/* ✅ Error Message for both modes */}
          {error && (
            <div className="mb-4 text-red-500 text-sm font-medium text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-pink-500 text-white py-2 rounded hover:bg-pink-600 transition font-semibold"
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-600">
          {isLogin ? (
            <>
              Don't have an account?{' '}
              <button
                className="text-pink-500 hover:underline font-semibold"
                onClick={() => {
                  setIsLogin(false);
                  setError("");
                }}
              >
                Sign Up
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button
                className="text-pink-500 hover:underline font-semibold"
                onClick={() => {
                  setIsLogin(true);
                  setError("");
                }}
              >
                Login
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
