import React, { useState } from 'react';
import './Login.scss';
import clothinghanger from '../Assets/clothinghanger.png';

import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaUserAlt } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import withNoAuth from '../extras/withNoAuth';

function Login() {

  const navigate = useNavigate(); // Initialize useHistory
  const [values, setValues] = useState('')
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [message, setMessage] = useState('');


const handleInput = (event) => {
  setValues( prev => ({...prev , [event.target.name] : event.target.value}))
}

const handleSubmit = (event) => {
  event.preventDefault();
  axios.post('http://localhost:8080/login', values)
    .then(res=> {
      const { token } =  res.data;
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userId', res.data.id);
      navigate('/Profile');
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
            <FaUserAlt size={20} className='icon' />
            <input type="text" placeholder='Usuario' name='username' onChange={handleInput}/>

        </div>
        <div className="input">
            <FaLock size={20} className='icon' />
            <input type="text" placeholder='Contraseña' name='password' onChange={handleInput}/>
        </div>

        {errorMessage && <div>{errorMessage}</div>}
        <button className="button1" onClick={handleSubmit}>Iniciar Sesión</button>
      </div>
      
      <div className="square2">
      <Link to={'/Signup'}>Registrarme</Link>
      </div> 
      <div className="name">Clothes Friends</div>
    </div>
  );
}

export default Login;
