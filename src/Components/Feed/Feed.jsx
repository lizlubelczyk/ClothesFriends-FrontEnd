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
import { IoMdTrash } from "react-icons/io"; // Import the IoMdTrash icon
import { useNavigate, Link } from 'react-router-dom';
import withAuth from '../extras/withAuth';

function Feed() {
    const navigate = useNavigate();
    const [outfits, setOutfits] = useState([]);
    const [commentingOutfit, setCommentingOutfit] = useState(null);
    const userId = parseInt(localStorage.getItem('userId')); // Convert userId to integer


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
                    const likes = await getLikes(outfit.outfitId);
                    const dislikes = await getDislikes(outfit.outfitId);
                    const comments = await getComments(outfit.outfitId);
                    return { ...outfit, voteStatus, likes, dislikes, comments };
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
        const currentOutfit = outfits.find(outfit => outfit.outfitId === outfitId);
        const currentVoteStatus = currentOutfit.voteStatus?.isLiked;

        try {
            let endpoint = `/vote`;
            let method = 'POST';

            if (currentVoteStatus === voteType) {
                endpoint = `/deleteVote`;
                method = 'DELETE';
            } else if (currentVoteStatus) {
                endpoint = `/changeVote`;
                method = 'POST';
            }

            const response = await fetch(`http://localhost:8080/api/outfit/${outfitId}/${userId}${endpoint}`, {
                method: method,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: method === 'POST' ? JSON.stringify({ voteType: voteType }) : null,
            });

            if (response.ok) {
                fetchOutfits();
            } else {
                console.error('Error voting on outfit');
            }
        } catch (error) {
            console.error('An error occurred while voting on outfit:', error);
        }
    }

    async function getLikes(outfitId) {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`http://localhost:8080/api/outfit/${outfitId}/getLikes`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                return data;
            } else {
                console.error('Error fetching likes');
                return null;
            }
        } catch (error) {
            console.error('An error occurred while fetching likes:', error);
            return null;
        }
    }

    async function getDislikes(outfitId) {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`http://localhost:8080/api/outfit/${outfitId}/getDislikes`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                return data;
            } else {
                console.error('Error fetching dislikes');
                return null;
            }
        } catch (error) {
            console.error('An error occurred while fetching dislikes:', error);
            return null;
        }
    }

    async function getComments(outfitId) {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`http://localhost:8080/api/outfit/${outfitId}/getComments`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                return data;
            } else {
                console.error('Error fetching comments');
                return [];
            }
        } catch (error) {
            console.error('An error occurred while fetching comments:', error);
            return [];
        }
    }

    async function handleAddComment(outfitId, comment) {
        const token = localStorage.getItem('token');

        try {
            const response = await fetch(`http://localhost:8080/api/outfit/${outfitId}/${userId}/comment`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ comment }),
            });

            if (response.ok) {
                fetchOutfits();
            } else {
                console.error('Error adding comment');
            }
        } catch (error) {
            console.error('An error occurred while adding comment:', error);
        }
    }

    async function handleDeleteComment(outfitId, commentId) {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');

        try {
            const response = await fetch(`http://localhost:8080/api/outfit/${outfitId}/comment/${commentId}/deleteComment`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                fetchOutfits();
            } else {
                console.error('Error deleting comment:', response.statusText);
            }
        } catch (error) {
            console.error('An error occurred while deleting comment:', error);
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
                            className={outfit.voteStatus?.isLiked === 'LIKE' ? 'liked' : ''}
                        >
                            <FaHeart />
                            <span>{outfit.likes}</span>
                        </button>
                        <button
                            onClick={() => handleVote(outfit.outfitId, 'DISLIKE')}
                            className={outfit.voteStatus?.isLiked === 'DISLIKE' ? 'disliked' : ''}
                        >
                            <FaHeartBroken />
                            <span>{outfit.dislikes}</span>
                        </button>
                        <button
                            className="comentarios"
                            onClick={() => setCommentingOutfit(outfit.outfitId === commentingOutfit ? null : outfit.outfitId)}
                        >
                            <BiSolidComment />
                            <span>{outfit.comments.length}</span>
                        </button>
                    </div>
                    {commentingOutfit === outfit.outfitId && (
                        <div className="comentarios">
                            {outfit.comments.map(comment => (
                                <div key={comment.commentId} className="comentario">
                                    <img src={comment.profilePicture || pfp} alt="Perfil" />
                                    <div className="comentario-detalle">
                                        <div className="usuario">{comment.username}</div>
                                        <div className="texto">{comment.comment}</div>
                                        {(comment.userId === userId) && (
                                            <button onClick={() => handleDeleteComment(outfit.outfitId, comment.commentId)}>
                                                <IoMdTrash />
                                            </button>
                                        )}

                                    </div>
                                </div>
                            ))}
                            <div className="nuevo-comentario">
                                <input type="text" placeholder="Add a comment..." />
                                <button onClick={(e) => handleAddComment(outfit.outfitId, e.target.previousSibling.value)}>Post</button>
                            </div>
                        </div>
                    )}
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
