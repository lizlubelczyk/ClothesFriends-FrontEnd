import React, { useState, useEffect } from 'react';
import withAuth from '../extras/withAuth';
import '../Profile/MyCurrentOutfit.scss';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';

function OtherCurrentOutfit() {
    const [hasOutfit, setHasOutfit] = useState(false);
    const [outfit, setOutfit] = useState([]);
    const navigate = useNavigate();
    
    useEffect(() => {
        const checkOutfit = async () => {
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('searchedUserId');
            const response = await fetch(`http://localhost:8080/api/outfit/${userId}/hasOutfit`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.ok) {
                const result = await response.json();
                setHasOutfit(result);
            }
        };
        checkOutfit();
    }, []); // Empty dependency array ensures it runs only once after initial render

    useEffect(() => {
        const getOutfit = async () => {
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('searchedUserId');
            const response = await fetch(`http://localhost:8080/api/outfit/${userId}/getLatest`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.ok) {
                const data = await response.json();
                setOutfit(data);
            }
        };
        getOutfit();
    }, [hasOutfit]); // Run when hasOutfit changes

    return(
        <div className="current-outfit-container">
            <div className="header">
                <button className="back-button">
                    <Link to="/OtherUserProfile">
                        <IoIosArrowBack color="white" size="30" />
                    </Link>
                </button>
                <h1 className="title">Outfit Actual</h1>
            </div>
            <div className="outfit-details">
                {hasOutfit ? (
                    <>
                        <div className="outfit-details-container">
                            <div className="outfit-details">
                                <img src={outfit.image} alt="Outfit" />
                                <div className="description-square">
                                    <p>{outfit.description}</p>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div>
                        <p>Este usuario no tiene ningún outfit publicado</p>
                    </div>
                )}
            </div>
        </div>
    )

}

export default withAuth(OtherCurrentOutfit);