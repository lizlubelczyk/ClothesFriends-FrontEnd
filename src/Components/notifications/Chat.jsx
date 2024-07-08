import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IoIosArrowBack, IoMdCloseCircle } from "react-icons/io";
import "./Chat.scss";
import withAuth from "../extras/withAuth";
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

function Chat() {
    const { chatId } = useParams();
    const navigate = useNavigate();
    const [chat, setChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [isOpen, setIsOpen] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [newMessage, setNewMessage] = useState("");
    const userId = localStorage.getItem('userId');
    const stompClient = useRef(null);

    useEffect(() => {
        fetchChat();
        fetchMessages();
        setupWebSocket();
        // Clean up WebSocket connection on component unmount
        return () => {
            if (stompClient.current) {
                stompClient.current.disconnect();
            }
        };
    }, []);

    function setupWebSocket() {
        const socket = new SockJS('http://localhost:8080/ws'); // Use the browser version of SockJS
        stompClient.current = Stomp.over(socket);
        stompClient.current.connect({}, () => {
            console.log('Connected to WebSocket');
            stompClient.current.subscribe(`/topic/chat/${chatId}`, (message) => {
                const receivedMessage = JSON.parse(message.body);
                // Only update messages if the chatId matches
                if (receivedMessage.chatId === parseInt(chatId)) {
                    setMessages(prevMessages => [...prevMessages, receivedMessage]);
                }
            });
        }, (error) => {
            console.error('Error connecting to WebSocket:', error);
        });
    }
    
    
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
                body: JSON.stringify({ message: newMessage }) // Ensure to stringify correctly
            });

            if (response.ok) {
                setNewMessage("");
                // No need to fetch messages here as WebSocket will update
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
