import React from "react"
import "../Uploads/Uploads.scss"
import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";
import withAuth from "../../extras/withAuth";


function MyTops(){

    return(
        <div className="uploads-container">
            <div className="header">
                <button className="back-button" onClick={() => {/* Navigate back to profile page */}}>
                <Link to="/MyItems">
                    <IoIosArrowBack color="white" size="30" />
                </Link>
                </button>
                <h1 className="title">Tops</h1>
            </div>
            <div className="buttons-container">
                <Link to="/MyTops">
                    <button className="profile-button">REMERAS</button>
                </Link>                
                <Link to="/MyTopsSubcategory">
                    <button className="profile-button">TOPS</button>
                </Link>                 <button className="profile-button">BUZOS</button>
                <button className="profile-button">SWEATERS</button>
                <button className="profile-button">BUZOS</button>
                <button className="profile-button">CAMPERAS</button>



            </div>

        </div>
        


    )
}

export default withAuth(MyTops)


