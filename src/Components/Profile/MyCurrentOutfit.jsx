import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import withAuth from '../extras/withAuth';
import { FaHeartBroken, FaHeart } from 'react-icons/fa';
import { BiSolidComment } from 'react-icons/bi';
import { IoIosArrowBack, IoMdTrash } from 'react-icons/io';
import './MyCurrentOutfit.scss';
import pfp from '../Assets/pfp.jpg';
import TweetButton from './TwitterShareButton';
import FacebookShareButton from './FacebookShareButton';

function MyCurrentOutfit() {
    const [hasOutfit, setHasOutfit] = useState(false);
    const [outfit, setOutfit] = useState(null);
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const [comments, setComments] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const userId = localStorage.getItem('userId');

                // Check if user has an outfit
                const hasOutfitResponse = await fetch(`http://localhost:8080/api/outfit/${userId}/hasOutfit`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (hasOutfitResponse.ok) {
                    const result = await hasOutfitResponse.json();
                    setHasOutfit(result);
                    if (result) {
                        // Fetch latest outfit details
                        const latestOutfitResponse = await fetch(`http://localhost:8080/api/outfit/${userId}/getLatest`, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${token}`,
                            },
                        });
                        if (latestOutfitResponse.ok) {
                            const data = await latestOutfitResponse.json();
                            setOutfit(data);
                            fetchLikesDislikesComments(data.outfitId, token);
                        } else {
                            console.error('Failed to fetch latest outfit details:', latestOutfitResponse.statusText);
                        }
                    }
                } else {
                    console.error('Failed to check if user has outfit:', hasOutfitResponse.statusText);
                }
            } catch (error) {
                console.error('An error occurred while fetching outfit data:', error);
            }
        };
        fetchData();
    }, []);

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

    const handleDeleteOutfit = () => {
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:8080/api/outfit/${outfit.outfitId}/delete`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.ok) {
                alert('Outfit deleted successfully!');
                setShowDeleteModal(false);
                // You may want to refresh the outfit data here
                window.location.reload();
            } else {
                alert('Failed to delete outfit');
            }
        } catch (error) {
            console.error('An error occurred while deleting outfit:', error);
        }
    };

    const handleCancelDelete = () => {
        setShowDeleteModal(false);
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
                <h1 className="title">Outfit Actual</h1>
            </div>
            <div className="outfit-details">
                {hasOutfit && outfit ? (
                    <>
                        <div className="outfit-details-container">
                            <div className="outfit-details">
                                <img src={outfit.image} alt="Outfit" />
                                <div className="description-square">
                                    <p>{outfit.description}</p>
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
                            <button onClick={handleDeleteOutfit}>
                                <IoMdTrash />
                            </button>
                            <TweetButton
                                text={`¡Publiqué un outfit en ClothesFriends!Decime si te gusta en: ${outfit.description}`}
                                url={`http://localhost:3000/PublicCurrentOutfit/${outfit.outfitId}`}
                                hashtags={['Outfit', 'Fashion', 'ClothesFriends']}
                                via="cFriendstwt"
                                size="large"
                            />
                            <FacebookShareButton
                                url={`https://clothesfriends.com/PublicCurrentOutfit/${outfit.outfitId}`}
                                quote={`¡Publiqué este outfit en ClothesFriends! ${outfit.description}`}
                                hashtag="#ClothesFriends"
                            />
                        </div>
                        {showComments && (
                            <div className="comentarios">
                                {comments.map(comment => (
                                    <div key={comment.commentId} className="comentario">
                                        <img src={comment.profilePicture || pfp} alt="Perfil" />
                                        <div className="comentario-detalle" onClick={() => handleUserClick(comment.userId)} >
                                            <div className="usuario">{comment.username}</div>
                                            <div className="texto">{comment.comment}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                ) : (
                    <div className='outfit-details-container'>
                        <p>¡No hay ningún outfit publicado!</p>
                        <Link to="/UploadOutfit">
                            <button>Subir outfit</button>
                        </Link>
                    </div>
                )}
            </div>
            {showDeleteModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>¿Eliminar outfit?</h2>
                        <button onClick={handleConfirmDelete}>Sí</button>
                        <button onClick={handleCancelDelete}>No</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default withAuth(MyCurrentOutfit);