import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import "./ClothingItem/Subcategory.scss";
import withAuth from "../extras/withAuth";

function MyInspirations(){
    const [inspirations, setInspirations] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        fetchInspirations(); // Fetch clothing items when the component mounts
      }, []);
    
      async function fetchInspirations() {
        try {
            const token = localStorage.getItem('token'); // Retrieve the token from local storage
            const userId = localStorage.getItem('userId'); // Retrieve the user ID from local storage
    
            // Fetch clothing items from backend
            const response = await fetch(`http://localhost:8080/api/inspiration/get/${userId}/all`, {
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
        navigate("/MyInspirationDetails");
    }

    return(
        <div className="subcategory-container">
            <div className="header">
                <button className="back-button">
                <Link to="/Profile">
                    <IoIosArrowBack color="white" size="30" />
                </Link>
                </button>
                <h1 className="title">Mi Inspiración</h1>
            </div>
            <div className="clothing-items-container">
                {inspirations.map((inspiration) => (
                <div key={inspiration.id} className="clothing-item" onClick={() => handleClick(inspiration.inspirationId)}>
                    <img src={inspiration.image.split("public")[1]} alt={inspiration.name} />
                </div>
                ))}
            </div>
        </div>
    );
}

export default withAuth(MyInspirations);