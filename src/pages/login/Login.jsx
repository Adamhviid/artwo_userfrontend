import React, { useState, useEffect } from "react";
import axios from "axios";
import "./login.css";
import lognobackground from "../../images/logonobackground.png";

const Login = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      //WE NEED THE ENDPOINT IN ORDER FOR THIS TO WORK :)))
      const response = await axios.post("http://localhost:8080/auth/login", {
        username: username,
        password: password,
      });

      console.log(response);

      setFirstname("");
      setLastname("");
      setUsername("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <img className="logo" src={lognobackground} alt="Logo" />
      <div className="loginmain">
        <h1>Login</h1>
        <div className="loginform">
          <form>
            <ul className="logincredentials ">
              <input
                className="text"
                type="text"
                id="firstname"
                name="firstname"
                placeholder="Fornavn"
                value={firstname}
                onChange={(event) => setFirstname(event.target.value)}
              />
              <input
                className="text"
                type="text"
                id="lastname"
                name="lastname"
                placeholder="Efternavn"
                value={lastname}
                onChange={(event) => setLastname(event.target.value)}
              />
              <input
                className="text"
                type="text"
                id="username"
                name="username"
                placeholder="Brugernavn"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
              <input
                className="text"
                type="email"
                id="email"
                name="email"
                placeholder="E-mail"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <input
                className="text"
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </ul>
            <input
              className="button"
              type="submit"
              value="Login"
              onClick={(e) => handleLogin(e)}
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
