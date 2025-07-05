import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Body from './components/Body';
import Login from './components/Login'; // Assuming you have a Login component
import Profile from './components/Profile';
import {Provider} from 'react-redux';
import appStore from './utils/appStore'; // Import your Redux store
function App() {
  return (
    <>
    <Provider store={appStore}>
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
     </Provider>
     </>
  );
}

export default App;
