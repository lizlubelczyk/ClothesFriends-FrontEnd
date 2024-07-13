import React, { useState, useEffect }  from "react"
import "../Profile/Uploads/Uploads.scss";
import { IoIosArrowBack } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import withAuth from "../extras/withAuth";


function OtherTops(){
    const navigate = useNavigate();
    const [fullName, setFullName] = useState('');

    useEffect(() => {
        const fetchFullName = async () => {
          const token = localStorage.getItem('token');
          const userId = localStorage.getItem('searchedUserId');
    
          try {
            const response = await fetch(`http://localhost:8080/api/user/get/${userId}/fullname`, {
              method: 'GET',
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            });
    
            if (response.ok) {
              const fullName = await response.text();
              setFullName(fullName);
            } else {
              console.error('Error fetching full name');
            }
          } catch (error) {
            console.error('Error:', error);
          }
        };
        fetchFullName();
  }, []);

    const handleSubcategoryClick = (subcategory) => {
        localStorage.setItem('subcategory', subcategory);
        navigate('/OtherSubcategory');
    };

    return(
        <div className="uploads-container">
            <div className="header">
            <button className="back-button" onClick={() => navigate(-1)}>
                    <IoIosArrowBack color="white" size="30" />
                </button>
                <h1 className="title">Tops de {fullName}</h1>
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

export default withAuth(OtherTops)


