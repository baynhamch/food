import { Cursor } from "mongoose";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Dropdown from "../components/Dropdown";
import Post from "../components/Post";

function Home() {
  const [posts, setPosts] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [resShown, setResShown] = useState(true);
  const [foodShown, setFoodShown] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3050/post").then((response) => {
      response.json().then((posts) => {
        setPosts(posts);
      });
    });
    fetch("http://localhost:3050/restaurant").then((response) => {
      response.json().then((res) => {
        setRestaurants(res);
      });
    });
  }, []);
  function foodIsShown() {
    setFoodShown(!foodShown);
    // setResShown(resShown);
  }
  function resIsShown() {
    setFoodShown(foodShown);
    // setResShown(!resShown);
  }
  return (
    <div>
      <div style={{ display: "flex" }}>
        <h2
          style={{ marginRight: "10px", curser: "pointer" }}
          onClick={foodIsShown}
        >
          Food
        </h2>
        <h2 onClick={resIsShown}>Restaurants</h2>
      </div>
      {foodShown && (
        <div>
          {posts.length > 0 &&
            posts.map((post) => <Post key={post._id} {...post} />)}
        </div>
      )}

      {resShown && (
        <div>
          {restaurants.map((restaurant) => (
            <div key={restaurant._id}>
              <Link to={`/restaurants/${restaurant._id}`}>
                {restaurant.title}
              </Link>
              {/* <p>{restaurant.title}</p> */}
              <p>{restaurant._id}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;

// Dropdown.tsx
