import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Body from './components/Body';
import Login from './components/Login'; // Assuming you have a Login component
import Profile from './components/Profile';
import {Provider} from 'react-redux';
import appStore from './utils/appStore'; // Import your Redux store
import Feed from './components/Feed'; // Import the Feed component
import Connections from './components/Connections';
import Requests from './components/Requests';
import Chat from './components/Chat';

function App() {
  return (
    <>
    <Provider store={appStore}>
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Body/>}>
        {/* children routes */}
     {/* login */}
       <Route path="/" element={<Feed/>}></Route>
          <Route path="/login" element={<Login/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/connections" element={<Connections/>} />
          <Route path="/requests" element={<Requests/>} />
          <Route path='/chat/:toUserId' element={<Chat/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
     </Provider>
     </>
  );
}
export default App;
