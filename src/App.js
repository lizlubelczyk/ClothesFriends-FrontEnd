import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import BrowserRouter

import Login from './Components/Login-Signup/Login.jsx';
import PasswordRecovery from './Components/Login-Signup/PasswordRecovery.jsx';
import Signup from './Components/Login-Signup/Signup.jsx';
import Profile from './Components/Home/Profile.jsx';
import Inspiracion from './Components/Home/Inspiracion.jsx';
import Prendas from './Components/Home/Prendas.jsx';
import Feed from './Components/Home/Feed.jsx';

function App() {
  return (
    <Router> {/* Use BrowserRouter */}
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/Signup' element={<Signup />} />
        <Route path='/PasswordRecovery' element={<PasswordRecovery />} />
        <Route path='/Profile' element={<Profile />} />
        <Route path='/Inspiracion' element={<Inspiracion />} />
        <Route path='/Prendas' element={<Prendas />} />
        <Route path='/Feed' element={<Feed />} />
      </Routes>
    </Router>
  );
}
export default App;
