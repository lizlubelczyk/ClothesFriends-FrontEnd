import React, { useEffect, useState }  from 'react';
import './Signup.scss';
import clothinghanger from '../Assets/clothinghanger.png';
import mail from '../Assets/mail.png';
import user from '../Assets/user.png';
import lock from '../Assets/lock.png';
import idcard from '../Assets/idcard.png';

function Signup() {

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

const handleClick = async () => {
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
        name: fullName
      }),
    });
  
    const resMessage = await res.text();
  
    console.log(resMessage);
  }
  catch (error) {
    console.log(error);
  }
  
};

// ...

   
   

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
            <img src={mail} alt=""/>
            <input type="text" placeholder='Correo Electrónico' onChange={(e)=>setEmail(e.target.value)}/>

        </div>
        <div className="input">
            <img src={idcard} alt=""/>
            <input type="text" placeholder='Nombre Completo' onChange={(e)=>setFullName(e.target.value)} />
        </div>
        <div className="input">
            <img src={user} alt=""/>
            <input type="text" placeholder='Nombre de Usuario' onChange={(e)=>setUsername(e.target.value)}/>
        </div>
        <div className="input">
            <img src={lock} alt=""/>
            <input type="text" placeholder='Contraseña' onChange={(e)=>setPassword(e.target.value)}/>
        </div>
        <div className="input">
            <img src={lock} alt=""/>
            <input type="text" placeholder='Confirmar Contraseña' onChange={(e)=>setConfirmPassword(e.target.value)}/>
        </div>
        
        <button className="button1" onClick={handleClick}>Registrate</button>
      </div>
      
    </div>
  );
}

export default Signup;