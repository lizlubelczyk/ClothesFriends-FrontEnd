import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import BrowserRouter

import Login from './Components/Login-Signup/Login.jsx';
import PasswordRecovery from './Components/Login-Signup/PasswordRecovery.jsx';
import Signup from './Components/Login-Signup/Signup.jsx';

function App() {
  return (
    <Router> {/* Use BrowserRouter */}
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/Signup' element={<Signup />} />
        <Route path='/PasswordRecovery' element={<PasswordRecovery />} />
      </Routes>
    </Router>
  );
}

export default App;
