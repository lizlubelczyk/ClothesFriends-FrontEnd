import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { IoIosArrowBack, IoMdCloseCircle } from "react-icons/io";
import "./Chat.scss";
import withAuth from "../extras/withAuth";

function Chat() {
    const { chatId } = useParams();
    const navigate = useNavigate();
    const [chat, setChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [isOpen, setIsOpen] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [newMessage, setNewMessage] = useState("");
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        fetchChat();
        fetchMessages();
    }, []);

    async function fetchChat() {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:8080/api/chat/${userId}/${chatId}/getChat`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setChat(data);
                setIsOpen(data.isOpen);
                setIsLoading(false);
            } else {
                console.error("Error fetching chat");
                setIsLoading(false);
            }
        } catch (error) {
            console.error("An error occurred while fetching chat:", error);
            setIsLoading(false);
        }
    }

    async function fetchMessages() {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:8080/api/chat/${chatId}/getMessages`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setMessages(data);
            } else {
                console.error("Error fetching messages");
            }
        } catch (error) {
            console.error("An error occurred while fetching messages:", error);
        }
    }

    async function closeChat() {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:8080/api/chat/${chatId}/close`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                setIsOpen(false);
            } else {
                console.error("Error closing chat");
            }
        } catch (error) {
            console.error("An error occurred while closing chat:", error);
        }
    }

    async function sendMessage(event) {
        event.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:8080/api/chat/${chatId}/${userId}/createMessage`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newMessage)
            });

            if (response.ok) {
                setNewMessage("");
                fetchMessages();  // Refresh messages after sending a new one
            } else {
                console.error("Error sending message");
            }
        } catch (error) {
            console.error("An error occurred while sending message:", error);
        }
    }

    return (
        <div className="chat-page-container">
            <div className="header">
                <button className="back-button" onClick={() => navigate(-1)}>
                    <IoIosArrowBack color="white" size="30" />
                </button>
                {isLoading ? (
                    <h1 className="title">Loading...</h1>
                ) : (
                    <>
                        {chat && (
                            <div className="user-info">
                                <h1 className="title">{chat.user} | {chat.clothingItem}</h1>
                                
                            </div>
                        )}
                        <div className="status-container">
                            <button className="status-button" disabled>
                                {isOpen ? 'En proceso' : 'Terminado'}
                            </button>
                            {isOpen && (
                                <button
                                    className="close-button"
                                    onClick={closeChat}
                                >
                                    Cerrar <IoMdCloseCircle size="20" />
                                </button>
                            )}
                        </div>
                    </>
                )}
            </div>
            <div className="messages-container">
                {messages.slice(0).reverse().map((message, index) => (
                    <div key={index} className={`message ${message.userId === userId ? 'sent' : 'received'}`}>
                        {message.message}
                    </div>
                ))}
            </div>
            {isOpen && (
                <form className="message-form" onSubmit={sendMessage}>
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message"
                    />
                    <button type="submit">Send</button>
                </form>
            )}
        </div>
    );
}

export default withAuth(Chat);
