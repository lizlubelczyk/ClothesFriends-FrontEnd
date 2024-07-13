import React, { useState, useEffect } from 'react';
import '../Profile/Profile.scss';
import pfp from '../Assets/pfp.jpg';
import { useNavigate } from 'react-router-dom';
import withAuth from '../extras/withAuth';
import { FaUserAlt } from "react-icons/fa";
import { Link, useLocation } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";


function OtherUserProfile() {
  const [user, setUser] = useState('');
  const navigate = useNavigate();
  const [hasOutfit, setHasOutfit] = useState(false);
  const location = useLocation();
  const [isFriend, setIsFriend] = useState(false);
  const [friendCount, setFriendCount] = useState(0);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    await fetchUser();
    await checkOutfit();
    await checkFriendship();
    await countFriends();
  };

  const fetchUser = async () => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('searchedUserId');
    console.log(userId);
    console.log(token);
    const response = await fetch(`http://localhost:8080/api/user/other/${userId}/profile`, {
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
    const userId = localStorage.getItem('searchedUserId');
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

  const checkFriendship = async () => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('searchedUserId');
    const currentUserId = localStorage.getItem('userId');
    const response = await fetch(`http://localhost:8080/api/user/${currentUserId}/${userId}/isFriend`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const result = await response.json();
      setIsFriend(result);
    }
  };

  const countFriends = async () => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('searchedUserId');
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

  const handleFriendToggle = async () => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('searchedUserId');
    const currentUserId = localStorage.getItem('userId');
    const url = isFriend
      ? `http://localhost:8080/api/user/${currentUserId}/${userId}/deleteFriendship`
      : `http://localhost:8080/api/user/me/${currentUserId}/befriend/${userId}`;

    const method = isFriend ? 'DELETE' : 'POST';

    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      setIsFriend(!isFriend);
      fetchUserData(); // Re-fetch the data to update the state
    } else {
      console.log('Error toggling friendship status');
    }
  };

  return (
    <div className="container">
      <div className="usuario">
        <button className="back-button" onClick={() => navigate(-1)}>
                    <IoIosArrowBack color="white" size="30" />
        </button>
        <FaUserAlt className='user-icon' size={25} />
        <span>{user.username}</span>
      </div>
      <div className="perfil">
        <Link to="/OtherCurrentOutfit" className={`pfp ${hasOutfit ? 'has-outfit' : ''}`}>
          <img src={user.profilePicture || pfp} alt="" />
        </Link>
        <div className="botones-seguidores">
            <Link to="/OtherFriends" >
                <button className="seguidores">{friendCount} amigos</button>
            </Link>
        </div>
      </div>
      <div className="full-name">
        {user.fullName}
        <button onClick={handleFriendToggle} className="friend-button">
          {isFriend ? 'Unfriend' : 'Befriend'}
        </button>
      </div>
      <Link to="/OtherItems" className="square1">
        <span className="prendas">PRENDA</span>
      </Link>
      <Link to="/OtherInspirations" className="square2">
        <span className="inspiracion">INSPIRACIÓN</span>
      </Link>
    </div>
  );
}

export default withAuth(OtherUserProfile);
