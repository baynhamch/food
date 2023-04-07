import React, { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import Post from "../components/Post";
function RestaurantPage() {
  const { id } = useParams();
  const [restaurantInfo, setRestaurantInfo] = useState({});
  const [resFood, setResFood] = useState([]);
  const { userInfo } = useContext(UserContext);

  useEffect(() => {
    fetch(`http://localhost:3050/restaurant/${id}`).then((response) => {
      response.json().then((restaurantInfo) => {
        setRestaurantInfo(restaurantInfo[0]);
        setResFood(restaurantInfo[1]);
        // console.log(restaurantInfo[0]);
      });
    });
  }, []);
  console.log(restaurantInfo);
  console.log(resFood);

  useEffect(() => {}, []);

  return (
    <div>
      <Link to={`/restaurants/edit/${id}`}>Have More info?</Link>
      <h1>{restaurantInfo.title}</h1>
      <div>
        <p>{restaurantInfo.address}</p>
        <p>{restaurantInfo.phoneNumber}</p>
        <Link>{restaurantInfo.website}</Link>
        <Link>{restaurantInfo.menu}</Link>
      </div>
      <div>
        <h3>Logged Food</h3>
        <div>
          {resFood.map((obj, index) => (
            <div key={index} className="item">
              <Link to={`../food/${obj._id}`}>
                <h3>{obj.dish}</h3>
                <p>Restaurant: {obj.restaurant}</p>
                <img
                  src={`http://localhost:3050/${obj.cover[0]}`}
                  alt="cover"
                  style={{ maxHeight: "50px" }}
                />
                <p>Price: {obj.price}</p>
                <p>Summary: {obj.summary}</p>
              </Link>
            </div>
          ))}
          {/* {resFood.map((item) => {
            {
              item.map((singleItem) => {
                <p>{singleItem.dish}</p>;
              });
            }
          })} */}
        </div>
      </div>
    </div>
  );
}

export default RestaurantPage;
