import React from 'react';
import './Inspiracion.scss';
import notifications from '../Assets/notifications.png';
import inspo from '../Assets/inspo.png';
import profile from '../Assets/profile.png';
import inicio from '../Assets/inicio.png';
import postear from '../Assets/postear.png';
import img from '../Assets/img.jpg';
import flechaVolver from '../Assets/flechaVolver.png';

function Inspiracion() {
  return (
    <div className="inspiracion-container">

      <div className="grid-container">
        {/* Aquí puedes repetir este bloque para cada foto */}
        <div className="foto">
          <img src={img} alt="foto1" />
        </div>
        <div className="foto">
          <img src={img} alt="foto2" />
        </div>
        <div className="foto">
          <img src={img} alt="foto3" />
        </div>
        <div className="foto">
          <img src={img} alt="foto4" />
        </div>
        <div className="foto">
          <img src={img} alt="foto5" />
        </div>
        <div className="foto">
          <img src={img} alt="foto6" />
        </div>
        {/* Fin del bloque repetido */}
      </div>

      <button className="subir-post">
        <img src={postear} alt="Subir Post" />
      </button>

      {/* Barra fija inferior */}
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

export default Inspiracion;