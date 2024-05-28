import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { FaCheck, FaTimes } from "react-icons/fa";
import "./BorrowRequest.scss";

function BorrowRequest() {
    const [requests, setRequests] = useState([
        {
            id: 1,
            username: 'user123',
            garmentPhoto: 'https://i.imgur.com/Rw4GiZd.jpg' // URL de la imagen proporcionada
        }
    ]);

    useEffect(() => {
        // fetchBorrowRequests();
    }, []);

    async function fetchBorrowRequests() {
        try {
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('userId');

            const response = await fetch(`http://localhost:8080/api/user/${userId}/borrowRequests`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setRequests(data);
            } else {
                console.error("Error fetching borrow requests");
            }
        } catch (error) {
            console.error("An error occurred while fetching borrow requests:", error);
        }
    }

    const handleAccept = async (requestId) => {
        // Implement the logic to accept the borrow request
        console.log(`Accepted request with ID: ${requestId}`);
    };

    const handleReject = async (requestId) => {
        // Implement the logic to reject the borrow request
        console.log(`Rejected request with ID: ${requestId}`);
    };

    return (
        <div className="borrow-request-screen">
            <div className="header">
                <button className="back-button">
                    <Link to="/Profile">
                        <IoIosArrowBack color="white" size="30" />
                    </Link>
                </button>
                <h1 className="title">Solicitud de Préstamo:</h1>
            </div>
            <div className="borrow-request-list">
                {requests.map(request => (
                    <div key={request.id} className="borrow-request">
                        <div className="borrow-request-content">
                            <span className="username">@{request.username}</span>
                            <img src={request.garmentPhoto} alt="Garment" className="garment-photo" />
                            <div className="borrow-request-actions">
                                <FaCheck className="action-icon accept" onClick={() => handleAccept(request.id)} />
                                <FaTimes className="action-icon reject" onClick={() => handleReject(request.id)} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default BorrowRequest;

