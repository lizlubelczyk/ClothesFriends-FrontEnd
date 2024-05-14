import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { TbHanger } from "react-icons/tb";

import "./UploadClothingItem.scss";
import withAuth from "../../extras/withAuth";
import { FaTshirt, FaCamera, FaPen, FaHandHoldingHeart } from "react-icons/fa"; // Import the additional icon



function UploadClothingItem() {
  const [selectedCategory, setSelectedCategory] = useState(""); // Tracks the selected main category
  const [showMainMenu, setShowMainMenu] = useState(false); // Controls visibility of the main category menu
  const [showSubcategoryMenu, setShowSubcategoryMenu] = useState(false); // Controls visibility of the subcategory menu
  const [selectedSubcategory, setSelectedSubcategory] = useState(""); // Tracks the selected subcategory
  const [name, setName] = useState(""); // Clothing item name
  const [description, setDescription] = useState(""); // Description
  const [category, setCategory] = useState(""); // Category
  const [subcategory, setSubcategory] = useState(""); // Subcategory
  const [isAvailable, setIsAvailable] = useState(true); // Availability
  const [image, setImage] = useState(null); // Image file
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false); // Upload success state


  const categories = {
    Tops: ["Buzo", "Sweater", "Campera", "Top", "Remera"],
    Bottoms: ["Short", "Pollera", "Pantalón", "Vestidos", "Monos"],
    Accesorios: ["Carteras", "Bijou", "Zapatos", "Cinturones", "Gorros"],
  };

  const toggleMainMenu = () => {
    setShowMainMenu(!showMainMenu); // Toggle the main menu's visibility
  };

  const handleMainCategoryClick = (category) => {
    setSelectedCategory(category); // Set the selected main category
    setShowMainMenu(false); // Hide the main menu
    setShowSubcategoryMenu(true); // Show the subcategory menu
  };

  const handleSubcategoryClick = (subcategory) => {
    setSelectedSubcategory(subcategory); // Set the selected subcategory
    setShowSubcategoryMenu(false); // Hide the subcategory menu
  };

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
  

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
    }
  };

  const closeMainMenu = () => {
    setShowMainMenu(false); // Hide the main category menu
  };

  const closeSubcategoryMenu = () => {
    setShowSubcategoryMenu(false); // Hides the subcategory menu
  };



  const toggleAvailability = () => {
    setIsAvailable(!isAvailable); // Toggle the availability state
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem('token'); // Retrieve the token from local storage
    const userId = localStorage.getItem('userId'); // Retrieve the user ID from local storage

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('image', image);
    formData.append('subcategory', selectedSubcategory);
    formData.append('available', isAvailable);
    formData.append('userId', userId); // Include the user ID

    const response = await fetch(`http://localhost:8080/api/clothingItem/${userId}/create`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}` // Include the token in the 'Authorization' header
        },
        body: formData
    });

    if (response.ok) {
        console.log('Clothing item created successfully');
        setUploadSuccess(true);
    } else {
        console.error('Error creating clothing item:', await response.text());
    }
  };


  return (
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
        <div className="input">
          <TbHanger size={22} className="icon" strokewidth={5} />
          <input
            className="field"
            type="text"
            placeholder="Nombre de la Prenda"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <button className="select-category-button" onClick={toggleMainMenu}>
          <FaTshirt size={20} color= "black" className="icon" />
          {selectedSubcategory ? selectedSubcategory : "Seleccionar Categoría"}
        </button>

        {showMainMenu && (
          <div className="main-category-menu">
            <button className="close-button" onClick={closeMainMenu}>
              Cerrar
            </button>
            <h3>Selecciona una Categoría:</h3>
            <div className="main-category-items">
              {Object.keys(categories).map((category, index) => (
                <div
                  key={index}
                  className="main-category-item"
                  onClick={() => handleMainCategoryClick(category)}
                >
                  {category}
                </div>
              ))}
            </div>
          </div>
        )}

        {showSubcategoryMenu && (
          <div className="subcategory-menu">
            <h3>Subcategorías de {selectedCategory}:</h3>
            <div className="subcategory-items">
              {categories[selectedCategory].map((subcategory, index) => (
                <div
                  key={index}
                  className="subcategory-item"
                  onClick={() => handleSubcategoryClick(subcategory)}
                >
                  {subcategory}
                </div>
              ))}
            </div>

            <button className="close-button" onClick={closeSubcategoryMenu}>
              Cerrar
            </button>
          </div>
        )}

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
          <FaPen size={20} className="icon" strokewidth={5} />
          <textarea
            className="field"
            type="text"
            placeholder="Descripción de la Prenda"
            value = {description}
            onChange={(e)=> setDescription(e.target.value)}
          />
        </div>

        {/* Text and icon aligned to the left */}
        <div className="toggle-container">
          <div className="text-with-icon"> {/* New container for text and icon */}
            <FaHandHoldingHeart size={22} color="black" className="icon" />
            <span>
              {isAvailable ? "Disponible para préstamo" : "No disponible para préstamo"}
            </span>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={isAvailable}
              onChange={() => setIsAvailable(!isAvailable)}
            />
            <span className="slider round"></span>
          </label>
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
  );
}

export default withAuth(UploadClothingItem);
