import React, { useState, useEffect }  from "react"
import "../Profile/Uploads/Uploads.scss";
import { IoIosArrowBack } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import withAuth from "../extras/withAuth";
function OtherItems(){
    const [fullName, setFullName] = useState('');
    const navigate = useNavigate();

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


    

    return(
        <div className="uploads-container">
            <div className="header">
            <button className="back-button" onClick={() => navigate(-1)}>
                    <IoIosArrowBack color="white" size="30" />
                </button>
                <h1 className="title">Prendas de {fullName}</h1>
            </div>
            <div className="buttons-container">
                <Link to="/OtherTops">
                    <button className="profile-button">TOP</button>
                </Link>                
                <Link to="/OtherBottoms">
                    <button className="profile-button">BOTTOMS</button>
                </Link>   
                <Link to="/OtherAccesories">
                    <button className="profile-button">ACCESORIOS</button>
                </Link> 
            </div>

        </div>
        


    )
}

export default withAuth(OtherItems)