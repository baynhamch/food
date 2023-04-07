import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditRestaurantPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [website, setWebsite] = useState("");
  const [menu, setMenu] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [cover, setCover] = useState("");
  const [restaurantInfo, setRestaurantInfo] = useState({});

  useEffect(() => {
    fetch(`http://localhost:3050/restaurant/${id}`).then((response) => {
      response.json().then((restaurantInfo) => {
        setRestaurantInfo(restaurantInfo);
        setTitle(restaurantInfo.title);
        setAddress(restaurantInfo.address);
        setMenu(restaurantInfo.menu);
        setPhoneNumber(restaurantInfo.phoneNumber);
      });
    });
  }, []);

  async function editRestaurantHandler(e) {
    e.preventDefault();
    // const data = new FormData();
    // data.set("title", title);
    // data.set("address", address);
    // data.set("website", website);
    // data.set("menu", menu);
    // data.set("phoneNumber", phoneNumber);
    // // data.set("file", files?.[0]);
    // data.set("id", id);

    const response = await fetch(`http://localhost:3050/restaurant`, {
      method: "PUT",
      body: JSON.stringify({
        title,
        menu,
        website,
        address,
        cover,
        phoneNumber,
        id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      return navigate(`/restaurants/${id}`);
    } else {
      alert("Edit failed");
    }
  }

  return (
    <div>
      Edit Restaurant Page
      <h2>{restaurantInfo.title}</h2>
      <form className="form" onSubmit={editRestaurantHandler}>
        <label>Restaurant Name</label>
        <input
          type="text"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
          className="form__input"
        />
        <label>Address</label>
        <input
          type="text"
          value={address}
          onChange={(ev) => setAddress(ev.target.value)}
          className="form__input"
        />
        <label>Website URL</label>
        <input
          type="text"
          value={website}
          onChange={(ev) => setWebsite(ev.target.value)}
          className="form__input"
        />
        <label>Menu URL</label>
        <input
          type="text"
          value={menu}
          onChange={(ev) => setMenu(ev.target.value)}
          className="form__input"
        />
        <label>Phone</label>
        <input
          type="tel"
          value={phoneNumber}
          onChange={(ev) => setPhoneNumber(ev.target.value)}
          className="form__input"
        />
        <label>Cover</label>
        <input
          type="file"
          value={cover}
          onChange={(ev) => setCover(ev.target.value)}
          className="form__input"
        />
        <button className="form__btn">Submit</button>
      </form>
    </div>
  );
}

export default EditRestaurantPage;
