import React from 'react';

import './Feed.scss';
import clothinghanger from '../Assets/clothinghanger.png';
import pfp from '../Assets/pfp.png';
import img from '../Assets/img.jpg';
import notifications from '../Assets/notifications.png';
import inspo from '../Assets/inspo.png';
import profile from '../Assets/profile.png';
import inicio from '../Assets/inicio.png';
import corazon from '../Assets/corazon.png';
import postear from '../Assets/postear.png';
import dislike from '../Assets/dislike.png';
import comentarios from '../Assets/comentarios.png';

function Feed()  {
  return (
    <div className="container">
        <div className="circle">
            <img src={clothinghanger} alt="ClothesFriends Logo" className="logo" />
        </div>

        <div className='linea divisoria'></div>

        <div className="publicacion">
          {/* Foto de perfil del usuario y nombre */}
            <div className="perfil-usuario">
                <img src={pfp} alt="" />
                <span>usuario</span>
            </div>

          {/* Foto publicada */}
            <img src={img} alt="foto1" />

            {/* Botones */}
            <div className="botones">
                <button>
                    <img src={corazon} alt="" className="like"/>
                </button>
                <button>
                    <img src={dislike} alt="" className="dislike"/>
                </button>
                <button>
                    <img src={comentarios} alt="" className="comentarios"/>
                </button>
            </div>
        </div>

        <button className="subir-post">
                <img src={postear} alt=""/>
        </button>

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
        </div>
    </div>
  );
}

export default Feed;
