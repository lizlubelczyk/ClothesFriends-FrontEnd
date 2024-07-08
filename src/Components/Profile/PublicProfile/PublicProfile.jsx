import React, { useState, useEffect } from 'react';
import '../Profile.scss';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { FaUserAlt } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";

function PublicProfile() {
    const {userId} = useParams();
    const [user, setUser] = useState('');
    const [isPublic, setIsPublic] = useState(false);
    const navigate = useNavigate();
    const [hasOutfit, setHasOutfit] = useState(false);
    const [friendCount, setFriendCount] = useState(0);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const isPublicResponse = await fetch(`http://localhost:8080/api/user/me/${userId}/public`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (isPublicResponse.ok) {
                    const data = await isPublicResponse.json();
                    setIsPublic(true);
                    if(data){
                        const profileResponse = await fetch(`http://localhost:8080/api/user/me/${userId}/getPublicProfile`, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        });
                        if (profileResponse.ok) {
                            const data = await profileResponse.json();
                            setUser(data);
                            localStorage.setItem('searchedUserId', userId);
                        } else {
                            console.error('Failed to fetch user profile:', profileResponse.statusText);
                        }
                    }
                } else{
                    console.error('Failed to check if user is public:', isPublicResponse.statusText);
                }
            } catch (error) {
                console.error('An error occurred while fetching user data:', error);
            }
        };

        const countFriends = async () => {
            const response = await fetch(`http://localhost:8080/api/user/me/${userId}/getPublicFriendCount`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                const data = await response.json();
                setFriendCount(data);
            } else {
                console.error('Failed to fetch friend count:', response.statusText);
            }
        } 
        
        const checkOutfit = async () => {
            const response = await fetch(`http://localhost:8080/api/outfit/${userId}/hasOutfitPublic`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                const data = await response.json();
                setHasOutfit(data);
            } else {
                console.error('Failed to fetch outfit data:', response.statusText);
            }
        }

        fetchUserData();
        countFriends();
        checkOutfit();
    }, []);

    return(
        <div className="container">
      <div className="usuario">
        <button className="back-button" onClick={() => navigate(-1)}>
            <IoIosArrowBack color="white" size="30" />
        </button>
        <FaUserAlt className='user-icon' size={25} />
        <span>{user.username}</span>
      </div>
      <div className="perfil">
        <Link to="/PublicCurrentOutfit" className={`pfp ${hasOutfit ? 'has-outfit' : ''}`}>
          <img src={user.profilePicture} alt="" />
        </Link>
        <div className="botones-seguidores">
                <button className="seguidores">{friendCount} amigos</button>
        </div>
      </div>
      <div className="full-name">
        {user.fullName}
        <button  className="friend-button">
            Inicie sesión para agregar amigo
        </button>
      </div>
      <Link to="/PublicItems" className="square1">
        <span className="prendas">PRENDA</span>
      </Link>
      <Link to="/PublicInspirations" className="square2">
        <span className="inspiracion">INSPIRACIÓN</span>
      </Link>
    </div>
    )
}

export default PublicProfile;