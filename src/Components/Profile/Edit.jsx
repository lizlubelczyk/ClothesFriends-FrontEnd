import React from "react";
import "./Edit.scss";
import withAuth from "../withAuth/withAuth";
import { IoIosArrowBack } from "react-icons/io";
import pfp from "../Assets/pfp.jpg";
import { FaUserAlt } from "react-icons/fa";
import { FaIdCard } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { Link } from "react-router-dom";



function Edit() {


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
                    <input type="text" placeholder='Nombre de usuario' name='username' />
                </div>
                <div className="input"> 
                    <FaEnvelope size={20} color="gray" />
                    <input type="text" placeholder='Email' name='username' />
                </div>
                <div className="input"> 
                    <FaIdCard size={20} color="gray"/>
                    <input type="text" placeholder='Nombre Completo' name='username' />
                </div>
                <div className="input"> 
                    <IoLogoWhatsapp size={20} color="gray" />
                    <input type="text" placeholder='Link a Whatsapp' name='username' />
                </div>

                
                <button className="button" type="submit" >Save Changes</button>
            </form>
        </div>
      );
}
export default withAuth(Edit);