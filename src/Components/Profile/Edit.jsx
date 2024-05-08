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
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [whatsappLink, setWhatsappLink] = useState('');

    useEffect(() => {
        async function fetchUser() {
            try {
                const userId = localStorage.getItem('userId');
                const token = localStorage.getItem('token'); // Add this line
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
                    setUsername(data.username || "");
                    setEmail(data.email || "");
                    setFullName(data.fullName || "");
                    setWhatsappLink(data.whatsappLink || "");
                } else {
                    console.log('Error');
                }
            } catch (error) {
                console.error('An error occurred while fetching the user:', error);
            }
        }
    
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
            const response = await fetch(`http://localhost:8080/api/user/me/delete/${userId}`, {
            method: 'DELETE',
            headers: {
            'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Include the token in the 'Authorization' header
            },
            });
      
            if (response.ok) {
                // If the deletion was successful, log out the user and redirect to login page
                localStorage.removeItem('token');
                localStorage.removeItem('userId');
                // Use the navigate function from react-router-dom
                navigate('/');
              } else {
                console.error('Error deleting user');
              }
            } catch (error) {
              console.error('Error deleting user:', error);
            }
      }
        
    
      function handleCancelDelete() {
        setShowModal(false);
      }

      const handleSubmit = async (event) => {
        event.preventDefault();
    
        const user = {
            username,
            email,
            fullName,
            whatsappLink,
            // Include other form fields here...
        };
    
        try {
            const userId = localStorage.getItem('userId');
            const token = localStorage.getItem('token'); // Retrieve the token from local storage
            const response = await fetch(`http://localhost:8080/api/user/me/update/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Include the token in the headers
                },
                body: JSON.stringify(user),
            });
    
            if (response.ok) {
                const data = await response.json();
                // Use the response data as needed...
            } else {
                console.error('An error occurred while updating the user:', await response.text());
            }
        } catch (error) {
            console.error('An error occurred while updating the user:', error);
        }
    };
    
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
            <form className="edit-form" onSubmit={handleSubmit}>
                <div className="input"> 
                    <FaUserAlt size={20} color="gray" />
                    <input type="text" placeholder='Nombre de usuario' name='username' value={username} onChange={e=> setUsername(e.target.value)} />
                </div>
                <div className="input"> 
                    <FaEnvelope size={20} color="gray" />
                    <input type="text" placeholder='Email' name='email' value={email} onChange={e=> setEmail(e.target.value)} />
                </div>
                <div className="input"> 
                    <FaIdCard size={20} color="gray"/>
                    <input type="text" placeholder='Nombre Completo' name='fullName' value={fullName} onChange={e => setFullName(e.target.value)} />
                </div>
                <div className="input"> 
                    <IoLogoWhatsapp size={20} color="gray" />
                    <input type="text" placeholder='Link a Whatsapp' name='whatsappLink' value={whatsappLink} onChange={e=> setWhatsappLink(e.target.value)}/>
                </div>
                <button className="button" type="submit" >Guardar Cambios</button>
                <button className="button" type="button" onClick={handleDeleteUser}>Borrar Usuario</button>
            </form>
                {showModal && (
                    <div className="modal">
                        <div className="modal-content">
                            <h2>¿Borrar usuario?</h2>
                            <button onClick={handleConfirmDelete}>Si</button>
                            <button onClick={handleCancelDelete}>No</button>
                        </div>
                    </div>
                )}
        </div>
      );
}
export default withAuth(Edit);