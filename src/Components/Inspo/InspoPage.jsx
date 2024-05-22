import React, { useState, useEffect } from "react";
import { IoSparkles, IoNotifications } from "react-icons/io5";
import { FaSquarePollVertical } from "react-icons/fa6";
import { TiPlus } from "react-icons/ti";
import { useNavigate, Link } from 'react-router-dom';
import withAuth from '../extras/withAuth';
import { FaHeart, FaUserAlt } from "react-icons/fa";
import "./InspoPage.scss";


function InspoPage(){
    const navigate = useNavigate();
    const [searchError, setSearchError] = useState(false);
    const [username, setUsername] = useState('');

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

    return(
        <div className= "inspo-page-container">
            <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search by username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <button onClick={handleSearch}>Search</button>
                    {searchError && <p className="error-message">{searchError}</p>}
            </div>
            <div className="barra-fija">
                <button className="button">
                    <IoNotifications />
                </button>
                <Link to="./MyFeed" className="button">
                    <FaSquarePollVertical size = {30} />
                </Link>
                <Link to="/InspoPage" className="button">
                    <IoSparkles size = {30}/>
                </Link>
                <Link to="/Profile" className="button">
                    <FaUserAlt size = {30}  />
                </Link>
            </div>
        </div>
    )
}

export default withAuth(InspoPage);