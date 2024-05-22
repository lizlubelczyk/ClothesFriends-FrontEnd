import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import BrowserRouter

import Login from './Components/Login-Signup/Login.jsx';
import Signup from './Components/Login-Signup/Signup.jsx';
import MyFeed from './Components/Feed/Myfeed.jsx';
import Profile from './Components/Profile/Profile.jsx';
import Edit from './Components/Profile/Edit.jsx';
import Uploads from './Components/Profile/Uploads/Uploads.jsx';
import UploadCLothingItem from './Components/Profile/Uploads/UploadClothingItem.jsx';
import MyItems from './Components/Profile/ClothingItem//MyItems.jsx'; 
import MyTops from './Components/Profile/ClothingItem/MyTops.jsx';
import MyBottoms from './Components/Profile/ClothingItem/MyBottoms.jsx';
import MyAccesories from './Components/Profile/ClothingItem/MyAccesories.jsx';
import UploadInspiration from './Components/Profile/Uploads/UploadInspiration.jsx'; 
import MyTopsSubcategory from './Components/Profile/ClothingItem/MyTopsSubcategory.jsx';
import MyClothingItemDetails from './Components/Profile/ClothingItem/MyClothingItemDetails.jsx';
import UploadOutfit from './Components/Profile/Uploads/UploadOutfit.jsx';
import MyInspirations from './Components/Profile/MyInspirations.jsx';
import MyCurrentOutfit from './Components/Profile/MyCurrentOutfit.jsx';
import MyInspirationDetails from './Components/Profile/MyInspirationDetails.jsx';
import InspoPage from './Components/Inspo/InspoPage.jsx';
import OtherUserProfile from './Components/OtherUser/OtherUserProfile.jsx';
import OtherItems from './Components/OtherUser/OtherItems.jsx';
import OtherTops from './Components/OtherUser/OtherTops.jsx';
import OtherAccesories from './Components/OtherUser/OtherAccesories.jsx';
import OtherBottoms from './Components/OtherUser/OtherBottoms.jsx';
import OtherSubcategory from './Components/OtherUser/OtherSubcategory.jsx';
import OtherInspirations from './Components/OtherUser/OtherInspirations.jsx';
import OtherCurrentOutfit from './Components/OtherUser/OtherCurrentOutfit.jsx';
import MyFriends from './Components/Profile/MyFriends.jsx';
import OtherFriends from './Components/OtherUser/OtherFriends.jsx';

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
        <Route path='/UploadInspiration' element={<UploadInspiration/>} />
        <Route path='/MyTopsSubcategory' element={<MyTopsSubcategory/>} />
        <Route path='/MyClothingItemDetails' element={<MyClothingItemDetails/>} />
        <Route path='/UploadOutfit' element={<UploadOutfit/>} />
        <Route path='/MyInspirations' element={<MyInspirations/>} />
        <Route path='/MyCurrentOutfit' element={<MyCurrentOutfit/>} />
        <Route path='/MyInspirationDetails' element={<MyInspirationDetails/>} />
        <Route path='/InspoPage' element={<InspoPage/>} />
        <Route path='/OtherUserProfile' element={<OtherUserProfile/>} />
        <Route path='/OtherItems' element={<OtherItems/>} />
        <Route path='/OtherTops' element={<OtherTops/>} />
        <Route path='/OtherAccesories' element={<OtherAccesories/>} />
        <Route path='/OtherBottoms' element={<OtherBottoms/>} />
        <Route path='/OtherSubcategory' element={<OtherSubcategory/>} />
        <Route path='/OtherInspirations' element={<OtherInspirations/>} />
        <Route path='/OtherCurrentOutfit' element={<OtherCurrentOutfit/>} />
        <Route path='/MyFriends' element={<MyFriends/>} />
        <Route path='/OtherFriends' element={<OtherFriends/>} />
      </Routes>
    </Router>
  );
}

export default App;