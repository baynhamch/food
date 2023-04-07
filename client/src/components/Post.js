import React from "react";
import { Link } from "react-router-dom";
import "../styles/Post.css";
function Post({
  dish,
  restaurant,
  cover,
  price,
  category,
  summary,
  _id,
  averageScore,
}) {
  console.log(averageScore);

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
    <Link to={`/food/${_id}`}>
      <div className="post__container" style={{ margin: "10px" }}>
        <img
          className="post__img"
          src={"http://localhost:3050/" + cover}
          alt="food"
        />
        {/* </Link> */}
        <div className="post__info">
          <h2 className="post__dish">{dish}</h2>
          <p className="post__restaurant">{restaurant}</p>
          <p>rating:</p>
          <p
            // className="post__rating"
            style={style}
          >
            {averageScore ? averageScore : "N/A"}
          </p>
          <p>{category}</p>
        </div>
      </div>
    </Link>
  );
}

export default Post;

// {"http://localhost:3050/" + cover}
