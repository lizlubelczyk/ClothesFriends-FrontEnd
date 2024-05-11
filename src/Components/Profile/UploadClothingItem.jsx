import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { TbHanger } from "react-icons/tb";

import "./UploadClothingItem.scss";
import withAuth from "../extras/withAuth";
import { FaTshirt, FaCamera, FaPen, FaHandHoldingHeart } from "react-icons/fa"; // Import the additional icon



function UploadClothingItem() {
  const [selectedCategory, setSelectedCategory] = useState(""); // Tracks the selected main category
  const [showMainMenu, setShowMainMenu] = useState(false); // Controls visibility of the main category menu
  const [showSubcategoryMenu, setShowSubcategoryMenu] = useState(false); // Controls visibility of the subcategory menu
  const [selectedSubcategory, setSelectedSubcategory] = useState(""); // Tracks the selected subcategory
  const [selectedImage, setSelectedImage] = useState(null); // Tracks the selected image
  const[isAvailable, setIsAvailable] = useState(true); // Tracks the availability of the item

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
    setSelectedImage(file); // Update the selected image
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

        {/* File input for image upload */}
        <input
          type="file"
          className="image-upload-input" // Hidden input
          onChange={handleImageUpload}
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



        <button className="subir-button">Subir Prenda</button>
      </div>
    </div>
  );
}

export default withAuth(UploadClothingItem);
