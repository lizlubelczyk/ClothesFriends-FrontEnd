import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import BrowserRouter

import Login from './Components/Login-Signup/Login.jsx';
import Signup from './Components/Login-Signup/Signup.jsx';
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
import OtherInspirationDetails from './Components/OtherUser/OtherInspirationDetails.jsx';
import Feed from './Components/Feed/Feed.jsx';
import LikedInspo from './Components/Profile/LikedInspo.jsx';
import NotificationScreen from './Components/notifications/NotificationScreen.jsx';
import BorrowRequest from './Components/notifications/BorrowRequest.jsx';
import OtherClothingItemDetails from './Components/OtherUser/OtherClothingItemDetails.jsx';
import Chat from './Components/notifications/Chat.jsx';
import Chats from './Components/notifications/Chats.jsx';
import MySubcategory from './Components/Profile/ClothingItem/MySubcategory.jsx';
import Archivedutfits from './Components/Profile/ArchivedOutfits.jsx';
import ArchivedOutfitDetails from './Components/Profile/ArchivedOutfitDetails.jsx';
import { StompSessionProvider } from 'react-stomp-hooks';
import PublicProfile from './Components/Profile/PublicProfile/PublicProfile.jsx';
import PublicAccesories from './Components/Profile/PublicProfile/PublicAccesories.jsx'; 
import PubliBottoms from './Components/Profile/PublicProfile/PublicBottoms.jsx';
import PublicTops from './Components/Profile/PublicProfile/PublicTops.jsx';
import PublicInspirations from './Components/Profile/PublicProfile/PublicInspirations.jsx';
import PublicCurrentOutfit from './Components/Profile/PublicProfile/PublicCurrentOutfit.jsx';
import PublicClothingItemDetails from './Components/Profile/PublicProfile/PublicClothingItemDetails.jsx';
import PublicItems from './Components/Profile/PublicProfile/PublicItems.jsx';
import PublicInspirationDetails from './Components/Profile/PublicProfile/PublicInspirationDetails.jsx';
import PublicSubcategory from './Components/Profile/PublicProfile/PublicSubcategory.jsx';

function App() {
  return (
    <Router> {/* Use BrowserRouter */}
      <StompSessionProvider url="ws://localhost:8080/message-broker">
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/Signup' element={<Signup />} />
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
          <Route path='/MyInspirationDetails/:inspirationId' element={<MyInspirationDetails/>} />
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
          <Route path='/OtherInspirationDetails' element={<OtherInspirationDetails/>} />
          <Route path='/Feed' element={<Feed/>} />
          <Route path='/LikedInspo' element={<LikedInspo/>} />
          <Route path='/NotificationScreen' element={<NotificationScreen/>} />
          <Route path='/BorrowRequest/:requestId' element={<BorrowRequest/>} />
          <Route path='/OtherClothingItemDetails' element={<OtherClothingItemDetails/>} />
          <Route path='/Chat/:chatId' element={<Chat/>} />
          <Route path='/Chats' element={<Chats/>} />
          <Route path='/MySubcategory' element={<MySubcategory/>} />
          <Route path='/ArchivedOutfits' element={<Archivedutfits/>} />
          <Route path='/ArchivedOutfitDetails/:outfitId' element={<ArchivedOutfitDetails/>} />
          <Route path='/PublicProfile/:userId' element={<PublicProfile/>} />
          <Route path='/PublicAccesories' element={<PublicAccesories/>} />
          <Route path='/PublicBottoms' element={<PubliBottoms/>} />
          <Route path='/PublicTops' element={<PublicTops/>} />
          <Route path='/PublicInspirations' element={<PublicInspirations/>} />
          <Route path='/PublicCurrentOutfit/:userId' element={<PublicCurrentOutfit/>} />
          <Route path='/PublicClothingItemDetails' element={<PublicClothingItemDetails/>} />
          <Route path='/PublicItems' element={<PublicItems/>} />
          <Route path='/PublicInspirationDetails/:inspirationId' element={<PublicInspirationDetails/>} />
          <Route path='/PublicSubcategory' element={<PublicSubcategory/>} />

        </Routes>
      </StompSessionProvider>
    </Router>
  );
}

export default App;