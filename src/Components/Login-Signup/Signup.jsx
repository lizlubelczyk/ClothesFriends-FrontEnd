import React from 'react';
import './Signup.css';
import clothinghanger from '../Assets/clothinghanger.png';
import mail from '../Assets/mail.png';
import user from '../Assets/user.png';
import lock from '../Assets/lock.png';
import idcard from '../Assets/idcard.png';

function Signup() {
  return (
    <div className="container">
        <div className="circle">
        <img src={clothinghanger} alt="ClothesFriends Logo" className="logo" />
      </div>
      <div className="square1">
      <div className="input">
            <img src={mail} alt=""/>
            <input type="text" placeholder='Correo Electrónico'/>
        </div>
        <div className="input">
            <img src={idcard} alt=""/>
            <input type="text" placeholder='Nombre Completo'/>
        </div>
        <div className="input">
            <img src={user} alt=""/>
            <input type="text" placeholder='Nombre de Usuario'/>
        </div>
        <div className="input">
            <img src={lock} alt=""/>
            <input type="text" placeholder='Contraseña'/>
        </div>
        
        <button className="button1">Registrate</button>
      </div>
      
      
      <div className="name">Clothes Friends</div>
    </div>
  );
}

export default Signup;