import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import withAuth from '../extras/withAuth';
import { IoIosArrowBack, IoMdTrash } from "react-icons/io";
import "./MyCurrentOutfit.scss";

function MyCurrentOutfit(){
    const [hasOutfit, setHasOutfit] = useState(false);
    const [outfit, setOutfit] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        const checkOutfit = async () => {
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('userId');
            const response = await fetch(`http://localhost:8080/api/outfit/${userId}/hasOutfit`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.ok) {
                const result = await response.json();
                setHasOutfit(result);
            }
        };
        checkOutfit();
    }, []); // Empty dependency array ensures it runs only once after initial render

    useEffect(() => {
        const getOutfit = async () => {
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('userId');
            const response = await fetch(`http://localhost:8080/api/outfit/${userId}/getLatest`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.ok) {
                const data = await response.json();
                setOutfit(data);
            }
        };
        getOutfit();
    }, [hasOutfit]); // Run when hasOutfit changes

    
    const handleDeleteOutfit = () => {
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = async () => {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:8080/api/outfit/${outfit.id}/delete`, {
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




    return(
        <div className="current-outfit-container">
            <div className="header">
                <button className="back-button">
                    <Link to="/Profile">
                        <IoIosArrowBack color="white" size="30" />
                    </Link>
                </button>
                <h1 className="title">Outfit Actual</h1>
            </div>
            <div className="outfit-details">
                {hasOutfit ? (
                    <>
                        <div className="outfit-details-container">
                            <div className="outfit-details">
                                <img src={outfit.image} alt="Outfit" />
                                <div className="description-square">
                                    <p>{outfit.description}</p>
                                </div>
                            </div>
                        </div>
                        <button onClick={handleDeleteOutfit}><IoMdTrash color="red" size="30" /></button>
                    </>
                ) : (
                    <div className='outfit-details-container'>
                        <p>No tenés ningún outfit publicado</p>
                        <Link to="/UploadOutfit">
                            <button>Subir outfit</button>
                        </Link>
                    </div>
                )}
            </div>
            {showDeleteModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>¿Eliminar outfit?</h2>
                        <button onClick={handleConfirmDelete}>Sí</button>
                        <button onClick={handleCancelDelete}>No</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default withAuth(MyCurrentOutfit);