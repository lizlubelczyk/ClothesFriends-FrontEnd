import React, { useState, useEffect } from "react";
import "../Profile/MyInspirationDetails";
import { IoIosArrowBack} from "react-icons/io";
import withAuth from '../extras/withAuth';
import { Link, useNavigate } from "react-router-dom";

function MyInspirationDetails(){
    const [inspiration, setInspiration] = useState({});
    const navigate = useNavigate();
    const [fullName, setFullName] = useState("");

    useEffect(() => {
        fetchInspiration();
        fetchUserName();
    }, []);

    async function fetchInspiration() {
        try {
            const token = localStorage.getItem('token'); // Retrieve the token from local storage
            const inspirationId = localStorage.getItem('selectedInspirationId'); // Retrieve the user ID from local storage

            // Fetch clothing items from backend
            const response = await fetch(`http://localhost:8080/api/inspiration/get/${inspirationId}`, {
                headers: {
                    'Authorization': `Bearer ${token}` // Include the token in the 'Authorization' header
                }
            });

            if (response.ok) {
                const data = await response.json();
                setInspiration(data);
            } else {
                console.error("Error fetching inspiration details");
            }
        } catch (error) {
            console.error("An error occurred while fetching inspiration details:", error);
        } 
    }

    async function fetchUserName() {
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
                console.error("Error fetching full name");
            }
        } catch (error) {
            console.error("An error occurred while fetching full name:", error);
        }
    }



    return(
        <div className="my-inspiration-container">
            <div className="header">
                <button className="back-button">
                    <Link to="/Profile">
                        <IoIosArrowBack color="white" size="30" />
                    </Link>
                </button>
                <h1 className="title">Inspiración</h1>
            </div>
            <div className="inspiration-details">
                <div className="outfit-details-container">
                    <div className="inspiration-details">
                        <div className="user-fullname">
                            <h2>{fullName}</h2>
                        </div>
                        <img src={inspiration.image} alt="Outfit" />
                        <div className="description-square">
                            <p>{inspiration.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withAuth(MyInspirationDetails);