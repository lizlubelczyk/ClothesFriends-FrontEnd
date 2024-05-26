import React, { useState, useEffect } from "react";
import "./ClothingItem/Subcategory.scss";
import withAuth from "../extras/withAuth";
import { useNavigate, Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

function LikedInspo(){
    const navigate = useNavigate();
    const [inspirations, setInspirations] = useState([]);

    useEffect(() => {
        fetchInspirations(); // Fetch clothing items when the component mounts
      }, []);
    
      async function fetchInspirations() {
        try {
            const token = localStorage.getItem('token'); // Retrieve the token from local storage
            const userId = localStorage.getItem('userId'); // Retrieve the user ID from local storage
        
            // Fetch clothing items from backend
            const response = await fetch(`http://localhost:8080/api/inspiration/get/${userId}/liked`, {
                headers: {
                    'Authorization': `Bearer ${token}` // Include the token in the 'Authorization' header
                }
            });
        
            if (response.ok) {
                const data = await response.json();
                setInspirations(data);
            } else {
                console.error("Error fetching clothing items");
            }
        } catch (error) {
            console.error("An error occurred while fetching clothing items:", error);
        }
    }

    function handleClick(inspirationId){
        localStorage.setItem("selectedInspirationId", inspirationId);
        navigate("/OtherInspirationDetails");
    }

    return(
        <div className="subcategory-container">
            <div className="header">
                <button className="back-button" onClick={() => navigate(-1)}> {/* Use navigate(-1) to go back */}
                    <IoIosArrowBack color="white" size="30" />
                </button>
                <h1 className="title">Inspiraciones que te gustaron</h1>
            </div>
            <div className="clothing-items-container">
                {inspirations.map((inspiration) => (
                <div key={inspiration.id} className="clothing-item" onClick={() => handleClick(inspiration.inspirationId)}>
                    <img src={inspiration.image} alt={inspiration.name} />
                </div>
                ))}
            </div>
        </div>
    )
}

export default withAuth(LikedInspo);