import React, { useState, useEffect }  from "react"
import "../Uploads/Uploads.scss"
import { IoIosArrowBack } from "react-icons/io";
import { Link ,useNavigate} from "react-router-dom";
import withAuth from "../../extras/withAuth";


function MyBottoms(){
    const navigate = useNavigate();
    const handleSubcategoryClick = (subcategory) => {
        localStorage.setItem('subcategory', subcategory);
        navigate('/MySubcategory');
      };

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
                
                           
            <button className="profile-button" onClick={() => handleSubcategoryClick('Pantalones')}>PANTALONES</button>
            <button className="profile-button" onClick={() => handleSubcategoryClick('Polleras')}>POLLERAS</button>
            <button className="profile-button" onClick={() => handleSubcategoryClick('Shorts')}>SHORTS</button>
            <button className="profile-button" onClick={() => handleSubcategoryClick('Vesrtidos')}>VESTIDOS</button>



            </div>

        </div>
        


    )
}

export default withAuth(MyBottoms)


