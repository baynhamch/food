// import React, { useState, useContext, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { UserContext } from "../context/UserContext";
// import SearchBar from "./SearchBar";
// import "../styles/Header.css";
// function Header() {
//   const { userInfo, setUserInfo } = useContext(UserContext);
//   // const [searchTerm, setSearchTer] = useState("");
//   const [data, setData] = useState({});

//   // useEffect(() => {
//   //   fetch(`http://localhost:3050/profile/${userInfo.id}`).then((response) => {
//   //     response.json().then((userInfo) => {
//   //       setData(userInfo);
//   //     });
//   //   });
//   // }, []);

//   const username = userInfo?.username;

//   // function handleSearch(e) {
//   //   e.preventDefault();

//   //   navigate("/search");
//   //   setSearchTerm("");
//   // }

//   function logout() {
//     fetch("http://localhost:3050/logout", {
//       credentials: "include",
//       method: "POST",
//     });
//     setUserInfo(null);
//   }

//   return (
//     <header>
//       <Link className="logo" to="/">
//         Ciberca
//       </Link>
//       <SearchBar />
//       <nav>
//         <div>
//           {username && (
//             <>
//               {/* <Link to="/add">Add Dish</Link> */}
//               <div className="header__profilebox">
//                 <Link to={`/profile/${userInfo.id}`}>{userInfo.username}</Link>
//                 <img
//                   style={{ maxWidth: "35px", borderRadius: "50%" }}
//                   src={`http://localhost:3050/${data.avatar}`}
//                   alt="cover"
//                 />
//               </div>
//             </>
//           )}
//           {!username && <Link onClick={logout}>Log In</Link>}
//         </div>
//       </nav>
//     </header>
//   );
// }

// export default Header;
// // fetch("http://localhost:3050/search", {
// //   method: "POST",
// //   body: JSON.stringify({ search }),
// //   headers: { "Content-Type": "application/json" },
// // });
