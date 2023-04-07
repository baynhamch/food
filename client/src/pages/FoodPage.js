import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { Link, useParams } from "react-router-dom";
import "../styles/Foodpage.css";

function FoodPage() {
  const [foodInfo, setFoodInfo] = useState({});
  const { userInfo } = useContext(UserContext);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3050/food/${id}`).then((response) => {
      response.json().then((foodInfo) => {
        setFoodInfo(foodInfo);
        // console.log(foodInfo.comments[0].comment);
      });
    });
  }, []);

  function timeAgo(date) {
    if (!(date instanceof Date)) {
      return "";
    }
    const now = new Date();
    const diff = now.getTime() - date.getTime();

    if (diff < 60 * 1000) {
      // less than a minute
      return "just now";
    } else if (diff < 60 * 60 * 1000) {
      // less than an hour
      const minutes = Math.floor(diff / (60 * 1000));
      return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
    } else if (diff < 24 * 60 * 60 * 1000) {
      // less than a day
      const hours = Math.floor(diff / (60 * 60 * 1000));
      return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
    } else {
      // more than a day
      const days = Math.floor(diff / (24 * 60 * 60 * 1000));
      return `${days} ${days === 1 ? "day" : "days"} ago`;
    }
  }

  // const [savebtn, setSavebtn] = useState(false);
  // function saveHandler() {
  //   saveHandler(!savebtn);
  // }

  const [isClicked, setIsClicked] = useState(true);
  console.log(foodInfo._id);
  const handleClick = () => {
    const response = fetch("http://localhost:3050/save", {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        favorite: isClicked,
        foodId: foodInfo._id,
        userId: userInfo.id,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
    setIsClicked(!isClicked);
  };
  const comments = foodInfo.comments;
  const media = foodInfo.media;
  console.log(comments);

  // const commentLength = comments.length;
  const averageScore = foodInfo.averageScore;
  let textColor;
  if (averageScore >= 9) {
    textColor = "#188521";
  } else if (averageScore >= 6) {
    textColor = "#ebed6d";
  } else {
    textColor = "#ed2415";
  }

  const style = {
    color: textColor,
  };
  return (
    <div className="food-page">
      <div className="food-page__title">
        <h1>{foodInfo.dish}</h1>
        <h2 style={style}>{foodInfo.averageScore}</h2>
      </div>
      <div>
        <img
          src={`http://localhost:3050/${foodInfo.cover}`}
          alt="cover"
          className="food-img"
        />
      </div>
      <div>
        <p>{foodInfo.restaurant}</p>
        <p>{foodInfo.summary}</p>
        <p>{foodInfo.user}</p>
      </div>

      <div className="food-actions">
        <div onClick={handleClick} className="savebtn">
          {isClicked ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>
        <div className="reveiwbtn">
          <Link to={`../review/${id}`}>Write a Review</Link>
        </div>
      </div>
      <div className="media-box">
        <h3>Media</h3>
        <Link to={`../foodmedia/${id}`}>Add</Link>
        <div>
          {media &&
            media.map((mediaPost) => (
              <div>
                <p>{mediaPost.publicationName}</p>
                <p>{mediaPost.blerb}</p>
                <Link to={`${mediaPost.mediaLink}`}>Website</Link>
              </div>
            ))}
        </div>
      </div>
      <div className="comment-container">
        <h3> Reviews</h3>
        {comments &&
          comments.map((comment) => (
            <div key={comment.user} className="comment-box">
              <div className="comment-box__info">
                <b className="comment__username">{comment.username}</b>
                <p>{comment.date}</p>
                {/* <p>{timeAgo(comment.date)}</p> */}
                <p className="comment__score">{comment.score}</p>
              </div>

              <div className="comment__text">
                <p>{comment.comment}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default FoodPage;
