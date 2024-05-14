import React from "react"
import "../Uploads/Uploads.scss"
import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";
import withAuth from "../../extras/withAuth";


function MyAccesories(){

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
                <button className="profile-button">ZAPATOS</button>
                <button className="profile-button">CARTERAS</button>
                <button className="profile-button">BIJOU</button>
                <button className="profile-button">ABRIGO</button>



            </div>

        </div>
        


    )
}

export default withAuth(MyAccesories)


