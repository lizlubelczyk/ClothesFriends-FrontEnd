import React from "react"
import "./Uploads.scss"
import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";
import withAuth from "../../extras/withAuth";




function Uploads(){

    return(
        <div className="uploads-container">
            <div className="header">
                <button className="back-button" onClick={() => {/* Navigate back to profile page */}}>
                <Link to="/profile">
                    <IoIosArrowBack color="white" size="30" />
                </Link>
                </button>
                <h1 className="title">Subir a mí perfil</h1>
            </div>
            <div className="buttons-container">
                <Link to="/UploadClothingItem">
                    <button className="profile-button">PRENDA</button>
                </Link>                
                <button className="profile-button">OUTFIT</button>
                <Link to="/UploadInspiration">
                    <button className="profile-button">INSPIRACIÓN</button>
                </Link> 
            </div>

        </div>
        


    )
}

export default withAuth(Uploads)


