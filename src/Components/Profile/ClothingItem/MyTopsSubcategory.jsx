import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import "./Subcategory.scss";

function MyTopsSubcategory() {
  const [clothingItems, setClothingItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchClothingItems(); // Fetch clothing items when the component mounts
  }, []);

  async function fetchClothingItems() {
    try {
        const token = localStorage.getItem('token'); // Retrieve the token from local storage
        const userId = localStorage.getItem('userId'); // Retrieve the user ID from local storage

        // Fetch clothing items from backend
        const response = await fetch(`http://localhost:8080/api/clothingItem/getAll/${userId}/Top`, {
            headers: {
                'Authorization': `Bearer ${token}` // Include the token in the 'Authorization' header
            }
        });

        if (response.ok) {
            const data = await response.json();
            setClothingItems(data);
        } else {
            console.error("Error fetching clothing items");
        }
    } catch (error) {
        console.error("An error occurred while fetching clothing items:", error);
    }
}

function handleClick(clothingItemId) {
    // Save clothing item ID in local storage
    localStorage.setItem("selectedClothingItemId", clothingItemId);
    // Navigate to clothing item details page
    navigate("/MyClothingItemDetails"); // Adjust route as per your application
}


  return (
    <div className="subcategory-container">
      <div className="header">
        <button className="back-button">
          <Link to="/MyItems">
            <IoIosArrowBack color="white" size="30" />
          </Link>
        </button>
        <h1 className="title">Tops</h1>
      </div>
      <div className="clothing-items-container">
        {clothingItems.map((item) => (
          <div key={item.id} className="clothing-item" onClick={() => handleClick(item.id)}>
            <img src={item.image} alt={item.name} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyTopsSubcategory;
