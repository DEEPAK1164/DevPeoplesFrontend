import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constant';

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [pwd, setPassword] = useState("");
  const [eml, setEmailId] = useState("");
  const [error, setError] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL+"/login",
        { emailId: eml, password: pwd },
        { withCredentials: true }
      );

      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      console.error("Login failed:", err);
      setError(err.response?.data || "Something went wrong. Please try again.");
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL+"/signup",
        { firstName, lastName, emailId: eml, password: pwd },
        { withCredentials: true }
      );

      dispatch(addUser(res.data));
      navigate("/profile");
    } catch (err) {
      console.error("Signup failed:", err);
      setError(err.response?.data || "Something went wrong. Please try again.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (isLogin) {
      handleLogin();
    } else {
      handleSignUp();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm border border-pink-100">
        <h2 className="text-2xl font-extrabold text-pink-500 mb-6 text-center tracking-wide">
          {isLogin ? 'Login to DevPeoples' : 'Sign Up for DevPeoples'}
        </h2>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="mb-4">
              <label className="block text-gray-700 mb-2 font-semibold" htmlFor="firstName">
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
                placeholder="Enter your first name"
                autoComplete="given-name"
              />

              <label className="block text-gray-700 mt-4 mb-2 font-semibold" htmlFor="lastName">
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
                placeholder="Enter your last name"
                autoComplete="family-name"
              />
            </div>
          )}

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
