import React from "react"
import "../Uploads/Uploads.scss"
import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";
import withAuth from "../../extras/withAuth";


function MyBottoms(){

    return(
        <div className="uploads-container">
            <div className="header">
                <button className="back-button" >
                <Link to="/MyItems">
                    <IoIosArrowBack color="white" size="30" />
                </Link>
                </button>
                <h1 className="title">Bottoms</h1>
            </div>
            <div className="buttons-container">
                <Link to="/MyTops">
                    <button className="profile-button">REMERAS</button>
                </Link>                
                <button className="profile-button">PANTALONES</button>
                <button className="profile-button">POLLERAS</button>
                <button className="profile-button">SHORTS</button>
                <button className="profile-button">VESTIDOS</button>



            </div>

        </div>
        


    )
}

export default withAuth(MyBottoms)


