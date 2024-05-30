import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoNotifications, IoSparkles } from "react-icons/io5";
import { FaUserAlt, FaHandHoldingHeart } from "react-icons/fa";
import { FaSquarePollVertical } from "react-icons/fa6";
import { RiEyeCloseFill } from "react-icons/ri";
import { IoIosChatbubbles } from "react-icons/io";
import "./NotificationScreen.scss";
import withAuth from "../extras/withAuth";

function NotificationScreen() {
    const [notifications, setNotifications] = useState([]);
    const [showAllNotifications, setShowAllNotifications] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchNotifications();
    }, [showAllNotifications]);

    async function fetchNotifications() {
        try {
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('userId');
            const endpoint = showAllNotifications ? `/api/user/me/${userId}/notifications` : `/api/user/me/${userId}/notifications/unread`;

            const response = await fetch(`http://localhost:8080${endpoint}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setNotifications(data);
            } else {
                console.error("Error fetching notifications");
            }
        } catch (error) {
            console.error("An error occurred while fetching notifications:", error);
        }
    }

    async function markAsRead(notificationId) {
        try {
            const token = localStorage.getItem('token');

            const response = await fetch(`http://localhost:8080/api/user/notification/${notificationId}/markAsSeen`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const updatedNotifications = notifications.map(notification => {
                    if (notification.id === notificationId) {
                        return {
                            ...notification,
                            seen: true
                        };
                    }
                    return notification;
                });

                setNotifications(updatedNotifications);
            } else {
                console.error("Error marking notification as read");
                const errorData = await response.json();
                console.error("Server response:", errorData);
            }
        } catch (error) {
            console.error("An error occurred while marking notification as read:", error);
        }
    }

    function handleToggleSwitch() {
        setShowAllNotifications(!showAllNotifications);
    }

    function handleNotificationClick(url) {
        console.log("Navigating to URL:", url);
        navigate(url);
    }

    return (
        <div className="notification-screen">
            <div className="header">
                <h1 className="title">Notificaciones</h1>
                <Link to="/Chats" className="icon-link">
                    <IoIosChatbubbles size={30} color="#B06BA9" />
                </Link>
            </div>
            <div className="toggle-switch-container">
                <div className="toggle-switch">
                    <span className={`toggle-label ${showAllNotifications ? 'active' : ''}`}>Todas</span>
                    <label className="switch">
                        <input type="checkbox" checked={showAllNotifications} onChange={handleToggleSwitch} />
                        <span className="slider round"></span>
                    </label>
                    <span className={`toggle-label ${!showAllNotifications ? 'active' : ''}`}>No Vistas</span>
                </div>
            </div>
            <div className="notification-list">
                {notifications.map(notification => (
                    <div key={notification.id} className="notification">
                        <div className="notification-avatar">
                            <img src={notification.userProfilePicture} alt={`${notification.username}'s profile`} />
                        </div>
                        <div className="notification-content">
                            <p><strong>{notification.username}</strong> {notification.message}</p>
                        </div>
                        {!notification.seen && (
                            <>
                                {notification.type === 'BORROW_REQUEST' && (
                                    <button
                                        className="view-notification"
                                        onClick={() => handleNotificationClick(notification.notificationURL)}
                                    >
                                        <FaHandHoldingHeart size={20} />
                                    </button>
                                )}
                                {notification.type === 'BORROW_REQUEST_ACCEPTED' && (
                                    <button
                                        className="view-notification"
                                        onClick={() => handleNotificationClick(notification.notificationURL)}
                                    >
                                        <IoIosChatbubbles size={20} />
                                    </button>
                                )}
                                <button
                                    className="mark-as-read"
                                    onClick={() => markAsRead(notification.id)}
                                >
                                    <RiEyeCloseFill size={20} />
                                </button>
                            </>
                        )}
                    </div>
                ))}
            </div>
            <div className="barra-fija">
                <Link to="/NotificationScreen" className="button">
                    <IoNotifications size={30} color="gray" />
                </Link>
                <Link to="/Feed" className="button">
                    <FaSquarePollVertical size={30} />
                </Link>
                <Link to="/InspoPage" className="button">
                    <IoSparkles size={30} />
                </Link>
                <Link to="/Profile" className="button">
                    <FaUserAlt size={30} />
                </Link>
            </div>
        </div>
    );
}

export default withAuth(NotificationScreen);
