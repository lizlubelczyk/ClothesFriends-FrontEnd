import React, { useEffect, useState }  from 'react';
import './Signup.scss';
import clothinghanger from '../Assets/clothinghanger.png';
import mail from '../Assets/mail.png';
import user from '../Assets/user.png';
import lock from '../Assets/lock.png';
import idcard from '../Assets/idcard.png';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserAlt } from "react-icons/fa";
import { FaIdCard } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { FaLock } from "react-icons/fa";


function Signup() {

  const navigate= useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({});

  const [errors, setErrors] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
    fullName: ''
  });

  


const [userData, setUserData] = useState(null);

const isValidEmail = (email) => {
  const re = /\S+@\S+\.\S+$/;
  return re.test(email);
}

const handleClick = async () => {
  let newErrors = {
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
    fullName: ''
  };

  if (!email || !isValidEmail(email)) {
    newErrors.email = 'Correo electrónico inválido';
  }

  if (!fullName.trim()) {
    newErrors.fullName = 'Nombre completo requerido';
  }

  if (!username.trim()) {
    newErrors.username = 'Nombre de usuario requerido';
  }

  if (!password) {
    newErrors.password = 'Contraseña requerida';
  }

  if (!confirmPassword) {
    newErrors.confirmPassword = 'Confirmar contraseña requerida';
  }

  if (password !== confirmPassword) {
    newErrors.confirmPassword = 'Las contraseñas no coinciden';
  }

  if (Object.values(newErrors).some(error => error !== '')) {
    setErrors(newErrors);
    return;
  }
    // Validación adicional para verificar si hay campos incompletos
    if (Object.values(newErrors).some(error => error !== '')) {
      setErrors(newErrors);
      return;
    }
  
    // Validación adicional para verificar si todos los campos están completos
    if (!email || !fullName || !username || !password || !confirmPassword) {
      setErrors({ ...newErrors, general: 'Todos los campos son requeridos' });
      return;
    }
  
  try{
    const res = await fetch('http://localhost:8080/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
        username: username,
        fullName: fullName
      }),
    });
  
    const resMessage = await res.text();
  
    console.log(resMessage);
    navigate("/")
  }
  catch (error) {
    console.log(error);
  }
  
};

   
   

  function setNewMessage(message, type){
    var newMessage = {}
    newMessage.text = message
    newMessage.type = type
    setMessage(newMessage);
  }

 

  return (
    
    <div className="signupcontainer">
        <div className="circle">
        <img src={clothinghanger} alt="ClothesFriends Logo" className="logo" />
      </div>
      <div className="square1">
      <div className="input">
            <FaEnvelope size={20} className='icon' />
            <input type="text" placeholder='Correo Electrónico' onChange={(e)=>setEmail(e.target.value)}/>
        </div>
        {errors.email !== "" && <p className="error">{errors.email}</p>}
        <div className="input">
            <FaIdCard size={20} className='icon' />
            <input type="text" placeholder='Nombre Completo' onChange={(e)=>setFullName(e.target.value)} />
        </div>
        {errors.fullName !== "" && <p className="error">{errors.fullName}</p>}
        <div className="input">
            <FaUserAlt size={20} className='icon' />
            <input type="text" placeholder='Nombre de Usuario' onChange={(e)=>setUsername(e.target.value)}/>
        </div>
        {errors.username !== "" && <p className="error">{errors.username}</p>}
        <div className="input">
            <FaLock size={20} className='icon' />
            <input type="text" placeholder='Contraseña' onChange={(e)=>setPassword(e.target.value)}/>
        </div>
        <div className="input">
            <FaLock size={20} className='icon' />
            <input type="text" placeholder='Confirmar Contraseña' onChange={(e)=>setConfirmPassword(e.target.value)}/>
        </div>
        {errors.confirmPassword !== "" && <p className="error">{errors.confirmPassword}</p>}

        
        <button className="button1" onClick={handleClick}>Registrate</button>
      </div>
      
    </div>
  );
}

export default Signup;