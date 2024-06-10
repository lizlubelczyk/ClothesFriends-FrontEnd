import React, { useState, useEffect } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { FaHeart, FaComment } from "react-icons/fa";
import { IoMdTrash } from "react-icons/io"; // Import the IoMdTrash icon
import { Link, useNavigate } from "react-router-dom";
import withAuth from '../extras/withAuth';
import '../Profile/MyInspirationDetails.scss';

function OtherInspirationDetails() {
    const [inspiration, setInspiration] = useState({});
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState("");
    const [commentsVisible, setCommentsVisible] = useState(false);
    const [fullName, setFullName] = useState("");
    const [wasLiked, setWasLiked] = useState(false);
    const [likes, setLikes] = useState(0);
    const userId = parseInt(localStorage.getItem('userId')); // Get the logged-in user's ID
    const navigate = useNavigate();

    useEffect(() => {
        fetchInspiration();
        fetchUserName();
        checkIfLiked();
        fetchComments();
        getLikes();
    }, []);

    async function fetchInspiration() {
        try {
            const token = localStorage.getItem('token');
            const inspirationId = localStorage.getItem('selectedInspirationId');
    
            const response = await fetch(`http://localhost:8080/api/inspiration/get/${inspirationId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
    
            if (response.ok) {
                const data = await response.json();
                setInspiration(data);
                setLikes(data.likes); // Update likes count
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

    async function checkIfLiked() {
        try {
            const token = localStorage.getItem('token');
            const inspirationId = localStorage.getItem('selectedInspirationId');
            const userId = localStorage.getItem('userId');

            const response = await fetch(`http://localhost:8080/api/inspiration/get/${inspirationId}/${userId}/hasLiked`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const hasLiked = await response.json();
                setWasLiked(hasLiked);
            } else {
                console.error("Error checking if liked");
            }
        } catch (error) {
            console.error("An error occurred while checking if liked:", error);
        }
    }

    async function handleLike() {
        try {
            const token = localStorage.getItem('token');
            const inspirationId = localStorage.getItem('selectedInspirationId');
            const userId = localStorage.getItem('userId');
    
            let response;
    
            if (wasLiked) {
                // Unlike the inspiration
                response = await fetch(`http://localhost:8080/api/inspiration/delete/${inspirationId}/unLike/${userId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
            } else {
                // Like the inspiration
                response = await fetch(`http://localhost:8080/api/inspiration/post/${inspirationId}/like/${userId}`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
            }
    
            if (response.ok) {
                // Toggle the like state
                setWasLiked(!wasLiked);
    
                // Update likes count
                getLikes();
            } else {
                console.error("Error toggling like");
            }
        } catch (error) {
            console.error("An error occurred while toggling like:", error);
        }
    }
    
    

    async function getLikes() {
        const token = localStorage.getItem('token');
        const inspirationId = localStorage.getItem('selectedInspirationId');
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
            const inspirationId = localStorage.getItem('selectedInspirationId');

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

    async function handleAddComment() {
        try {
            const token = localStorage.getItem('token');
            const inspirationId = localStorage.getItem('selectedInspirationId');
            const userId = localStorage.getItem('userId');

            const response = await fetch(`http://localhost:8080/api/inspiration/${inspirationId}/${userId}/comment`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ comment: commentText }),
            });

            if (response.ok) {
                fetchComments();
                setCommentText("");
            } else {
                console.error("Error adding comment");
            }
        } catch (error) {
            console.error("An error occurred while adding comment:", error);
        }
    }

    async function handleDeleteComment(commentId) {
        try {
            const token = localStorage.getItem('token');
            const inspirationId = localStorage.getItem('selectedInspirationId');

            const response = await fetch(`http://localhost:8080/api/inspiration/${inspirationId}/comment/${commentId}/deleteComment`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                fetchComments();
            } else {
                console.error("Error deleting comment:", response.statusText);
            }
        } catch (error) {
            console.error("An error occurred while deleting comment:", error);
        }
    }

    function handleUserClick(userId) {
        localStorage.setItem('searchedUserId', userId);
        navigate(`/OtherUserProfile`);
    }

    return (
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
                        <div className="user-fullname" onClick= {() => handleUserClick(inspiration.userId)}>
                            <h2>{fullName}</h2>
                        </div>
                        <img src={inspiration.image} alt="Outfit" />
                        <div className="description-square">
                            <p>{inspiration.description}</p>
                        </div>
                        <div className="botones">
                            <button
                                onClick={handleLike}
                                className={wasLiked ? 'liked' : ''}
                            >
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
                                            {comment.userId === userId && (
                                                <button onClick={() => handleDeleteComment(comment.commentId)}>
                                                    <IoMdTrash />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                                <div className="nuevo-comentario">
                                    <input
                                        type="text"
                                        value={commentText}
                                        onChange={(e) => setCommentText(e.target.value)}
                                        placeholder="Add a comment..."
                                    />
                                    <button onClick={handleAddComment}>Post</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default withAuth(OtherInspirationDetails);
