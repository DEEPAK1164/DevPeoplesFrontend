import React, { useEffect } from 'react';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constant';
function Body() {

const dispatch = useDispatch();
const navigate = useNavigate();
const userData=useSelector((store)=>store.user);
console.log(userData)
// explain below code ?
// fetchUser is an asynchronous function that fetches user data from the server.
// It uses axios to make a GET request to the specified URL.
// If the request is successful, it dispatches the user data to the Redux store.
// If the request fails with a 401 status, it redirects the user to the login page
// and logs the error to the console.
// The useEffect hook is used to call fetchUser when the component mounts, ensuring that user data is fetched when the component is rendered.


const fetchUser = async () => {

    if(userData)
    {
    return; // why? if user data present in store dont call api
    }

  try {
    const res=await axios.get(BASE_URL+"/profile/view",{withCredentials: true});
    dispatch(addUser(res.data));
  }catch (err) {
    if(err.status === 401) {
      // User is not authenticated, redirect to login
      navigate("/login");
    }
    else{
    console.error("Something went wrong");
    }
  }
}

useEffect(()=>{
 fetchUser();
},[])

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