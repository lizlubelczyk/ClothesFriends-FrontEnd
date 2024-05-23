import React, { useEffect, useState } from 'react';
import './Feed.scss';
import pfp from '../Assets/pfp.jpg';
import img from '../Assets/img.jpg';
import { IoSparkles, IoNotifications } from "react-icons/io5";
import { FaSquarePollVertical } from "react-icons/fa6";
import { TiPlus } from "react-icons/ti";
import { FaHeart, FaUserAlt } from "react-icons/fa";
import { FaHeartBroken } from "react-icons/fa";
import { BiSolidComment } from "react-icons/bi";
import { useNavigate, Link } from 'react-router-dom';
import withAuth from '../extras/withAuth';

function Feed() {
    const navigate = useNavigate();
    const [outfits, setOutfits] = useState([]);

    useEffect(() => {
        fetchOutfits();
    }, []);

    async function fetchOutfits() {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');

        try {
            const response = await fetch(`http://localhost:8080/api/outfit/get/${userId}/friendOutfits`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                const updatedOutfits = await Promise.all(data.map(async (outfit) => {
                    const voteStatus = await fetchVoteStatus(outfit.outfitId, userId);
                    return { ...outfit, voteStatus };
                }));
                setOutfits(updatedOutfits);
            } else {
                console.error('Error fetching outfits');
            }
        } catch (error) {
            console.error('An error occurred while fetching outfits:', error);
        }
    }

    async function fetchVoteStatus(outfitId, userId) {
        const token = localStorage.getItem('token');

        try {
            const response = await fetch(`http://localhost:8080/api/outfit/${outfitId}/${userId}/getVoteStatus`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                return data;
            } else {
                console.error('Error fetching vote status');
                return null;
            }
        } catch (error) {
            console.error('An error occurred while fetching vote status:', error);
            return null;
        }
    }

    async function handleVote(outfitId, voteType) {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');

        try {
            const response = await fetch(`http://localhost:8080/api/outfit/${outfitId}/${userId}/vote`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(voteType),
            });

            if (response.ok) {
                // Refresh outfits after vote is processed
                fetchOutfits();
            } else {
                console.error('Error voting on outfit');
            }
        } catch (error) {
            console.error('An error occurred while voting on outfit:', error);
        }
    }

    return (
        <div className="container">
            {outfits.map((outfit) => (
                <div key={outfit.outfitId} className="publicacion">
                    <div className="perfil-usuario">
                        <img src={outfit.profilePicture || pfp} alt="Perfil" />
                        <span>{outfit.username}</span>
                    </div>
                    <img src={outfit.image || img} alt="Outfit" />
                    <div className="descripcion">{outfit.description}</div>
                    <div className="botones">
                        <button
                            onClick={() => handleVote(outfit.outfitId, 'LIKE')}
                            disabled={outfit.voteStatus?.hasVoted && outfit.voteStatus.voteType === 'DISLIKE'}
                            className={outfit.voteStatus?.voteType === 'LIKE' ? 'liked' : ''}
                        >
                            <FaHeart />
                        </button>
                        <button
                            onClick={() => handleVote(outfit.outfitId, 'DISLIKE')}
                            disabled={outfit.voteStatus?.hasVoted && outfit.voteStatus.voteType === 'LIKE'}
                            className={outfit.voteStatus?.voteType === 'DISLIKE' ? 'disliked' : ''}
                        >
                            <FaHeartBroken />
                        </button>
                        <button className="comentarios">
                            <BiSolidComment />
                        </button>
                    </div>
                </div>
            ))}

            <Link to="/UploadOutfit">
                <button className="subir-post">
                    <TiPlus size={50} />
                </button>
            </Link>

            <div className="barra-fija">
                <button className="button">
                    <IoNotifications />
                </button>
                <Link to="/Feed" className="button">
                    <FaSquarePollVertical size={30} color="gray" />
                </Link>
                <Link to="/InspoPage" className="button">
                    <IoSparkles size={30} />
                </Link>
                <Link to="/Profile" className="button">
                    <FaUserAlt size={30} />
                </Link>
            </div>
        </div>
    );
}

export default withAuth(Feed);
