import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import "./NotificationScreen.scss";
import withAuth from "../extras/withAuth";
import { FaHeart, FaUserAlt } from "react-icons/fa";
import { IoSparkles, IoNotifications } from "react-icons/io5";
import { FaSquarePollVertical } from "react-icons/fa6";

function NotificationScreen() {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        fetchNotifications();
    }, []);

    async function fetchNotifications() {
        try {
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('userId');

            const response = await fetch(`http://localhost:8080/api/user/${userId}/notifications`, {
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

    return (
        
        <div className="notification-screen">
            <div className="header">
              
                <h1 className="title">Notificaciones</h1>
            </div>
            <div className="notification-list">
                {notifications.map(notification => (
                    <div key={notification.id} className="notification">
                        <div className="notification-avatar">
                            <img src={notification.profilePic} alt={`${notification.username}'s profile`} />
                        </div>
                        <div className="notification-content">
                            <p><strong>{notification.username}</strong> necesita tu prenda <strong>{notification.garment}</strong>.</p>
                        </div>
                    </div>
                ))}
            
            
            </div>
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

export default withAuth(NotificationScreen) ;
