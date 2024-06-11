import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './MyCurrentOutfit.scss';
import { FaHeartBroken, FaHeart } from 'react-icons/fa';
import { BiSolidComment } from 'react-icons/bi';
import { IoIosArrowBack, IoMdTrash } from 'react-icons/io';

function ArchivedOutfitDetails() {
    const { outfitId } = useParams();
    const [outfit, setOutfit] = useState(null);
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const [showComments, setShowComments] = useState(false);
    const [comments, setComments] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                
                // Check if outfitId exists and is valid
                if (!outfitId) {
                    console.error('Invalid outfitId:', outfitId);
                    return;
                }
                
                const outfitResponse = await fetch(`http://localhost:8080/api/outfit/${outfitId}/getOutfitById`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (outfitResponse.ok) {
                    const data = await outfitResponse.json();
                    setOutfit(data);
                    fetchLikesDislikesComments(outfitId, token);
                } else {
                    console.error('Failed to fetch outfit details:', outfitResponse.statusText);
                }
            } catch (error) {
                console.error('An error occurred while fetching outfit data:', error);
            }
        };

        fetchData();
    }, [outfitId]);

    const fetchLikesDislikesComments = async (outfitId, token) => {
        try {
            // Fetch likes
            const likesResponse = await fetch(`http://localhost:8080/api/outfit/${outfitId}/getLikes`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            if (likesResponse.ok) {
                const likesData = await likesResponse.json();
                setLikes(likesData);
            } else {
                console.error('Failed to fetch likes:', likesResponse.statusText);
            }

            // Fetch dislikes
            const dislikesResponse = await fetch(`http://localhost:8080/api/outfit/${outfitId}/getDislikes`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            if (dislikesResponse.ok) {
                const dislikesData = await dislikesResponse.json();
                setDislikes(dislikesData);
            } else {
                console.error('Failed to fetch dislikes:', dislikesResponse.statusText);
            }

            // Fetch comments
            const commentsResponse = await fetch(`http://localhost:8080/api/outfit/${outfitId}/getComments`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            if (commentsResponse.ok) {
                const commentsData = await commentsResponse.json();
                setComments(commentsData);
            } else {
                console.error('Failed to fetch comments:', commentsResponse.statusText);
            }
        } catch (error) {
            console.error('An error occurred while fetching likes, dislikes, and comments:', error);
        }
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const handleCommentClick = () => {
        setShowComments(!showComments);
    };

    function handleUserClick(userId) {
        localStorage.setItem('searchedUserId', userId);
        navigate(`/OtherUserProfile`);
    }

    return (
        <div className="current-outfit-container">
            <div className="header">
                <button className="back-button" onClick={() => navigate(-1)}>
                    <IoIosArrowBack color="white" size="30" />
                </button>
                <h1 className="title">
                    {outfit ? formatDate(outfit.created_at) : 'Loading...'}
                </h1>
            </div>
            <div className="outfit-details">
                <div className="outfit-details-container">
                    <div className="outfit-details">
                        <img src={outfit?.image} alt="Outfit" />
                        <div className="description-square">
                            <p>{outfit?.description}</p>
                        </div>
                    </div>
                </div>
                <div className="botones">
                    <button>
                        <FaHeart />
                        <span>{likes}</span>
                    </button>
                    <button>
                        <FaHeartBroken />
                        <span>{dislikes}</span>
                    </button>
                    <button onClick={handleCommentClick}>
                        <BiSolidComment />
                        <span>{comments.length}</span>
                    </button>
                </div>
                {showComments && (
                    <div className="comentarios">
                        {comments.map(comment => (
                            <div key={comment.commentId} className="comentario">
                                <img src={comment.profilePicture} alt="Perfil" />
                                <div className="comentario-detalle" onClick={() => handleUserClick(comment.userId)} >
                                    <div className="usuario">{comment.username}</div>
                                    <div className="texto">{comment.comment}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default ArchivedOutfitDetails;
