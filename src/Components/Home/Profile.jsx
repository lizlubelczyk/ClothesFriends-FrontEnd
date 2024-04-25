import React from 'react';
import './Profile.scss';
import notifications from '../Assets/notifications.png';
import inspo from '../Assets/inspo.png';
import profile from '../Assets/profile.png';
import inicio from '../Assets/inicio.png';
import corazon from '../Assets/corazon.png';
import postear from '../Assets/postear.png';
import pfp from '../Assets/pfp.png';
import { useNavigate } from 'react-router-dom';


function Profile() {

    const navigate = useNavigate();

    const handleFeedClick = () => {
        navigate('/CategoriasPrendas')
    };
    const handleInspiracionClick = () => {
        navigate('/Inspiracion')
    };
    
    return (
        <div className='container'>
            <div className='usuario'>usuario</div>
            <div className="perfil">
                <div className="pfp">
                    <img src={pfp} alt="" />
                </div>
                <div className="botones-seguidores">
                    <button className="seguidores">n seguidores</button>
                    <button className="seguidos">n seguidos</button>
                </div>
            </div>

            <button className="editar-perfil" >Editar Perfil</button>
            <button className="posts-likeados">
                <img src={corazon} alt=""/>
            </button>
            

            <button className="square1" onClick={handleFeedClick}>
                <span className="prendas">Prendas</span>
            </button>
            <button className="square2" onClick={handleInspiracionClick}>
                <span className="inspiracion">Inspiracion</span>
            </button>

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

export default Profile;

