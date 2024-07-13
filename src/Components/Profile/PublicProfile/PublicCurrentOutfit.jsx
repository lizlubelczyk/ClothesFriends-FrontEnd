import React, { useState, useEffect} from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { IoIosArrowBack, IoMdTrash } from "react-icons/io";
import '../MyCurrentOutfit.scss';
import { FaHeart, FaHeartBroken } from "react-icons/fa";
import { BiSolidComment } from "react-icons/bi";
import pfp from '../../Assets/pfp.jpg';

function PublicCurrentOutfit() {
    const {userId} = useParams();
    const [hasOutfit, setHasOutfit] = useState(false);
    const [outfit, setOutfit] = useState(null);
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const [comments, setComments] = useState([]);
    const [showComments, setShowComments] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Check if user has an outfit
                const hasOutfitResponse = await fetch(
                    `http://localhost:8080/api/outfit/${userId}/hasOutfitPublic`
                );
                if (hasOutfitResponse.ok) {
                    const result = await hasOutfitResponse.json();
                    setHasOutfit(result);
                    if (result) {
                        // Fetch latest outfit details
                        const latestOutfitResponse = await fetch(
                            `http://localhost:8080/api/outfit/${userId}/getPublic`
                        );
                        if (latestOutfitResponse.ok) {
                            const data = await latestOutfitResponse.json();
                            setOutfit(data);
                            fetchLikesDislikesComments(data.outfitId);
                        } else {
                            console.error(
                                "Failed to fetch latest outfit details:",
                                latestOutfitResponse.statusText
                            );
                        }
                    }
                } else {
                    console.error(
                        "Failed to check if user has outfit:",
                        hasOutfitResponse.statusText
                    );
                }
            } catch (error) {
                console.error("An error occurred while fetching outfit data:", error);
            }
        };

        fetchData();
    }, []);

    const fetchLikesDislikesComments = async (outfitId) => {
        try {
            const likesResponse = await fetch(
                `http://localhost:8080/api/outfit/${outfitId}/getLikesPublic`
            );
            if (likesResponse.ok) {
                const likes = await likesResponse.json();
                setLikes(likes);
            } else {
                console.error("Failed to fetch likes:", likesResponse.statusText);
            }
            const dislikesResponse = await fetch(
                `http://localhost:8080/api/outfit/${outfitId}/getDislikesPublic`
            );
            if (dislikesResponse.ok) {
                const dislikes = await dislikesResponse.json();
                setDislikes(dislikes);
            } else {
                console.error("Failed to fetch dislikes:", dislikesResponse.statusText);
            }
            const commentsResponse = await fetch(
                `http://localhost:8080/api/outfit/${outfitId}/getCommentsPublic`
            );
            if (commentsResponse.ok) {
                const comments = await commentsResponse.json();
                setComments(comments);
            } else {
                console.error("Failed to fetch comments:", commentsResponse.statusText);
            }
        } catch (error) {
            console.error("An error occurred while fetching likes, dislikes, and comments:", error);
        }
    };

    const handleCommentClick = () => {
        setShowComments(!showComments);
    }

    const handleUserClick = (userId) => {
        navigate(`/PublicProfile/${userId}`);
    }

    return(
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
                    </div>
                )}
            </div>
        </div>
    )
}

export default PublicCurrentOutfit;