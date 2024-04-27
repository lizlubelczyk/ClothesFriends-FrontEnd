
import React, { useEffect } from 'react';

import './Myfeed.scss';
import clothinghanger from '../Assets/clothinghanger.png';
import pfp from '../Assets/pfp.jpg';
import img from '../Assets/img.jpg';
import notifications from '../Assets/notifications.png';
import inspo from '../Assets/inspo.png';
import profile from '../Assets/profile.png';
import inicio from '../Assets/inicio.png';
import like from '../Assets/like.png';
import postear from '../Assets/postear.png';
import dislike from '../Assets/dislike.png';
import comentarios from '../Assets/comentario.png';
import { FaHeart } from "react-icons/fa";
import { FaHeartBroken } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import withAuth from '../withAuth/withAuth';

function Myfeed()  {
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/');
        }
        else{
            
        }
    }, []);

    const checkSession = async () => {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:8080/check-session', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: token,
            }),
          });
    
        const data = await response.json();
        if (data.status === 'ok') {
            return true;
        } else {
            return false;
        }
    }
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
                <FaHeart />
            </button>
            <button>
                <FaHeartBroken />   
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

export default withAuth(Myfeed);
