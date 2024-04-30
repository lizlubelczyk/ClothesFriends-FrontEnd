import React, {useState, useEffect} from "react";
import "./Edit.scss";
import withAuth from "../extras/withAuth";
import { IoIosArrowBack } from "react-icons/io";
import pfp from "../Assets/pfp.jpg";
import { FaUserAlt } from "react-icons/fa";
import { FaIdCard } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from 'react-router-dom';



function Edit() {
    const [user, setUser] = useState('');
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
  
    useEffect(() => {
        const fetchUser = async () => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        console.log(userId);
        console.log(token);
        const response = await fetch(`http://localhost:8080/api/user/get/${userId}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        
        });
        if (response.ok) {
            const data = await response.json();
            setUser(data);
        }
        else {
            console.log('Error');
        }
    }; // Add closing parenthesis here
    fetchUser();

    }, []);

    function handleDeleteUser() {
        setShowModal(true);
      }
    
      async function handleConfirmDelete() {
        setShowModal(false);
        try {
          const userId = localStorage.getItem('userId');
          const token = localStorage.getItem('token'); // Retrieve the token from local storage
          const response = await fetch(`http://localhost:8080/api/user/get/${userId}/delete`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}` // Include the token in the 'Authorization' header
            },
          });
      
          if (!response.ok) {
            throw new Error('Error deleting user');
          }
        } catch (error) {
          console.error('Failed to delete user:', error);
          // You can also show an error message to the user here
        }
      }
        
    
      function handleCancelDelete() {
        setShowModal(false);
      }
    

    return (
        <div className="edit-container">
            <div className="header">
                <button className="back-button" onClick={() => {/* Navigate back to profile page */}}>
                <Link to="/profile">
                    <IoIosArrowBack color="white" size="30" />
                </Link>
                </button>
                <h1 className="title">Editar perfil</h1>
            </div>
            <div className="profile-picture-container">
                <img className="profile-picture" src={pfp} alt="Profile" />
                <p className="edit-photo-text">Editar foto</p>
            </div>
            <form className="edit-form">
                <div className="input"> 
                    <FaUserAlt size={20} color="gray" />
                    <input type="text" placeholder='Nombre de usuario' name='username' value={user.username} />
                </div>
                <div className="input"> 
                    <FaEnvelope size={20} color="gray" />
                    <input type="text" placeholder='Email' name='email' value={user.email} />
                </div>
                <div className="input"> 
                    <FaIdCard size={20} color="gray"/>
                    <input type="text" placeholder='Nombre Completo' name='username' value={user.fullName} />
                </div>
                <div className="input"> 
                    <IoLogoWhatsapp size={20} color="gray" />
                    <input type="text" placeholder='Link a Whatsapp' name='username' value={user.whatsappLink} />
                </div>

                
                <button className="button" type="submit" >Guardar Cambios</button>
                <button className="button" type="button" onClick={handleDeleteUser}>Borrar Usuario</button>

                {showModal && (
                    <div className="modal">
                        <div className="modal-content">
                            <h2>¿Borrar usuario?</h2>
                            <button onClick={handleConfirmDelete}>Si</button>
                            <button onClick={handleCancelDelete}>No</button>
                        </div>
                    </div>
                )}
            </form>
        </div>
      );
}
export default withAuth(Edit);