import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Chats.scss";
import withAuth from "../extras/withAuth";
import { IoIosArrowBack } from "react-icons/io";

function Chats() {
    const [chats, setChats] = useState([]);
    const [showAllChats, setShowAllChats] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchChats();
    }, [showAllChats]);

    async function fetchChats() {
        try {
            const userId = localStorage.getItem('userId');
            const endpoint = showAllChats ? `/api/chat/${userId}/getChats` : `/api/chat/${userId}/getChats/Open`;

            const response = await fetch(`http://localhost:8080${endpoint}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setChats(data);
            } else {
                console.error("Error fetching chats");
            }
        } catch (error) {
            console.error("An error occurred while fetching chats:", error);
        }
    }

    async function markAsClosed(chatId) {
        try {
            const response = await fetch(`http://localhost:8080/api/chat/${chatId}/close`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.ok) {
                const updatedChats = chats.map(chat => {
                    if (chat.chatId === chatId) {
                        return {
                            ...chat,
                            isOpen: false
                        };
                    }
                    return chat;
                });

                setChats(updatedChats);
            } else {
                console.error("Error marking chat as closed");
            }
        } catch (error) {
            console.error("An error occurred while marking chat as closed:", error);
        }
    }

    function handleToggleSwitch() {
        setShowAllChats(!showAllChats);
    }

    function handleChatClick(chatId) {
        navigate(`/Chat/${chatId}`);
    }

    return (
        <div className="chats-screen-container">
            <div className="header">
                <button className="back-button" onClick={() => navigate(-1)}>
                    <IoIosArrowBack />
                </button>
                <h1 className="title">Chats</h1>
            </div>
            <div className="toggle-switch-container">
                <div className="toggle-switch">
                    <span className={`toggle-label ${showAllChats ? 'active' : ''}`}>Todos</span>
                    <label className="switch">
                        <input type="checkbox" checked={showAllChats} onChange={handleToggleSwitch} />
                        <span className="slider round"></span>
                    </label>
                    <span className={`toggle-label ${!showAllChats ? 'active' : ''}`}>Abiertos</span>
                </div>
            </div>
            <div className="chats-list">
                {chats.map(chat => (
                    <Link to={`/Chat/${chat.id}`} key={chat.id} className="chat-item">
                        <div className="profile-picture">
                            <img src={chat.profilePicture} alt={`${chat.user}'s profile`} />
                        </div>
                        <div className="user-info">
                            <h3>{chat.user} | {chat.clothingItem}</h3>
                            <p>{chat.lastMessage}</p>
                        </div>
                        <div className="status">
                            {chat.isOpen ? (
                                <span className="status-open">Abierto</span>
                            ) : (
                                <span className="status-closed">Cerrado</span>
                            )}
                            {chat.isOpen && (
                                <button className="mark-as-closed" onClick={() => markAsClosed(chat.id)}></button>
                            )}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default withAuth(Chats);
