import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowBack, IoMdTrash } from "react-icons/io";
import withAuth from "../extras/withAuth";
import "./MyInspirationDetails.scss";

function MyInspirationDetails() {
    const [inspiration, setInspiration] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    useEffect(() => {
        fetchInspiration();
    }, []);

    async function fetchInspiration() {
        try {
            const token = localStorage.getItem('token'); // Retrieve the token from local storage
            const inspirationId = localStorage.getItem('selectedInspirationId'); // Retrieve the user ID from local storage

            // Fetch clothing items from backend
            const response = await fetch(`http://localhost:8080/api/inspiration/get/${inspirationId}`, {
                headers: {
                    'Authorization': `Bearer ${token}` // Include the token in the 'Authorization' header
                }
            });

            if (response.ok) {
                const data = await response.json();
                setInspiration(data);
            } else {
                console.error("Error fetching inspiration details");
            }
        } catch (error) {
            console.error("An error occurred while fetching inspiration details:", error);
        } finally {
            setLoading(false);
        }
    }

    const handleDeleteInspiration = () => {
        setShowDeleteModal(true);
    }

    const handleConfirmDelete = async () => {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:8080/api/inspiration/delete/${inspiration.id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json", // Indicates the format of the request body
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            // Show success message
            alert("Inspiration deleted successfully!");
            navigate("/MyInspirations"); // Navigate back to the inspirations page
        } else {
            // Handle error
            alert("Failed to delete inspiration");
        }
    };

    const handleCancelDelete = () => {
        setShowDeleteModal(false);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!inspiration) {
        return <div>No inspiration found</div>;
    }

    return (
        <div className="my-inspiration-container"> 
            <div className="header">
                <button className="back-button">
                    <Link to="/Profile">
                        <IoIosArrowBack color="white" size="30" />
                    </Link>
                </button>
                <h1 className="title">Inspiración</h1>
            </div>
            <div className="inspiration-details">
                <div className="outfit-details-container">
                    <div className="inspiration-details">
                        <img src={inspiration.image} alt="Outfit" />
                        <div className="description-square">
                            <p>{inspiration.description}</p>
                        </div>
                    </div>
                </div>
                <button onClick={handleDeleteInspiration}>
                    <IoMdTrash color="red" size="30" />
                </button>
            </div>

            {showDeleteModal && (
                <div className="delete-modal">
                    <p>Are you sure you want to delete this inspiration?</p>
                    <button onClick={handleConfirmDelete}>Yes</button>
                    <button onClick={handleCancelDelete}>No</button>
                </div>
            )}
        </div>
    );
}

export default withAuth(MyInspirationDetails);
