import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Add.css";
function AddFoodPage() {
  const [dish, setDish] = useState("");
  const [restaurant, setRestaurant] = useState("");
  const [summary, setSummary] = useState("");
  const [price, setPrice] = useState("");
  const [files, setFiles] = useState("");
  const [category, setCategory] = useState("");

  const [redirect, setredirect] = useState(false);

  const navigate = useNavigate();

  async function createNewPost(ev) {
    const data = new FormData();
    data.set("dish", dish);
    data.set("restaurant", restaurant);
    data.set("summary", summary);
    data.set("category", category);
    data.set("price", price);
    data.set("file", files[0]);
    ev.preventDefault();

    const response = await fetch("http://localhost:3050/addFood", {
      method: "POST",
      body: data,
      credentials: "include",
    });
    if (response.ok) {
      // setredirect(true);
      navigate("/");
    }
  }

  if (redirect) {
    navigate("/");
  }
  return (
    <div className="form__container">
      <form onSubmit={createNewPost} className="form">
        <h2>Add Food</h2>
        <div>
          <label>Food Name</label>
          <input
            type="dish"
            placeholder="Dish"
            value={dish}
            onChange={(ev) => setDish(ev.target.value)}
            className="form__input"
          />
          <label>Restaurant</label>
          <input
            type="restaurant"
            placeholder="Restaurant"
            value={restaurant}
            onChange={(ev) => setRestaurant(ev.target.value)}
            className="form__input"
          />
          <label>Menu Description</label>
          <textarea
            className="dish__desc"
            type="summary"
            placeholder="summary"
            value={summary}
            onChange={(ev) => setSummary(ev.target.value)}
          />
          <label>Price</label>
          <input
            type="number"
            min="0.01"
            step="any"
            value={price}
            placeholder="$10.00"
            data-type="currency"
            pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$"
            onChange={(ev) => setPrice(ev.target.value)}
            className="form__input"
          />
          <div className="form__cat-file">
            <label>Category</label>
            <input
              type="category"
              placeholder="Category"
              value={category}
              onChange={(ev) => setCategory(ev.target.value)}
              className="form__input"
            />
            <label>Picture</label>
            <input
              type="file"
              onChange={(ev) => setFiles(ev.target.files)}
              className="form__input"
            />
          </div>
        </div>
        <button style={{ marginTop: "5px" }} className="form__btn">
          Add Food
        </button>
      </form>

      <Link to="/addrestaurant">Add Restaurant</Link>
    </div>
  );
}
export default AddFoodPage;
