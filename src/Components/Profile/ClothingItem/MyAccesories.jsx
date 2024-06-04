import React, { useState, useEffect }  from "react"
import "../Uploads/Uploads.scss"
import { IoIosArrowBack } from "react-icons/io";
import { Link,useNavigate } from "react-router-dom";
import withAuth from "../../extras/withAuth";


function MyAccesories(){
    const navigate = useNavigate();

    const handleSubcategoryClick = (subcategory) => {
        localStorage.setItem('subcategory', subcategory);
        navigate('/MySubcategory');
    };
    return(
        <div className="uploads-container">
            <div className="header">
                <button className="back-button" onClick={() => {/* Navigate back to profile page */}}>
                <Link to="/MyItems">
                    <IoIosArrowBack color="white" size="30" />
                </Link>
                </button>
                <h1 className="title">Accesorios</h1>
            </div>
            <div className="buttons-container">

            <button className="profile-button" onClick={() => handleSubcategoryClick('Zapatos')}>ZAPATOS</button>
            <button className="profile-button" onClick={() => handleSubcategoryClick('Carteras')}>CARTERAS</button>
            <button className="profile-button" onClick={() => handleSubcategoryClick('Bijou')}>BIJOU</button>
            <button className="profile-button" onClick={() => handleSubcategoryClick('Cinturones')}>CINTURONES</button>
            <button className="profile-button" onClick={() => handleSubcategoryClick('Gorros')}>GORROS</button>



            </div>

        </div>
        


    )
}

export default withAuth(MyAccesories)


