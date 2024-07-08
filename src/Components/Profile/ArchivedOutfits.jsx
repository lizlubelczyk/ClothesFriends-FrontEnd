import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import "./ClothingItem/Subcategory.scss";
import withAuth from "../extras/withAuth";

function ArchivedOutfits() {
    const [outfits, setOutfits] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchOutfits();
    }, []);

    async function fetchOutfits() {
        try {
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('userId');

            const response = await fetch(`http://localhost:8080/api/outfit/${userId}/getMyOutfits`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setOutfits(data);
            } else {
                console.error("Error fetching outfits");
            }
        } catch (error) {
            console.error("An error occurred while fetching outfits:", error);
        }
    }

    function handleClick(outfitId) {
        navigate(`/ArchivedOutfitDetails/${outfitId}`);
    }

    return(
        <div className="subcategory-container">
            <div className="header">
            <button className="back-button" onClick={() => navigate(-1)}>
                        <IoIosArrowBack color="white" size="30" />
                </button>
                <h1 className="title">Mis Outfits Archivados</h1>
            </div>
            <div className="clothing-items-container">
                {outfits.map((outfit) => (
                    <div key={outfit.id} className="clothing-item" onClick={() => handleClick(outfit.outfit_id)}>
                        <img src={outfit.image} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default withAuth(ArchivedOutfits);