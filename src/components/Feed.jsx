import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { addFeed } from '../utils/feedSlice';
import UserCard from './UserCard';
import { BASE_URL } from '../utils/constant';

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    try {
      const res = await axios.get(BASE_URL+"/feed", {
        withCredentials: true
      });
      console.log(res.data);
      dispatch(addFeed(res.data));
    } catch (err) {
      const message = err?.response?.data?.message || "Failed to fetch feed.";
      console.warn("Feed fetch error:", message);
    }
  };

useEffect(() => {
  getFeed();
}, []);


  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      {!feed ? (
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-pink-500 mb-4"></div>
          <p className="text-gray-500 text-center">Loading feed...</p>
        </div>
      ) : feed.length === 0 ? (
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-600 mb-2">
            No Feed Available!
          </h2>
          <p className="text-gray-500">Please check back later.</p>
        </div>
      ) : (
        <div className="max-w-lg w-full">
          <UserCard user={feed[0]} />
        </div>
      )}
    </div>
  );
};

export default Feed;
