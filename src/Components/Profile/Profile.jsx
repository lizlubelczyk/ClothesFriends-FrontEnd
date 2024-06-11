import React, { useState, useEffect } from 'react';
import './Profile.scss';
import pfp from '../Assets/pfp.jpg';
import { useNavigate } from 'react-router-dom';
import withAuth from '../extras/withAuth';
import { FaHeart, FaUserAlt, FaClock } from "react-icons/fa";
import { IoSparkles, IoNotifications } from "react-icons/io5";
import { FaSquarePollVertical } from "react-icons/fa6";
import { TiPlus } from "react-icons/ti";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link } from 'react-router-dom';
import NotificationScreen from '../notifications/NotificationScreen';

function Profile() {
    const [showMenu, setShowMenu] = useState(false);
    const [user, setUser] = useState('');
    const navigate = useNavigate();
    const [hasOutfit, setHasOutfit] = useState(false);
    const [friendCount, setFriendCount] = useState(0);

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('userId');
            console.log(userId);
            console.log(token);
            const response = await fetch(`http://localhost:8080/api/user/get/${userId}/profile`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.ok) {
                const data = await response.json();
                setUser(data);
            } else {
                console.log('Error');
            }
        };

        const checkOutfit = async () => {
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('userId');
            const response = await fetch(`http://localhost:8080/api/outfit/${userId}/hasOutfit`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.ok) {
                const result = await response.json();
                setHasOutfit(result);
            }
        };

        const countFriends = async () => {
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('userId');
            const response = await fetch(`http://localhost:8080/api/user/get/${userId}/friendCount`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.ok) {
                const result = await response.json();
                console.log(result);
                setFriendCount(result);
            }
        };

        fetchUser();
        checkOutfit();
        countFriends();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("userId");
        navigate('/'); // Replace '/login' with your actual login route
    };

    return (
        <div className='container'>
            <div className="usuario">
                <FaUserAlt className='user-icon' size={25} />
                <span>{user.username}</span>
            </div>
            <div className='menu-icon' onClick={() => setShowMenu(!showMenu)}>
                <BsThreeDotsVertical color='white' size={30} />
                {showMenu && (
                    <div className='menu'>
                        <button onClick={() => navigate('/Edit')}>Edit Profile</button>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                )}
            </div>
            <div className="perfil">
                <Link to="/MyCurrentOutfit" className={`pfp ${hasOutfit ? 'has-outfit' : ''}`}>
                    <img src={user.profilePicture || pfp} alt="" />
                </Link>
                <div className="botones-seguidores">
                    <Link to="/MyFriends">
                        <button className="seguidores">{friendCount} amigos</button>
                    </Link>
                </div>
            </div>

            <div className="full-name">
                {user.fullName}
            </div>

            <div className="buttons-row">
                <button className="archived-outfits">
                    <Link to="/ArchivedOutfits">
                        <FaClock />
                    </Link>
                </button>
                <button className="posts-likeados">
                    <Link to="/LikedInspo">
                        <FaHeart />
                    </Link>
                </button>
            </div>

            <Link to="/MyItems" className="square1">
                <span className="prendas">PRENDA</span>
            </Link>
            <Link to="/MyInspirations" className="square2">
                <span className="inspiracion">INSPIRACIÓN</span>
            </Link>

            <button className="subir-post">
                <Link to="/Uploads">
                    <TiPlus size={50} color="black" />
                </Link>
            </button>

            <div className="barra-fija">
                <Link to= "/NotificationScreen">
                <button className="notifications">
                    <IoNotifications size={30} />
                </button>
                </Link>
                <Link to="/Feed" >
                    <button className="inicio">
                        <FaSquarePollVertical size={30} />
                    </button>
                </Link>
                <Link to="/InspoPage" className="inspo">
                    <IoSparkles size={30} />
                </Link>
                <button className="profile">
                    <FaUserAlt size={30} color='gray' />
                </button>
            </div>
        </div>
    );
}

export default withAuth(Profile);
