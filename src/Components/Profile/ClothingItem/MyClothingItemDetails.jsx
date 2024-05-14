import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import "./ClothingItemDetails.scss";
import withAuth from "../../extras/withAuth";

function MyClothingItemDetails() {
    const [clothingItem, setClothingItem] = useState({}); // Clothing item state
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        fetchClothingItem(); // Fetch clothing item when the component mounts
    }, []);

    async function fetchClothingItem() {
        try{
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
        } else {
            console.error("Error fetching clothing item");
        }   
    }catch (error) {
        console.error("An error occurred while fetching clothing item:", error);
    }
}

    return (
        <div className="myclothingitem-container" onClick={()=> navigate(-1)}>
            <div className="header">
                <button className="back-button">
                    <IoIosArrowBack color="white" size="30" />
                </button>
                <h1 className="title">{clothingItem.name}</h1>
            </div>
        </div>
    );
}

export default withAuth(MyClothingItemDetails);
