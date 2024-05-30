import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack, IoMdTrash } from "react-icons/io";
import "../Profile/ClothingItem/ClothingItemDetails.scss";
import withAuth from '../extras/withAuth';
import { FaHandHoldingHeart } from "react-icons/fa";


function OtherClothingItemDetails() {
    const [clothingItem, setClothingItem] = useState({}); // Clothing item state
    const [isAvailable, setIsAvailable] = useState(true); // Availability state
    const [hasRequested, setHasRequested] = useState(false); // Has the user already requested
    const [showBorrowModal, setShowBorrowModal] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchClothingItem(); // Fetch clothing item when the component mounts
        fetchHasRequested();
    }, []);

    async function fetchClothingItem() {
        try {
            const token = localStorage.getItem("token"); // Retrieve the token from local storage
            const itemId = localStorage.getItem("selectedClothingItemId"); // Retrieve the clothing item ID from local storage

            const response = await fetch(`http://localhost:8080/api/clothingItem/get/${itemId}`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Include the token in the 'Authorization' header
                },
            });

            if (response.ok) {
                const data = await response.json();
                setClothingItem(data);
                setIsAvailable(data.available); // Set the initial state of isAvailable based on fetched data
            } else {
                console.error("Error fetching clothing item");
            }
        } catch (error) {
            console.error("An error occurred while fetching clothing item:", error);
        }
    }

    async function fetchHasRequested() {
        try {
            const token = localStorage.getItem("token"); // Retrieve the token from local storage
            const itemId = localStorage.getItem("selectedClothingItemId"); // Retrieve the clothing item ID from local storage
            const userId = localStorage.getItem('userId'); // Retrieve the user ID from local storage

            const response = await fetch(`http://localhost:8080/api/clothingItem/${userId}/${itemId}/wasRequested`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Include the token in the 'Authorization' header
                },
            });

            if (response.ok) {
                const data = await response.json();
                setHasRequested(data);
            } else {
                console.error("Error fetching request status");
            }
        } catch (error) {
            console.error("An error occurred while fetching request status:", error);
        }
    }

    const handleBorrowItem = () => {
        if (!isAvailable) {
            setMessage("La prenda no está disponible");
            setShowMessage(true);
        } else if (hasRequested) {
            setMessage("Ya hiciste una solicitud");
            setShowMessage(true);
        } else {
            setShowBorrowModal(true);
        }
    };

    const handleConfirmBorrow = async () => {
        const token = localStorage.getItem('token');
        const clothingItemId = localStorage.getItem('selectedClothingItemId');
        const userId = localStorage.getItem('userId');
        const response = await fetch(`http://localhost:8080/api/clothingItem/${clothingItemId}/borrowrequest/${userId}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.ok) {
            // Show success message
            alert("Outfit borrow request sent successfully!");
            // Close modal
            setShowBorrowModal(false);
            // Refresh page
            window.location.reload();
        } else {
            // Handle error
            alert("Failed to send request outfit");
        }
    };

    const handleCancelBorrow = () => {
        setShowBorrowModal(false);
    };

    const handleCloseMessage = () => {
        setShowMessage(false);
    };

    return (
        <div className="myclothingitem-container">
            <div className="header">
                <button className="back-button" onClick={() => navigate(-1)}>
                    <IoIosArrowBack color="white" size="30" />
                </button>
                <h1 className="title">{clothingItem.name}</h1>
            </div>
            <div className="outfit-details">
                <div className="outfit-details-container">
                    <div className="outfit-details">
                        <img src={clothingItem.image} alt="Clothing Item" />
                        <div className="description-square">
                            <p>{clothingItem.description}</p>
                        </div>
                        <div className="borrow-button">
                            <button onClick={handleBorrowItem}>
                                <div className="icon-text-container">
                                    <FaHandHoldingHeart size={30} color="white" />
                                    <p>Pedir prestado</p>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {showBorrowModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>¿Pedir la prenda prestada?</h2>
                        <button onClick={handleConfirmBorrow}>Sí</button>
                        <button onClick={handleCancelBorrow}>No</button>
                    </div>
                </div>
            )}
            {showMessage && (
                <div className="upload-success-square">
                    <p>{message}</p>
                    <button className="close-button" onClick={handleCloseMessage}>Cerrar</button>
                </div>
            )}
        </div>
    );
}

export default withAuth(OtherClothingItemDetails);