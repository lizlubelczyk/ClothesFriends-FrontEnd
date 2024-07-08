import React from "react"
import "../Uploads/Uploads.scss"
import { IoIosArrowBack } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import withAuth from "../../extras/withAuth";
function MyItems(){
    const navigate = useNavigate();

    return(
        <div className="uploads-container">
            <div className="header">
            <button className="back-button" onClick={() => navigate(-1)}>
                    <IoIosArrowBack color="white" size="30" />
                </button>
                <h1 className="title">Categorías</h1>
            </div>
            <div className="buttons-container">
                <Link to="/MyTops">
                    <button className="profile-button">TOP</button>
                </Link>                
                <Link to="/MyBottoms">
                    <button className="profile-button">BOTTOMS</button>
                </Link>   
                <Link to="/MyAccesories">
                    <button className="profile-button">ACCESORIOS</button>
                </Link> 
            </div>

        </div>
        


    )
}

export default withAuth(MyItems)


