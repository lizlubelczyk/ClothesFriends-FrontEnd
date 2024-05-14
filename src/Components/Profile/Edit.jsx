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
    const [profilePicture, setProfilePicture] = useState('');

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
    
        // Validate required fields (example)
        if (!user.username || !user.email) {
            console.error("Username and Email are required");
            return;
        }
    
        try {
            const userId = localStorage.getItem("userId");
            const token = localStorage.getItem("token");
    
            const response = await fetch(`http://localhost:8080/api/user/me/update/${userId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,

                },
                body: JSON.stringify(user),
            });
    
            if (response.ok) {
                console.log("User updated successfully");
                navigate("/profile"); // Navigate after successful update
            } else {
                console.error("Error updating user");
            }
        } catch (error) {
            console.error("An error occurred while updating the user:", error);
        }
    };
    
    
    const handleFileChange = async (event) => {
        const file = event.target.files[0]; // Get the selected file
        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("token");
    
        const formData = new FormData(); // Use FormData for file uploads
        formData.append("profilePicture", file);
    
        try {
            const response = await fetch(`http://localhost:8080/api/user/me/${userId}/profile-picture`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
                body: formData,
            });
    
            if (response.ok) {
                const updatedUser = await response.json();
                setUser(updatedUser); // Update the user with the new profile picture
            } else {
                console.error("Error uploading profile picture");
            }
        } catch (error) {
            console.error("An error occurred while uploading the profile picture:", error);
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
                <img className="profile-picture" src={user.profilePicture} alt="Profile" />
                <input type="file" className="edit-photo-text" onChange={handleFileChange} /> // Self-closing
            </div>
            <div className="edit-form" >
                <div className="input"> 
                    <FaUserAlt size={20} color="gray" />
                    <input type="text" placeholder='Nombre de usuario' name='username' value={user.username} onChange={e=> setUser(prevUser => ({ ...prevUser, username: e.target.value}))} />
                </div>
                <div className="input"> 
                    <FaEnvelope size={20} color="gray" />
                    <input type="text" placeholder='Email' name='email' value={user.email} onChange={e=> setUser(prevUser => ({ ...prevUser, email: e.target.value}))} />
                </div>
                <div className="input"> 
                    <FaIdCard size={20} color="gray"/>
                    <input type="text" placeholder='Nombre Completo' value={user.fullName} name='fullName'  onChange={e => setUser(prevUser => ({ ...prevUser, fullName: e.target.value}))} />
                </div>
                <div className="input"> 
                    <IoLogoWhatsapp size={20} color="gray" />
                    <input type="text" placeholder='Link a Whatsapp' name='whatsappLink' value={user.whatsappLink} onChange={e=> setUser(prevUser => ({ ...prevUser, whatsappLink: e.target.value}))}/>
                </div>
                <button className="button" type="submit" onClick={handleSubmit} >Guardar Cambios</button>
                <button className="button" type="button" onClick={handleDeleteUser}>Borrar Usuario</button>
            </div>
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