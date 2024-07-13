import React, { useState, useEffect } from 'react';
import withAuth from '../extras/withAuth';
import '../Profile/MyCurrentOutfit.scss';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import { FaHeart, FaHeartBroken } from 'react-icons/fa';
import { BiSolidComment } from 'react-icons/bi';
import { IoMdTrash } from 'react-icons/io'; // Import the IoMdTrash icon

function OtherCurrentOutfit() {
  const [hasOutfit, setHasOutfit] = useState(false);
  const [outfit, setOutfit] = useState([]);
  const navigate = useNavigate();
  const [showComments, setShowComments] = useState(false);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const checkOutfit = async () => {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('searchedUserId');
      const response = await fetch(`http://localhost:8080/api/outfit/${userId}/hasOutfit`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
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
    if (hasOutfit) {
      getOutfit();
    }
  }, [hasOutfit]); // Run getOutfit() when hasOutfit changes

  async function getOutfit() {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('searchedUserId');
    const response = await fetch(`http://localhost:8080/api/outfit/${userId}/getLatest`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      setOutfit(data);
      const voteStatus = await fetchVoteStatus(data.outfitId, userId);
      const likes = await getLikes(data.outfitId);
      const dislikes = await getDislikes(data.outfitId);
      const comments = await getComments(data.outfitId);
      setOutfit((prevOutfit) => ({
        ...prevOutfit,
        voteStatus,
        likes,
        dislikes,
        comments,
      }));
    }
  }

  async function fetchVoteStatus(outfitId, userId) {
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`http://localhost:8080/api/outfit/${outfitId}/${userId}/getVoteStatus`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
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
    const currentOutfit = outfit;
    const currentVoteStatus = currentOutfit.voteStatus?.isLiked;

    try {
      let endpoint = '/vote';
      let method = 'POST';

      if (currentVoteStatus === voteType) {
        endpoint = '/deleteVote';
        method = 'DELETE';
      } else if (currentVoteStatus) {
        endpoint = '/changeVote';
        method = 'POST';
      }

      const response = await fetch(`http://localhost:8080/api/outfit/${outfitId}/${userId}${endpoint}`, {
        method: method,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: method === 'POST' ? JSON.stringify({ voteType: voteType }) : null,
      });

      if (response.ok) {
        getOutfit();
        console.log('Voted on outfit');
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
          Authorization: `Bearer ${token}`,
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
          Authorization: `Bearer ${token}`,
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
          Authorization: `Bearer ${token}`,
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
    const userId = localStorage.getItem('userId');
    try {
      const response = await fetch(`http://localhost:8080/api/outfit/${outfitId}/${userId}/comment`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ comment }),
      });

      if (response.ok) {
        getOutfit();
        console.log('Comment added');
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
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        getOutfit();
        console.log('Comment deleted');
      } else {
        console.error('Error deleting comment:', response.statusText);
      }
    } catch (error) {
      console.error('An error occurred while deleting comment:', error);
    }
  }

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
              <button className="comentarios" onClick={() => setShowComments(!showComments)}>
                <BiSolidComment />
                <span>{outfit.comments?.length}</span>
              </button>
            </div>
            {showComments && (
                            <div className="comentarios">
                            {outfit.comments.map((comment) => (
                              <div key={comment.commentId} className="comentario">
                                <img src={comment.profilePicture} alt="Perfil" />
                                <div className="comentario-detalle">
                                  <div className="usuario" onClick={() => handleUserClick(comment.userId)}>
                                    {comment.username}
                                  </div>
                                  <div className="texto">{comment.comment}</div>
                                  {comment.userId === userId && (
                                    <button onClick={() => handleDeleteComment(outfit.outfitId, comment.commentId)}>
                                      <IoMdTrash />
                                    </button>
                                  )}
                                </div>
                              </div>
                            ))}
                            <div className="nuevo-comentario">
                              <input type="text" placeholder="Add a comment..." />
                              <button onClick={(e) => handleAddComment(outfit.outfitId, e.target.previousSibling.value)}>
                                Post
                              </button>
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      <div>
                        <p>Este usuario no tiene ningún outfit publicado</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            }
            
            export default withAuth(OtherCurrentOutfit);
            
