import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack, IoMdTrash } from "react-icons/io";
import "./ClothingItemDetails.scss";
import withAuth from "../../extras/withAuth";

function MyClothingItemDetails() {
    const [clothingItem, setClothingItem] = useState({}); // Clothing item state
    const [isAvailable, setIsAvailable] = useState(true); // Availability state
    const navigate = useNavigate();
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    useEffect(() => {
        fetchClothingItem(); // Fetch clothing item when the component mounts
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

    async function toggleAvailability() {
        try {
            const token = localStorage.getItem("token");
            const clothingItemId = localStorage.getItem("selectedClothingItemId");

            const response = await fetch(`http://localhost:8080/api/clothingItem/changeAvailable/${clothingItemId}`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const updatedItem = await response.json();
                setIsAvailable(updatedItem.available);
            } else {
                console.error("Error changing availability");
            }
        } catch (error) {
            console.error("An error occurred while changing availability:", error);
        }
    }

    const handleDeleteItem = () => {
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = async () => {
        const token = localStorage.getItem('token');
        const clothingItemId = localStorage.getItem('selectedClothingItemId');
        const response = await fetch(`http://localhost:8080/api/clothingItem/${clothingItemId}/delete`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.ok) {
            // Show success message
            alert("Outfit deleted successfully!");
            // Close modal
            setShowDeleteModal(false);
            // Refresh page
            window.location.reload();
        } else {
            // Handle error
            alert("Failed to delete outfit");
        }
    };


    const handleCancelDelete = () => {
        setShowDeleteModal(false);
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
                    </div>
                </div>
                <div className="toggle-container">
                    <div className="text-with-icon">
                        <span>
                            {isAvailable ? "Disponible para préstamo" : "No disponible para préstamo"}
                        </span>
                    </div>
                    <label className="toggle-switch">
                        <input
                            type="checkbox"
                            checked={isAvailable}
                            onChange={() => {
                                setIsAvailable(!isAvailable); // Update the state locally
                                toggleAvailability(); // Trigger the backend update
                            }}
                        />
                        <span className="slider round"></span>
                    </label>
                    <button onClick={handleDeleteItem}><IoMdTrash color="red" size="30" /></button>

                </div>
            </div>
            {showDeleteModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>¿Eliminar prenda?</h2>
                        <button onClick={handleConfirmDelete}>Sí</button>
                        <button onClick={handleCancelDelete}>No</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default withAuth(MyClothingItemDetails);
