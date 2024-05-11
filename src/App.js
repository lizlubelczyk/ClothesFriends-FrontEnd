import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import BrowserRouter

import Login from './Components/Login-Signup/Login.jsx';
import Signup from './Components/Login-Signup/Signup.jsx';
import MyFeed from './Components/Feed/Myfeed.jsx';
import Profile from './Components/Profile/Profile.jsx';
import Edit from './Components/Profile/Edit.jsx';
import Uploads from './Components/Profile/Uploads.jsx';
import UploadCLothingItem from './Components/Profile/UploadClothingItem.jsx';
import MyItems from './Components/Profile/MyItems.jsx'; 
import MyTops from './Components/Profile/MyTops.jsx';
import MyBottoms from './Components/Profile/MyBottoms.jsx';
import MyAccesories from './Components/Profile/MyAccesories.jsx';

function App() {
  return (
    <Router> {/* Use BrowserRouter */}
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/Signup' element={<Signup />} />
        <Route path='/Myfeed' element={<MyFeed />} />
        <Route path='/Profile' element={<Profile />} />
        <Route path='/Edit' element={<Edit />} />
        <Route path='/Uploads' element={<Uploads />} />
        <Route path='/UploadClothingItem' element={<UploadCLothingItem />} />
        <Route path='/MyItems' element={<MyItems />} />
        <Route path='/MyTops' element={<MyTops />} />
        <Route path='/MyBottoms' element={<MyBottoms/>}/>
        <Route path='/MyAccesories' element={<MyAccesories/>}/>
      </Routes>
    </Router>
  );
}

export default App;