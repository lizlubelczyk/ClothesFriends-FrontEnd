import React, { useState, useEffect } from "react";
import { IoSparkles, IoNotifications } from "react-icons/io5";
import { FaSquarePollVertical } from "react-icons/fa6";
import { TiPlus } from "react-icons/ti";
import { useNavigate, Link } from 'react-router-dom';
import withAuth from '../extras/withAuth';
import { FaHeart, FaUserAlt } from "react-icons/fa";
import "../Profile/ClothingItem/Subcategory.scss"


function InspoPage(){
    const navigate = useNavigate();
    const [searchError, setSearchError] = useState(false);
    const [username, setUsername] = useState('');
    const [inspirations, setInspirations] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/user/search/${username}/id`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            });

            if (response.ok) {
                const userId = await response.json();
                localStorage.setItem('searchedUserId', userId);
                navigate(`/OtherUserProfile`);
            } else {
                setSearchError('User not found');
            }
        } catch (error) {
            console.error('Error searching for user:', error);
            setSearchError('Error searching for user');
        }
    };

    useEffect(() => {
        fetchInspirations(); // Fetch clothing items when the component mounts
      }, []);
    
      async function fetchInspirations() {
        try {
            const token = localStorage.getItem('token'); // Retrieve the token from local storage
            const userId = localStorage.getItem('userId'); // Retrieve the user ID from local storage
    
            // Fetch clothing items from backend
            const response = await fetch(`http://localhost:8080/api/inspiration/get/${userId}/friendsInspirations`, {
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

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        handleSearch(); // Call handleSearch function when form is submitted
    };
    
    return(
        <div className= "subcategory-container">
            <form onSubmit={handleSubmit}>
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search by username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <button type="submit">Search</button>
                    {searchError && <p className="error-message">{searchError}</p>}
                </div>
            </form>
            <div className="clothing-items-container">
                {inspirations.map((inspiration) => (
                <div key={inspiration.id} className="clothing-item" onClick={() => handleClick(inspiration.inspirationId)}>
                    <img src={inspiration.image} alt={inspiration.name} />
                </div>
                ))}
                
            </div>

            <Link to="/UploadInspiration">
                <button className="subir-post">
                        <TiPlus size={50} />
                </button>
            </Link>

            <div className="barra-fija">
                <Link to= "/NotificationScreen" className="button">
                        <IoNotifications size={30} />
                </Link>
                <Link to="/Feed" className="button">
                    <FaSquarePollVertical size = {30} />
                </Link>
                <Link to="/InspoPage" className="button">
                    <IoSparkles size = {30} color= "gray"/>
                </Link>
                <Link to="/Profile" className="button">
                    <FaUserAlt size = {30}  />
                </Link>
            </div>
        </div>
    )
}

export default withAuth(InspoPage);
