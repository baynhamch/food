import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import "../styles/AuthForms.css";
// function RegisterPage() {
//   const [email, setEmail] = useState("");
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [userInfo, setUserInfo] = useContext(UserContext);
//   const [redirect, setRedirect] = useState(false);

//   const navigate = useNavigate();

//   async function register(ev) {
//     ev.preventDefault();

//     const response = await fetch("http://localhost:3050/register", {
//       method: "POST",
//       body: JSON.stringify({ username, password, email }),
//       headers: { "Content-Type": "application/json" },
//     });
//     if (response.status === 200) {
//       return navigate("/");
//     } else {
//       alert("registeration failed");
//     }
//   }

//   return (
//     <form onSubmit={register} className="register">
//       <h1>Sign Up</h1>
//       <input
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <input
//         placeholder="Username"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//       />
//       <input
//         placeholder="Password"
//         value={password}
//         type="password"
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <button>Sign Up</button>
//       <div className="register-page__link">
//         <p>Have an account?</p>
//         <Link to="/login">Log in</Link>
//       </div>
//     </form>
//   );
// }
function RegisterPage() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setUserInfo } = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();

  async function handleRegister(ev) {
    ev.preventDefault();

    const response = await fetch("http://localhost:3050/register", {
      method: "POST",
      body: JSON.stringify({ username, password, email }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      const userInfo = await response.json();
      setUserInfo(userInfo);
      setRedirect(true);
    } else {
      alert("Registration failed");
    }
  }

  useEffect(() => {
    if (redirect) {
      navigate("/");
    }
  }, [redirect, navigate]);

  return (
    <div className="form__container">
      <form onSubmit={handleRegister} className="form">
        <h1>Sign Up</h1>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form__input"
        />
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
        <button className="form__btn">Sign Up</button>
        <div className="register-page__link">
          <p>Have an account?</p>
          <Link to="/login">Log in</Link>
        </div>
      </form>
    </div>
  );
}

export default RegisterPage;
