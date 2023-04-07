import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function AddRestaurantPage() {
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [website, setWebsite] = useState("");
  const [menu, setMenu] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [redirect, setredirect] = useState(false);

  const navigate = useNavigate();

  async function addRestaurant(ev) {
    const data = new FormData();
    data.set("title", title);
    data.set("address", address);
    data.set("website", website);
    data.set("menu", menu);
    data.set("phoneNumber", phoneNumber);

    ev.preventDefault();

    const response = await fetch("http://localhost:3050/addrestaurant", {
      method: "POST",
      body: data,
      credentials: "include",
    });
    if (response.ok) {
      setredirect(true);
    }
  }

  if (redirect) {
    navigate("/");
  }

  return (
    <div className="form__container">
      <h2>Add Restaurant</h2>

      <form onSubmit={addRestaurant} className="form">
        <input
          type="title"
          placeholder="Restaurant Name"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
          className="form__input"
        />
        <input
          type="address"
          placeholder="Address"
          value={address}
          onChange={(ev) => setAddress(ev.target.value)}
          className="form__input"
        />
        <input
          type="text"
          placeholder="Website"
          value={website}
          onChange={(ev) => setWebsite(ev.target.value)}
          className="form__input"
        />
        <input
          type="text"
          placeholder="Menu URL"
          value={menu}
          onChange={(ev) => setMenu(ev.target.value)}
          className="form__input"
        />
        <input
          type="tel"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(ev) => setPhoneNumber(ev.target.value)}
          className="form__input"
        />
        <button style={{ marginTop: "5px" }} className="form__btn">
          Add Restaurant
        </button>
      </form>
      <Link to="/add">Add Food</Link>
    </div>
  );
}

export default AddRestaurantPage;
