import React, { useState, useEffect } from 'react';
import withAuth from '../extras/withAuth';
import '../Profile/Friends.scss';
import { IoIosArrowBack } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';


function OtherFriends(){
    const [friends, setFriends] = useState([]);
    const [fullName, setFullName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchFriends();
        fetchFullName();
    }, []);

    async function fetchFriends() {
        try {
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('searchedUserId');

            const response = await fetch(`http://localhost:8080/api/user/get/${userId}/friends`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();

                // Set isFriend property for each friend
                const friendsWithStatus = data.map(friend => ({
                    ...friend,
                    isFriend: true, // Assuming the API returns only friends
                }));

                setFriends(friendsWithStatus);
            } else {
                console.error("Error fetching friends");
            }
        } catch (error) {
            console.error("An error occurred while fetching friends:", error);
        }
    }

    async function fetchFullName() {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('searchedUserId');

        try {
            const response = await fetch(`http://localhost:8080/api/user/get/${userId}/fullname`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const fullName = await response.text();
                setFullName(fullName);
            } else {
                console.error('Error fetching full name');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    function handleUserClick(userId) {
        localStorage.setItem('searchedUserId', userId);
        navigate(`/OtherUserProfile`);
    }


    return(
        <div className = "friends-container">
            <div className="header">
            <button className="back-button" onClick={() => navigate(-1)}>
                        <IoIosArrowBack color="white" size="30" />
                </button>
                <h1 className="title">Mis Amigos</h1>
            </div>
            <div className="friends-list">
                {friends.map(friend => (
                    <div key={friend.userId} className="friend" onClick = {() => handleUserClick(friend.userId)} >
                        <img src={friend.profilePicture || 'default-pic.jpg'} alt={friend.username} className="friend-pic" />
                        <span className="friend-username">{friend.username}</span>
                    </div>
                ))}
            </div>
        </div>

    )



}

export default withAuth(OtherFriends);