import React from 'react';
import './Prendas.scss';
import flechaVolver from '../Assets/flechaVolver.png';
import notifications from '../Assets/notifications.png';
import inspo from '../Assets/inspo.png';
import profile from '../Assets/profile.png';
import inicio from '../Assets/inicio.png';

function Prendas() {

  return (
    <div className="prendas-container">
      <div className="barra-superior">
        <button className="boton-volver">
          <img src={flechaVolver} alt="Volver" />
        </button>
      </div>
      <div className="botones-prendas">
        <button className="top">top</button>
        <button className="bottom">bottom</button>
      </div>
      {/* Barra fija */}
      <div className="barra-fija">
      <button className="notifications">
            <img src={notifications} alt=""/>
        </button>
        <button className="inicio">
            <img src={inicio} alt=""/>
        </button>
        <button className="inspo">
            <img src={inspo} alt=""/>
        </button>
        <button className="profile">
            <img src={profile} alt=""/>
        </button>
        {/* Botones de la barra fija */}
      </div>
    </div>
  );
}

export default Prendas;

