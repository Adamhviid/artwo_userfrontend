import React from "react";
import "./login.css";

function Login() {
  return (
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
              placeholder="First name"
            />
            <input
              className="text"
              type="text"
              id="lastname"
              name="lastname"
              placeholder="Last name"
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
  );
}

export default Login;
