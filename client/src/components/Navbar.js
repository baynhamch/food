import { FaBars, FaTimes } from "react-icons/fa";
import "../styles/Navbar.css";

import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function Navbar() {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3050/profile", {
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  function logoutHandler() {
    fetch("http://localhost:3050/logout", {
      credentials: "include",
      method: "POST",
    });
    setUserInfo(null);
    navigate("/");
  }

  const [search, setSearch] = useState("");
  const searchHandler = (ev) => {
    ev.preventDefault();
    console.log(search);

    fetch("http://localhost:3050/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ search }),
    });
  };

  return (
    <nav>
      <header>
        <div className="navbar">
          <div>
            <Link className="logo" to="/">
              Ciberca
            </Link>
          </div>
          <div>
            <form onSubmit={searchHandler} className="search-box">
              <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="form__input"
              />
              <button>Search</button>
            </form>
          </div>
          <div>
            {userInfo && userInfo.username && (
              <div className="dropdown">
                <button className="dropbtn">
                  {userInfo.username}
                  <i className="fa fa-caret-down"></i>
                </button>
                <div className="dropdown-content">
                  <Link to={`/profile/${userInfo.id}`}>Profile</Link>
                  <Link to="/add">Add Food/Restaurant</Link>
                  <Link onClick={logoutHandler}>Log Out</Link>
                </div>
              </div>
            )}

            {!userInfo && (
              <div className="dropdown">
                <Link to="/login">Log in</Link>
              </div>
            )}
          </div>
        </div>
      </header>
    </nav>
  );
}
export default Navbar;
