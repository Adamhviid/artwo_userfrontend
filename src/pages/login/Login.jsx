import React from "react";
import "./login.css";
import lognobackground from "../../images/logonobackground.png";

const Login = () => {
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
              />
              <input
                className="text"
                type="text"
                id="lastname"
                name="lastname"
                placeholder="Efternavn"
              />
              <input
                className="text"
                type="text"
                id="username"
                name="username"
                placeholder="Brugernavn"
              />
              <input
                className="text"
                type="email"
                id="email"
                name="email"
                placeholder="E-mail"
              />
              <input
                className="text"
                type="password"
                id="password"
                name="password"
                placeholder="Password"
              />
            </ul>
            <input className="button" type="submit" value="Login" />
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
