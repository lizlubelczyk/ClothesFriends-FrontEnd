import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack, IoMdTrash } from "react-icons/io";
import "../ClothingItem/ClothingItemDetails.scss";
import { FaHandHoldingHeart } from "react-icons/fa";

function PublicClothingItemDetails() {
    const [clothingItem, setClothingItem] = useState({}); // Clothing item state
    const [isAvailable, setIsAvailable] = useState(true); // Availability state
    const navigate = useNavigate();
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    useEffect(() => {
        fetchClothingItem(); // Fetch clothing item when the component mounts
    }, []);

    async function fetchClothingItem() {
        try {
            const itemId = localStorage.getItem("selectedClothingItemId"); 

            const response = await fetch(`http://localhost:8080/api/clothingItem/getClothingItemPublic/${itemId}`, {
                headers: {
                    'Content-Type': 'application/json',
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
            </div>
        </div>
    );
}

export default PublicClothingItemDetails;
        