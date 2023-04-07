import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import "../styles/AuthForms.css";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { userInfo, setUserInfo } = useContext(UserContext);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3050/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (response.ok) {
        const userInfo = await response.json();
        setUserInfo(userInfo);
        console.log(userInfo);
        setRedirect(true);
      } else {
        throw new Error("Wrong Credentials");
      }
    } catch (error) {
      alert(error.message);
    }
    //   if (response.ok) {
    //     // const userInfo = await response.json();
    //     // setUserInfo(userInfo);
    //     response.json().then((userInfo) => {
    //       setUserInfo(userInfo);
    //       // console.log(userInfo);
    //       setRedirect(true);
    //     });
    //     console.log(userInfo);
    //   } else {
    //     throw new Error("Wrong Credentials");
    //   }
    // } catch (error) {
    //   alert(error.message);
    // }
  };

  useEffect(() => {
    if (redirect) {
      navigate("/");
    }
  }, [redirect, navigate]);

  return (
    <div className="form__container">
      <form onSubmit={handleLogin} className="form">
        <h1>Log In</h1>
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="form__input"
        />
        <input
          placeholder="Password"
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          className="form__input"
        />
        <button className="form__btn">Log In</button>
        <div className="register-page__link">
          <p>Don't have an account?</p>
          <Link to="/register">Sign Up</Link>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
