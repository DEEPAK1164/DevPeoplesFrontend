import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Body from './components/Body';
import Login from './components/Login'; // Assuming you have a Login component
import Profile from './components/Profile';
function App() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Body/>}>
        {/* children routes */}
     {/* login */}
          <Route path="/login" element={<Login/>} />
          <Route path="/profile" element={<Profile/>} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
