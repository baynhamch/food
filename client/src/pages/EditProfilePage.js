// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";

// function EditProfilePage() {
//   const navigate = useNavigate();
//   const { id } = useParams();

//   const [username, setUsername] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [avatar, setAvatar] = useState("");
//   const [location, setLocation] = useState("");
//   const [bio, setBio] = useState("");

//   useEffect(() => {
//     fetch(`http://localhost:3050/profile/${id}`).then((response) => {
//       response.json().then((profileInfo) => {
//         setUsername(profileInfo.username);
//         setAvatar(profileInfo?.avatar);
//         setPhoneNumber(profileInfo?.phoneNumber);
//         setLocation(profileInfo?.location);
//         setBio(profileInfo?.bio);
//       });
//     });
//   }, []);

//   //   async function editProfileHandler(e) {
//   //     e.preventDefault();

//   //     const response = await fetch(`http://localhost:3050/food/${id}`, {
//   //       method: "PUT",
//   //       body: JSON.stringify({ username, phoneNumber, avatar, location, bio }),
//   //       headers: {
//   //         "Content-Type": "application/json",
//   //       },
//   //     });
//   //     // if (response.status === 200) {
//   //     //   return navigate(`/profile/${id}`);
//   //     // } else {
//   //     //   alert("Edit failed");
//   //     // }
//   //   }
//   return (
//     <div>
//       EditProfilePage
//       <div>
//         <form onSubmit={""}>
//           <input
//             placeholder="username"
//             value={username}
//             onChange={(ev) => setUsername(ev.target.value)}
//           />
//           <input
//             placeholder="Phone Number"
//             value={phoneNumber}
//             onChange={(ev) => setPhoneNumber(ev.target.value)}
//           />
//           <input
//             placeholder="avatar"
//             type="file"
//             value={avatar}
//             onChange={(ev) => setAvatar(ev.target.value)}
//           />
//           <input
//             placeholder="location"
//             type="text"
//             value={location}
//             onChange={(ev) => setLocation(ev.target.value)}
//           />
//           <textarea
//             placeholder="bio"
//             value={bio}
//             onChange={(ev) => setBio(ev.target.value)}
//           />
//           <button>Submit</button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default EditProfilePage;

import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import "../styles/Add.css";

function EditProfilePage() {
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("");
  const [email, setEmail] = useState("");
  const [data, setData] = useState("");
  const [location, setLocation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [bio, setBio] = useState("");
  const [files, setFiles] = useState("");
  const { id } = useParams();
  const { setUserInfo } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3050/profile/${id}`)
      .then((response) => response.json())
      .then((jsonData) => {
        setData(jsonData);
        setUsername(jsonData.username);
        setAvatar(jsonData?.avatar);
        setEmail(jsonData?.email);
        console.log(username);
      });
  }, []);

  async function editHandler(e) {
    e.preventDefault();
    const data = new FormData();
    data.set("username", username);
    data.set("email", email);
    data.set("file", files?.[0]);
    data.set("id", id);
    setUserInfo(username);
    // if (files?.[0]) {

    // }
    // if (avatar?.[0]) {
    //   data.set("file", avatar?.[0]);
    // }

    const response = await fetch("http://localhost:3050/profile", {
      method: "PUT",
      body: data,
      credentials: "include",
    });
    if (response.ok) {
      navigate(`/profile/${id}`);
    }
  }

  return (
    <div>
      <div>
        <form className="form" onSubmit={editHandler}>
          <label>Profile Picture</label>
          {/* <input
            placeholder="Avatar"
            value={avatar}
            type="file"
            onChange={(e) => setAvatar(e.target.files)}
          /> */}
          <input
            type="file"
            onChange={(ev) => setFiles(ev.target.files)}
            className="form__input"
          />
          <label>Username</label>
          <input
            placeholder="username"
            value={username}
            className="form__input"
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Email</label>
          <input
            placeholder="email"
            value={email}
            className="form__input"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Location</label>
          <input
            placeholder="location"
            value={location}
            className="form__input"
            onChange={(e) => setLocation(e.target.value)}
          />
          <label>Phone Number</label>
          <input
            placeholder="Phone Number"
            value={phoneNumber}
            className="form__input"
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <label>Biography</label>
          <textarea
            placeholder="Bio"
            value={bio}
            className="form__input"
            onChange={(e) => setBio(e.target.value)}
          />
          <button className="form__btn">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default EditProfilePage;
