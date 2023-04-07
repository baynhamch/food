import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function AddFoodMediaPage() {
  const { id } = useParams();
  const [publicationName, setPublicationName] = useState("");
  const [blerb, setBlerb] = useState("");
  const [mediaLink, setMediaLink] = useState("");

  const navigate = useNavigate();

  async function submitMediaHandler(ev) {
    ev.preventDefault();
    // const data = new FormData();
    // data.set("publication", publication);
    // data.set("blerb", blerb);
    // data.set("mediaLink", mediaLink);
    // console.log(data);
    const response = await fetch(`http://localhost:3050/food/media/${id}`, {
      method: "PUT",
      body: JSON.stringify({ publicationName, blerb, mediaLink }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (response.status === 200) {
      return navigate(`/food/${id}`);
    } else {
      alert("registeration failed");
    }
  }

  return (
    <div>
      <div className="form__container">
        <form onSubmit={submitMediaHandler} className="form">
          <h2>Add Food Media Page</h2>
          {id}
          <div>
            <label>Publication</label>
            <input
              type="dish"
              placeholder="Food.com"
              value={publicationName}
              onChange={(ev) => setPublicationName(ev.target.value)}
              className="form__input"
            />

            <label>Blerb</label>
            <textarea
              className="dish__desc"
              type="text"
              placeholder="This Burger is the best in..."
              value={blerb}
              onChange={(ev) => setBlerb(ev.target.value)}
            />

            <div className="form__cat-file">
              <label>Link</label>
              <input
                type="url"
                placeholder="https://food.com/bestburgers"
                value={mediaLink}
                pattern="https://.*"
                onChange={(ev) => setMediaLink(ev.target.value)}
                className="form__input"
              />
            </div>
          </div>
          <button style={{ marginTop: "5px" }} className="form__btn">
            Add Food Media
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddFoodMediaPage;
