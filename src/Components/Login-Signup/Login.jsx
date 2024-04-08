import React, { useState } from 'react';
import './Login.css';
import clothinghanger from '../Assets/clothinghanger.png';
import lock from '../Assets/lock.png';
import user from '../Assets/user.png';
import { useNavigate } from 'react-router-dom';


function Login() {

  const navigate = useNavigate(); // Initialize useHistory

  const handleSignUpClick = () => {
    // Navigate to the Sign-Up screen
    navigate('/Signup'); // Replace '/signup' with your actual route
  };

  const handlePasswordRecoveryClick = () => {
    // Navigate to the Password Recovery screen
    navigate('/PasswordRecovery'); // Replace '/password-recovery' with your actual route
  };
 
  const [action, setAction] = useState("Iniciar Sesión ");
  return (
    <div className="container">
        <div className="circle">
        <img src={clothinghanger} alt="ClothesFriends Logo" className="logo" />
      </div>
      <div className="bigsquare">
      <div className="input">
            <img src={user} alt=""/>
            <input type="text" placeholder='Nombre de Usuario'/>
        </div>
        <div className="input">
            <img src={lock} alt=""/>
            <input type="text" placeholder='Contraseña'/>
        </div>
        <button className="button1">Iniciar Sesión</button>
        <div className="forgot-password" onClick={handlePasswordRecoveryClick} >¿Olvidaste tu contraseña?</div>
      </div>
      
      <div className="square2">
      <button className="button2" onClick={handleSignUpClick}>Registrarme</button>
      </div> 
      <div className="name">Clothes Friends</div>
    </div>
  );
}

export default Login;
