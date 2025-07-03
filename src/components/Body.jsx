import React from 'react';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';

function Body() {
  return (
    <div className="mt-auto">
    <Navbar/>

    {/*outlet says any children route of the body will render here */}
    <Outlet />

    <Footer/>
    </div>
  );
}

export default Body;