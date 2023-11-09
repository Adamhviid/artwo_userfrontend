import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.css";

import lognobackground from "../../images/logonobackground.png";

const Login = () => {
    const [username, setUsername] = useState("");
    /* const [email, setEmail] = useState(""); */
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem("token")) {
            navigate("/profile");
        }
    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await axios
                .post("http://localhost:8080/user/login", {
                    username: username,
                    password: password,
                })
                .then((response) => {
                    localStorage.setItem("token", response.data.token);
                    localStorage.setItem("userId", response.data.id);
                    navigate("/profile");
                });
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
                                id="username"
                                name="username"
                                placeholder="Brugernavn"
                                value={username}
                                onChange={(event) =>
                                    setUsername(event.target.value)
                                }
                            />
                            {/*  <input
                                className="text"
                                type="email"
                                id="email"
                                name="email"
                                placeholder="E-mail"
                                value={email}
                                onChange={(event) =>
                                    setEmail(event.target.value)
                                }
                            /> */}
                            <input
                                className="text"
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Password"
                                value={password}
                                onChange={(event) =>
                                    setPassword(event.target.value)
                                }
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
