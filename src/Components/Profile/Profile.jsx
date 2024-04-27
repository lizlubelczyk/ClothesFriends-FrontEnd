import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './Profile.scss';
import pfp from '../Assets/pfp.jpg';
import { useNavigate } from 'react-router-dom';
import withAuth from '../withAuth/withAuth';
import { FaHeart } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";
import { IoSparkles } from "react-icons/io5";
import { FaSquarePollVertical } from "react-icons/fa6";
import { IoNotifications } from "react-icons/io5";
import { TiPlus } from "react-icons/ti";
import { BsThreeDotsVertical } from "react-icons/bs";

function Profile() {
    const [showMenu, setShowMenu] = useState(false);
    const [user, setUser] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        console.log(userId);
        console.log(token);
        const response = await fetch(`http://localhost:8080/api/user/get/${userId}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        
        });
        if (response.ok) {
            const data = await response.json();
            setUser(data);
        }
        else {
            console.log('Error');
        }
    }; // Add closing parenthesis here
    fetchUser();

    }, []);


    const handleFeedClick = () => {
        navigate('/CategoriasPrendas')
    };
    const handleInspiracionClick = () => {
        navigate('/Inspiracion')
    };
    
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("userId");
        // Navigate to the login screen after logout
        navigate('/'); // Replace '/login' with your actual login route
      }

    return (
        <div className='container'>
            <div className="usuario">
                <FaUserAlt className='user-icon' size={25} />
                <span>{user.username}</span>
            </div>
            <div className='menu-icon' onClick={() => setShowMenu(!showMenu)}>
        <BsThreeDotsVertical color= 'white' size= {30}/>
        {showMenu && (
          <div className='menu'>
            <button onClick={() => navigate('/edit-profile')}>Edit Profile</button>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
            <div className="perfil">
                <div className="pfp">
                    <img src={pfp} alt="" />
                </div>
                <div className="botones-seguidores">
                    <button className="seguidores">n seguidores</button>
                    <button className="seguidos">n seguidos</button>
                </div>
            </div>

            <button className="posts-likeados">
                <FaHeart/ >
            </button>
            

            <button className="square1" onClick={handleFeedClick}>
                <span className="prendas">PRENDA</span>
            </button>
            <button className="square2" onClick={handleInspiracionClick}>
                <span className="inspiracion">INSPIRACIÓN</span>
            </button>

            <button className="subir-post">
                <TiPlus size={50} />
            </button>

            <div className="barra-fija">
                <button className="notifications">
                <IoNotifications />

                </button>
                <button className="inicio">
                    <FaSquarePollVertical />
                </button>
                <button className="inspo">
                    <IoSparkles/>
                </button>
                <button className="profile">
                    <FaUserAlt/>
                </button>
            </div>
        </div>    
    );
}


export default withAuth(Profile);
