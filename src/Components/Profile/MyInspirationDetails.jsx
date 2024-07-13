import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IoIosArrowBack, IoMdTrash } from "react-icons/io";
import withAuth from "../extras/withAuth";
import "./MyInspirationDetails.scss";
import { FaHeart, FaComment } from "react-icons/fa";
import TweetButton from './TwitterShareButton'; 
import FacebookShareButton from "./FacebookShareButton";

function MyInspirationDetails() {
    const { inspirationId } = useParams(); // Extract inspirationId from the URL
    const [inspiration, setInspiration] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
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
        } finally {
            setLoading(false);
        }
    }

    async function getLikes() {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`http://localhost:8080/api/inspiration/get/${inspirationId}/likes`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (response.ok) {
                const data = await response.json();
                setLikes(data); // Update 'likes' state with the number of likes
            } else {
                console.error('Failed to fetch likes:', response.statusText);
            }
        } catch (error) {
            console.error('An error occurred while fetching likes:', error);
        }
    }

    async function fetchComments() {
        try {
            const token = localStorage.getItem('token');

            const response = await fetch(`http://localhost:8080/api/inspiration/${inspirationId}/getComments`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setComments(data);
            } else {
                console.error("Error fetching comments");
            }
        } catch (error) {
            console.error("An error occurred while fetching comments:", error);
        }
    }

    const handleDeleteInspiration = () => {
        setShowDeleteModal(true);
    }

    const handleConfirmDelete = async () => {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:8080/api/inspiration/delete/${inspiration.id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json", // Indicates the format of the request body
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            // Show success message
            alert("Inspiration deleted successfully!");
            navigate("/MyInspirations"); // Navigate back to the inspirations page
        } else {
            // Handle error
            alert("Failed to delete inspiration");
        }
    };

    const handleCancelDelete = () => {
        setShowDeleteModal(false);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!inspiration) {
        return <div>No inspiration found</div>;
    }
    console.log(typeof inspiration.image)

    function handleUserClick(userId) {
        localStorage.setItem('searchedUserId', userId);
        navigate(`/OtherUserProfile`);
    }

    return (
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
                        <img src={inspiration.image} alt="Outfit" />
                        <div className="description-square">
                            <p>{inspiration.description}</p>
                        </div>
                        <div className="botones">
                            <button>
                                <FaHeart />
                                <span className="like-counter">{likes}</span>
                            </button>
                            <button onClick={() => setCommentsVisible(!commentsVisible)}>
                                <FaComment />
                                <span className="comment-counter">{comments.length}</span>
                            </button>
                            <button className="delete-button" onClick={handleDeleteInspiration}>
                                <IoMdTrash />
                            </button>
                            <TweetButton
                                text={`¡Publiqué esta inspiración en ClothesFriends! ${inspiration.description}`}
                                url={`http://localhost:3000/PublicInspirationDetails/${inspirationId}`}
                                hashtags={['Inspiration', 'Fashion', 'ClothesFriends']}
                                via="cFriendstwt"
                                size="large"
                            />
                            <FacebookShareButton
                                url={`https://clothesfriends.com/PublicInspirationDetails/${inspirationId}`}
                                quote={`¡Publiqué esta inspiración en ClothesFriends! ${inspiration.description}`}
                                hashtag="#ClothesFriends"
                            />
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
                                            <div className="usuario" onClick={() => handleUserClick(comment.userId)}>
                                                <span>{comment.username}</span>
                                            </div>
                                            <div className="texto">
                                                <p>{comment.comment}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {showDeleteModal && (
                <div className="delete-modal">
                    <p>Are you sure you want to delete this inspiration?</p>
                    <button className="yes-button" onClick={handleConfirmDelete}>Yes</button>
                    <button className="no-button" onClick={handleCancelDelete}>No</button>
                </div>
            )}
        </div>
    );
}

export default withAuth(MyInspirationDetails);
