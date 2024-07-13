import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IoIosArrowBack, IoMdTrash } from "react-icons/io";
import "../MyInspirationDetails.scss";
import { FaHeart, FaComment } from "react-icons/fa";

function PublicInspirationDetails() {
    const { inspirationId } = useParams(); // Extract inspirationId from the URL
    const [inspiration, setInspiration] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState("");
    const [commentsVisible, setCommentsVisible] = useState(false);
    const [likes, setLikes] = useState(0);
    const userId = parseInt(localStorage.getItem('userId'));

    useEffect(() => {
        fetchInspiration();
        getLikes();
        fetchComments();
    }, [inspirationId]); // Re-run effects if inspirationId changes

    async function fetchInspiration() {
        try {
            const token = localStorage.getItem('token'); // Retrieve the token from local storage

            // Fetch clothing items from backend
            const response = await fetch(`http://localhost:8080/api/inspiration/getPublic/${inspirationId}}`, {
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
        } finally {
            setLoading(false);
        }
    }

    async function getLikes() {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`http://localhost:8080/api/inspiration/getPublic/${inspirationId}/likes`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (response.ok) {
                const data = await response.json();
                setLikes(data);
            } else {
                console.error('Error fetching likes');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    async function fetchComments() {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:8080/api/inspiration/getPublic/${inspirationId}/comments`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (response.ok) {
                const data = await response.json();
                setComments(data);
            }
        }
        catch (error) {
            console.error('Error:', error);
        }
    }

    function handleUserClick(userId) {
        navigate(`/publicProfile/${userId}`);
    }

    return(
        <div className="my-inspiration-container">
            <div className="header">
                <button className="back-button" onClick={() => navigate(-1)}>
                    <IoIosArrowBack color="white" size="30" />
                </button>
                <h1 className="title">Inspiración</h1>
            </div>
            <div className="inspiration-details">
                <div className="outfit-details-container">
                    <div className="inspiration-details">
                        <div className="user-fullname" onClick= {() => handleUserClick(inspiration.userId)}>
                            <h2>{inspiration.fullName}</h2>
                        </div>
                        <img src={inspiration.image} alt="Outfit" />
                        <div className="description-square">
                            <p>{inspiration.description}</p>
                        </div>
                        <div className="botones">
                            <button>
                                <FaHeart />
                                <span>{likes}</span>
                            </button>
                            <button onClick={() => setCommentsVisible(!commentsVisible)}>
                                <FaComment />
                                <span>{comments.length}</span>
                            </button>
                        </div>


                        {commentsVisible && (
                            <div className="comentarios">
                                {comments.map(comment => (
                                    <div key={comment.commentId} className="comentario">
                                        <img
                                            src={comment.profilePicture}
                                            alt="Profile"
                                        />
                                        <div className="comentario-detalle">
                                            <div className="usuario">
                                                <span>{comment.username}</span>
                                            </div>
                                            <div className="texto">
                                                <p>{comment.comment}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div className="nuevo-comentario">
                                    <input
                                        type="text"
                                        placeholder="Inicie sesión para poder comentar"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PublicInspirationDetails;