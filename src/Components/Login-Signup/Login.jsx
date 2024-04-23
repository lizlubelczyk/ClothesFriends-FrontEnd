import React, { useState } from 'react';
import './Login.scss';
import clothinghanger from '../Assets/clothinghanger.png';
import lock from '../Assets/lock.png';
import user from '../Assets/user.png';
import { useNavigate } from 'react-router-dom';


function Login() {

  const navigate = useNavigate(); // Initialize useHistory
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignUpClick = () => {
    // Navigate to the Sign-Up screen
    navigate('/Signup'); // Replace '/signup' with your actual route
  };

  const handlePasswordRecoveryClick = () => {
    // Navigate to the Password Recovery screen
    navigate('/PasswordRecovery'); // Replace '/password-recovery' with your actual route
  };

  const handleLogin = async (event) => {
    event.preventDefault();
  
    const response = await fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
  
    const data = await response.json();
  
    if (response.ok) {
      localStorage.setItem('token', data.token);
      navigate('../Home/Feed'); // Redirect to Feed component
    } else {
      setMessage(data);
    }
  };
 
  return (
    <div className="login-container">
        <div className="circle">
        <img src={clothinghanger} alt="ClothesFriends Logo" className="logo" />
      </div>
      <div className="square">
      <div className="input">
            <img src={user} alt=""/>
            <input type="text" placeholder='Usuario'/>
        </div>
        <div className="input">
            <img src={lock} alt=""/>
            <input type="text" placeholder='Contraseña'/>
        </div>
        <button className="button" >Iniciar Sesión</button>
        <div className="forgot-password" onClick={handlePasswordRecoveryClick} >¿Olvidaste tu contraseña?</div>
      </div>
      
      <div className="square2">
        <button className="button2" onClick={handleSignUpClick}>Registrarme</button>
        </div> 
        <h1 className="name">Clothes Friends</h1>
      </div>
  );
}

export default Login;
