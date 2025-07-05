import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { addFeed } from '../utils/feedSlice';
import UserCard from './UserCard';

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    try {
      const res = await axios.get("http://localhost:7777/feed", {
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
    if (!feed) {
      getFeed();
    }
  }, [feed]);

  return (
    feed && (
      <div className="min-h-screen  flex items-center justify-center p-4">
        <UserCard user={feed[0]} />
      </div>
    )
  );
};

export default Feed;
