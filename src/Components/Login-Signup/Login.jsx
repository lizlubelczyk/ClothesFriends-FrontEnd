import React, { useState } from 'react';
import './Login.scss';
import clothinghanger from '../Assets/clothinghanger.png';
import lock from '../Assets/lock.png';
import user from '../Assets/user.png';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


function Login() {

  const navigate = useNavigate(); // Initialize useHistory
  const [values, setValues] = useState('')
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [message, setMessage] = useState('');

  const handleSignUpClick = () => {
    // Navigate to the Sign-Up screen
    navigate('/Signup'); // Replace '/signup' with your actual route
  };

  const handlePasswordRecoveryClick = () => {
    // Navigate to the Password Recovery screen
    navigate('/PasswordRecovery'); // Replace '/password-recovery' with your actual route
  };

const handleInput = (event) => {
  setValues( prev => ({...prev , [event.target.name] : event.target.value}))
}

const handleSubmit = (event) => {
  event.preventDefault();
  axios.post('http://localhost:8080/login', values)
    .then(res=> {
      const { token } =  res.data;
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('username', res.data.username);
      navigate('/MyFeed');
    })
    .catch(err => console.log(err))
  }

  return (
    <div className="login-container">
        <div className="circle">
        <img src={clothinghanger} alt="ClothesFriends Logo" className="logo" />
      </div>
      <div className="square">
      <div className="input">
            <img src={user} alt=""/>
            <input type="text" placeholder='Nombre de Usuario' name='username' onChange={handleInput}/>

        </div>
        <div className="input">
            <img src={lock} alt=""/>
            <input type="text" placeholder='Contraseña' name='password' onChange={handleInput}/>
        </div>

        {errorMessage && <div>{errorMessage}</div>}
        <button className="button1" onClick={handleSubmit}>Iniciar Sesión</button>
        <Link to={'/PasswordRecovery'}>¿Olvidaste tu contraseña?</Link>
      </div>
      
      <div className="square2">
      <Link to={'/Signup'}>Registrarme</Link>
      </div> 
      <div className="name">Clothes Friends</div>
    </div>
  );
}

export default Login;
