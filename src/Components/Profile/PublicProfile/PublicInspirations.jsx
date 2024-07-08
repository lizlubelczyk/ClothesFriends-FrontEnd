import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import "../ClothingItem/Subcategory.scss";

function PublicInspirations() {
    const [inspirations, setInspirations] = useState([]);
    const navigate = useNavigate();
    const [fullName, setFullName] = useState('');

    useEffect(() => {
        fetchInspirations(); // Fetch clothing items when the component mounts
        fetchFullName();
    }, []);

    async function fetchInspirations() {
        try {
            const userId = localStorage.getItem('searchedUserId'); // Retrieve the user ID from local storage
            const response = await fetch(`http://localhost:8080/api/inspiration/getPublic/${userId}/all`, {
                headers: {
                    'Content-Type': 'application/json'
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

    async function fetchFullName() {
        try {
            const userId = localStorage.getItem('searchedUserId'); // Retrieve the user ID from local storage
            const response = await fetch(`http://localhost:8080/api/user/me/${userId}/getPublicFullName`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const data = await response.json();
                setFullName(data);
            } else {
                console.error("Error fetching full name");
            }
        } catch (error) {
            console.error("An error occurred while fetching full name:", error);
        }
    }

    function handleClick(inspirationId) {
        navigate(`/PublicInspirationDetails/${inspirationId}`);
    }

    return (
        <div className="subcategory-container">
            <div className="header">
                <button className="back-button" onClick={() => navigate(-1)}>
                    <IoIosArrowBack color="white" size="30" />
                </button>
                <h1 className="title">Inspiraciones de {fullName}</h1>
            </div>
            <div className="clothing-items-container">
                {inspirations.map((inspiration) => (
                    <div key={inspiration.id} className="clothing-item" onClick={() => handleClick(inspiration.inspirationId)}>
                        <img src={inspiration.image} alt={inspiration.name} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PublicInspirations;