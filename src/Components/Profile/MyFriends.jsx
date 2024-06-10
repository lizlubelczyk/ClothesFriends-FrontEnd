import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import withAuth from "../extras/withAuth";
import "./Friends.scss";

function MyInspirationDetails() {
    const [friends, setFriends] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [friendToRemove, setFriendToRemove] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchFriends();
    }, []);

    async function fetchFriends() {
        try {
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('userId');

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

    const handleFriendToggle = async (friendId, isCurrentlyFriend) => {
        if (isCurrentlyFriend) {
            setFriendToRemove(friendId);
            setShowModal(true);
        } else {
            await befriendUser(friendId);
        }
    };

    const befriendUser = async (friendId) => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');

        const url = `http://localhost:8080/api/user/me/${userId}/befriend/${friendId}`;

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.ok) {
            fetchFriends(); // Re-fetch the data to update the state
        } else {
            console.log('Error befriending user');
        }
    };

    const unfriendUser = async () => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        const url = `http://localhost:8080/api/user/${userId}/${friendToRemove}/deleteFriendship`;

        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.ok) {
            fetchFriends(); // Re-fetch the data to update the state
            setShowModal(false);
            setFriendToRemove(null);
        } else {
            console.log('Error unfriending user');
        }
    };

    const closeModal = () => {
        setShowModal(false);
        setFriendToRemove(null);
    };

    function handleUserClick(userId) {
        localStorage.setItem('searchedUserId', userId);
        navigate(`/OtherUserProfile`);
    }

    return (
        <div className="friends-container">
            <div className="header">
                <button className="back-button">
                    <Link to="/Profile">
                        <IoIosArrowBack color="white" size="30" />
                    </Link>
                </button>
                <h1 className="title">Mis Amigos</h1>
            </div>
            <div className="friends-list">
                {friends.map(friend => (
                    <div key={friend.userId} className="friend" onClick={() => handleUserClick(friend.userId)}>
                        <img src={friend.profilePicture || 'default-pic.jpg'} alt={friend.username} className="friend-pic" />
                        <span className="friend-username">{friend.username}</span>
                        <button
                            onClick={() => handleFriendToggle(friend.userId, friend.isFriend)}
                            className="friend-button"
                        >
                            {friend.isFriend ? 'Unfriend' : 'Befriend'}
                        </button>
                    </div>
                ))}
            </div>
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>¿Unfriend this user?</h2>
                        <button onClick={unfriendUser}>Yes</button>
                        <button onClick={closeModal}>No</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default withAuth(MyInspirationDetails);
