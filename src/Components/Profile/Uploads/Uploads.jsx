import React from "react";
import "./Uploads.scss";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate, Link } from "react-router-dom"; // Import useNavigate
import withAuth from "../../extras/withAuth";

function Uploads() {
    const navigate = useNavigate(); // Initialize useNavigate hook

    return (
        <div className="uploads-container">
            <div className="header">
                <button className="back-button" onClick={() => navigate(-1)}> {/* Navigate back to previous page */}
                    <IoIosArrowBack color="white" size="30" />
                </button>
                <h1 className="title">Subir a mí perfil</h1>
            </div>
            <div className="buttons-container">
                <Link to="/UploadClothingItem">
                    <button className="profile-button">PRENDA</button>
                </Link>                
                <Link to="/UploadOutfit">
                    <button className="profile-button">OUTFIT</button>
                </Link>                 
                <Link to="/UploadInspiration">
                    <button className="profile-button">INSPIRACIÓN</button>
                </Link> 
            </div>
        </div>
    );
}

export default withAuth(Uploads);
