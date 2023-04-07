import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { useParams, useNavigate, Link } from "react-router-dom";
import "../styles/Profile.css";

function ProfilePage() {
  const [data, setData] = useState({});
  const [favFoods, setFavFoods] = useState([]);
  const { id } = useParams();
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3050/profile/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data.user);
        setFavFoods(data.favFoods);
        // console.log(data.user);
        // console.log(data.favFoods);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <div className="profile-container">
        <div className="profile-container__head">
          <img
            src={`http://localhost:3050/${data.avatar}`}
            alt="cover"
            style={{ maxHeight: "100px" }}
            className="profile-pic"
          />
          <div className="profile-container__info">
            <div>
              <h2>{data.username}</h2>
              <p>{data.email}</p>
              <p>{data.location}</p>
            </div>
            <div>
              <p>Joined: March 2023</p>
            </div>
          </div>
        </div>
        <div>
          <Link to={`/profile/edit/${data._id}`}>Edit Profile</Link>
        </div>
      </div>
      <div className="fav-foods">
        <h3>Favorite Foods</h3>
        {favFoods &&
          favFoods.map((favs) => (
            <div className="fav-food__list-item">
              <div>
                <img
                  src={`http://localhost:3050/${favs.cover}`}
                  alt="cover"
                  className="fav-food__img"
                />
              </div>
              <div className="fav-food__list__info">
                <p>{favs.dish}</p>
                <p>{favs.restaurant}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default ProfilePage;
