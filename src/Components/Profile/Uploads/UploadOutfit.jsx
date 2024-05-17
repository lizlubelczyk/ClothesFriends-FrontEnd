import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import "./UploadClothingItem.scss";
import withAuth from "../../extras/withAuth";
import { FaTshirt, FaCamera, FaPen, FaHandHoldingHeart } from "react-icons/fa"; // Import the additional icon

function UploadOutfit() {
    const [imagePreview, setImagePreview] = useState(null);
    const [description, setDescription] = useState("");
    const [uploadSuccess, setUploadSuccess] = useState(false); // Upload success state
    const [image, setImage] = useState(null); // Image file
    
    const handleImageUpload = (event) => {
        const file = event.target.files[0]; // Get the selected image
        setImage(file); // Update the selected image
      
        // Create a new FileReader object
        const reader = new FileReader();
      
        // Set the imagePreview state when the file has been read
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
      
        // Start reading the file as a DataURL
        if (file) {
          reader.readAsDataURL(file);
        }
      };
      
      

      const handleSubmit = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");


        const formData = new FormData();
        formData.append("description", description);
        formData.append("image", image);
        formData.append("userId", userId);

        const response = await fetch(`http://localhost:8080/api/outfit/${userId}/create`,{
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        });

        if(response.ok){
            console.log("Inspiration uploaded successfully");
            setUploadSuccess(true);
        } else {
            console.error('Error creating clothing item:', await response.text());
                
        }
    };

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
            <div className="image-upload-container">
                {/* File input for image upload */}
                <input
                    type="file"
                    className="image-upload-input" // Hidden input
                    onChange={handleImageUpload}
                />

                <button
                    className="select-category-button" // Custom-styled button
                    onClick={() => document.querySelector(".image-upload-input").click()} // Open file dialog
                >
                    <FaCamera size={20} color="black" className="icon" />
                    Seleccionar Imagen
                </button>

                {/* Image preview */}
                {imagePreview && (
                    <img
                    src={imagePreview}
                    alt="Preview"
                    className="image-preview"
                    />
                )}
            </div>
            <div className="input-descripción">
                <FaPen size={20} className="icon" strokeWidth={5} />
                <textarea
                    className="field"
                    type="text"
                    placeholder="Descripción de la Prenda"
                    value = {description}
                    onChange={(e)=> setDescription(e.target.value)}
                />
            </div>

            <button className="subir-button" onClick={handleSubmit}>Subir Prenda</button>

            </div>

            {uploadSuccess && (
            <div className="upload-success-square">
                <p>Item uploaded successfully!</p>
                <Link to="/Uploads" className="close-button">
                  Close
                </Link>
            </div>
        )}

            
        </div>
    )

}
export default withAuth(UploadOutfit);