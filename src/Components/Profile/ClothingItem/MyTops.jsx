import React, { useState, useEffect }  from "react"
import "../Uploads/Uploads.scss"
import { IoIosArrowBack } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import withAuth from "../../extras/withAuth";


function MyTops(){
    const navigate = useNavigate();
    const handleSubcategoryClick = (subcategory) => {
        localStorage.setItem('subcategory', subcategory);
        navigate('/MySubcategory');
      };

    return(
        <div className="uploads-container">
            <div className="header">
            <button className="back-button" onClick={() => navigate(-1)}>
                    <IoIosArrowBack color="white" size="30" />
                </button>
                <h1 className="title">Tops</h1>
            </div>
            <div className="buttons-container">
                
                <button className="profile-button" onClick={() => handleSubcategoryClick('Remeras')}>REMERAS</button>
                <button className="profile-button" onClick={() => handleSubcategoryClick('Tops')}>TOPS</button>
                <button className="profile-button" onClick={() => handleSubcategoryClick('Buzos')}>BUZOS</button>
                <button className="profile-button" onClick={() => handleSubcategoryClick('Sweaters')}>SWEATERS</button>
                <button className="profile-button" onClick={() => handleSubcategoryClick('Camperas')}>CAMPERAS</button>



            </div>

        </div>
        


    )
}

export default withAuth(MyTops)


