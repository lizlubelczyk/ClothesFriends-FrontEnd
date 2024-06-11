import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { FaCheck, FaTimes } from "react-icons/fa";
import "./BorrowRequest.scss";

function BorrowRequest() {
    const { requestId } = useParams(); // Accessing the request ID from URL params
    const [request, setRequest] = useState(null); // State to store the request details
    const [handled, setHandled] = useState(false); // State to store if the request was handled
    const navigate = useNavigate(); // Initialize the navigate function

    useEffect(() => {
        async function fetchBorrowRequest() {
            try {
                const token = localStorage.getItem("token"); // Retrieve the token from local storage

                // Fetch request details
                const requestResponse = await fetch(`http://localhost:8080/api/clothingItem/${requestId}/getBorrowRequest`, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Include the token in the 'Authorization' header
                    },
                });
                if (requestResponse.ok) {
                    const requestData = await requestResponse.json();
                    setRequest(requestData);
                } else {
                    console.error("Error fetching borrow request");
                }

                // Fetch handled status
                const handledResponse = await fetch(`http://localhost:8080/api/clothingItem/${requestId}/wasHandled`, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Include the token in the 'Authorization' header
                    },
                });
                if (handledResponse.ok) {
                    const handledData = await handledResponse.json();
                    setHandled(handledData);
                } else {
                    console.error("Error fetching handled status");
                }
            } catch (error) {
                console.error("An error occurred while fetching borrow request:", error);
            }
        }
        fetchBorrowRequest();
    }, [requestId]);

    const handleAccept = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`http://localhost:8080/api/clothingItem/${requestId}/acceptBorrowRequest`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });
            if (response.ok) {
                console.log(`Accepted request with ID: ${requestId}`);
                setHandled(true); // Mark the request as handled
                navigate('/NotificationScreen'); // Redirect to notifications page
            } else {
                console.error("Error accepting borrow request");
            }
        } catch (error) {
            console.error("An error occurred while accepting borrow request:", error);
        }
    };

    const handleReject = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`http://localhost:8080/api/clothingItem/${requestId}/rejectBorrowRequest`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });
            if (response.ok) {
                console.log(`Rejected request with ID: ${requestId}`);
                setHandled(true); // Mark the request as handled
                navigate('/NotificationScreen'); // Redirect to notifications page
            } else {
                console.error("Error rejecting borrow request");
            }
        } catch (error) {
            console.error("An error occurred while rejecting borrow request:", error);
        }
    };

    if (!request) {
        return null; // or loading indicator
    }

    return (
        <div className="borrow-request-screen">
            <div className="header">
                <button className="back-button" onClick={() => navigate(-1)}>
                    <IoIosArrowBack color="white" size="30" />
                </button>
                <h1 className="title">Solicitud de Préstamo:</h1>
            </div>
            <div className="borrow-request-list">
                <div key={request.id} className="borrow-request">
                    <div className="borrow-request-content">
                        <span className="username">@{request.username}</span>
                        <img src={request.clothingItemImage} alt="Garment" className="garment-photo" />
                        <div className="borrow-request-actions">
                            {handled ? (
                                <p>La solicitud ya fue manejada</p>
                            ) : (
                                <>
                                    <FaCheck className="action-icon accept" onClick={handleAccept} />
                                    <FaTimes className="action-icon reject" onClick={handleReject} />
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BorrowRequest;
