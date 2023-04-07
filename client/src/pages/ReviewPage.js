import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function ReviewPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dish, setDish] = useState("");
  const [cover, setCover] = useState("");
  const [review, setReview] = useState("");
  const [score, setScore] = useState("");
  const { setUserInfo, userInfo } = useContext(UserContext);
  const username = userInfo.username;
  //   const { user } = useContext(UserContext);

  useEffect(() => {
    fetch(`http://localhost:3050/food/${id}`).then((response) => {
      response.json().then((foodInfo) => {
        setDish(foodInfo.dish);
      });
    });
  }, []);

  async function addReview(e) {
    e.preventDefault();
    const response = await fetch(`http://localhost:3050/food/${id}`, {
      method: "PUT",
      body: JSON.stringify({ username, review, score }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      return navigate(`/food/${id}`);
    } else {
      alert("registeration failed");
    }
  }
  function handleGoBack() {
    navigate(-1); // go back one page
  }
  return (
    <div>
      <h1>{dish}</h1>
      <div>
        <Link onClick={handleGoBack}>Go back</Link>
      </div>
      <div>
        <form onSubmit={addReview}>
          <input
            placeholder="Score"
            onChange={(ev) => setScore(ev.target.value)}
          />
          <textarea
            placeholder="Share your thoughts"
            onChange={(ev) => setReview(ev.target.value)}
          />
          {/* <input type="file" placeholder="add image" /> */}
          <button>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default ReviewPage;
