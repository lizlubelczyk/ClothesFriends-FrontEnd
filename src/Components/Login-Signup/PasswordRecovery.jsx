import React from 'react';
import './PasswordRecovery.css';
import clothinghanger from '../Assets/clothinghanger.png';
import mail from '../Assets/mail.png';

function PasswordRecovery() {
  return (
    <div className="container">
        <div className="circle">
        <img src={clothinghanger} alt="ClothesFriends Logo" className="logo" />
      </div>
      <div className="bigsquare">
        <div className="instructions">Ingresa tu correo electrónico  y te enviaremos un enlace para que recuperes el acceso a tu cuenta</div>
        <div className="input">
            <img src={mail} alt=""/>
            <input type="text" placeholder='Correo Electrónico'/>
        </div>
        
        
        <button className="button1">Enviar</button>
      </div>
      
      
      <div className="name">Clothes Friends</div>
    </div>
  );
}

export default PasswordRecovery;