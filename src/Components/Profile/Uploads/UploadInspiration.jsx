import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import "./UploadClothingItem.scss";
import withAuth from "../../extras/withAuth";
import { FaTshirt, FaCamera, FaPen, FaHandHoldingHeart } from "react-icons/fa"; // Import the additional icon


function UploadInspiration(){

    return(

        <div className="uploadclothingitem-container">
            <div className="header">
                <button className="back-button">
                <Link to="/Uploads">
                    <IoIosArrowBack color="white" size="30" />
                </Link>
                </button>
                <h1 className="title">Subir a mí perfil</h1>
            </div>
            <div className="square1">
                <input
                type="file"
                className="image-upload-input" // Hidden input
                //onChange={handleImageUpload}
                style={{ display: "none" }} // Keep the input hidden
                />

                <button
                className="select-category-button" // Custom-styled button
                onClick={() => document.querySelector(".image-upload-input").click()} // Open file dialog
                >
                <FaCamera size={20} color="black" className="icon" />
                Seleccionar Imagen
                </button>

        <div className="input-descripción">
          <FaPen size={20} className="icon" strokewidth={5} />
          <textarea
            className="field"
            type="text"
            placeholder="Descripción de la Prenda"
            //value = {description}
            //onChange={(e)=> setDescription(e.target.value)}
          />
        </div>
            </div>
        </div>
    )

}
export default withAuth(UploadInspiration)