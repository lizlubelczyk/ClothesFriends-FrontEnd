import React, { useState, useEffect }  from "react"
import "../ClothingItem/Subcategory.scss";
import { IoIosArrowBack } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";


function PublicSubcategory(){
    const navigate = useNavigate();
    const subcategory = localStorage.getItem('subcategory');
    const [fullName, setFullName] = useState('');
    const [items, setItems] = useState([]);
    useEffect(() => {
        const fetchFullName = async () => {
            const userId = localStorage.getItem('searchedUserId');
            try{
                const response = await fetch(`http://localhost:8080/api/user/me/${userId}/getPublicFullName`, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                if(response.ok){
                    const fullName = await response.text();
                    setFullName(fullName);
                }else{
                    console.error('Error fetching full name');
                }
            }
            catch(error){
                console.error('Error:', error);
            }
        }
        fetchFullName();
        fetchItems();
    }, []);

    async function fetchItems(){
        try{
            const userId = localStorage.getItem('searchedUserId');
            const response = await fetch(`http://localhost:8080/api/clothingItem/getClothingItemsPublic/${userId}/${subcategory}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if(response.ok){
                const data = await response.json();
                setItems(data);
            }else{
                console.error('Error fetching items');
            }
        }catch(error){
            console.error('Error:', error);
        }
    }

    function handleClick(clothingItemId){
        localStorage.setItem('selectedClothingItemId', clothingItemId);
        navigate(`/PublicClothingItemDetails`);
    }

    return (
        <div className="subcategory-container">
          <div className="header">
          <button className="back-button" onClick={() => navigate(-1)}>
          <IoIosArrowBack color="white" size="30" />
            </button>
            <h1 className="title">{subcategory} de {fullName}</h1>
          </div>
          <div className="clothing-items-container">
            {items.map((item) => (
              <div key={item.id} className="clothing-item" onClick={() => handleClick(item.id)}>
                <img src={item.image} alt={item.name} />
              </div>
            ))}
          </div>
        </div>
    )
}

export default PublicSubcategory;