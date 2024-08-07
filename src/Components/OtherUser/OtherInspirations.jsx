import React, { useState, useEffect }  from "react"
import "../Profile/ClothingItem/Subcategory.scss";
import { IoIosArrowBack } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import withAuth from "../extras/withAuth";

function OtherInspirations(){
    const [inspirations, setInspirations] = useState([]);
    const navigate = useNavigate();
    const [fullName, setFullName] = useState('');

    useEffect(() => {
        const fetchFullName = async () => {
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('searchedUserId');
      
            try {
              const response = await fetch(`http://localhost:8080/api/user/get/${userId}/fullname`, {
                method: 'GET',
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
              });
      
              if (response.ok) {
                const fullName = await response.text();
                setFullName(fullName);
              } else {
                console.error('Error fetching full name');
              }
            } catch (error) {
              console.error('Error:', error);
            }
          };
          fetchFullName();
        fetchInspirations(); // Fetch clothing items when the component mounts
      }, []);
    
      async function fetchInspirations() {
        try {
            const token = localStorage.getItem('token'); // Retrieve the token from local storage
            const userId = localStorage.getItem('searchedUserId'); // Retrieve the user ID from local storage
    
            // Fetch clothing items from backend
            const response = await fetch(`http://localhost:8080/api/inspiration/get/${userId}/all`, {
                headers: {
                    'Authorization': `Bearer ${token}` // Include the token in the 'Authorization' header
                }
            });
    
            if (response.ok) {
                const data = await response.json();
                setInspirations(data);
            } else {
                console.error("Error fetching clothing items");
            }
        } catch (error) {
            console.error("An error occurred while fetching clothing items:", error);
        }
    }

    function handleClick(inspirationId){
        localStorage.setItem("selectedInspirationId", inspirationId);
        navigate("/OtherInspirationDetails");
    }

    return(
        <div className="subcategory-container">
            <div className="header">
            <button className="back-button" onClick={() => navigate(-1)}>
                    <IoIosArrowBack color="white" size="30" />
                </button>
                <h1 className="title">Inspiraciones de {fullName} </h1>
            </div>
            <div className="clothing-items-container">
            {inspirations.map((inspiration) => (
                <div key={inspiration.id} className="clothing-item" onClick={() => handleClick(inspiration.inspirationId)}>
                    <img src={inspiration.image} alt={inspiration.name} />
                </div>
                ))}
            </div>
        </div>
    );
}

export default withAuth(OtherInspirations);