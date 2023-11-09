import React from "react";
import ReactDOM from "react-dom/client";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import "./index.css";
import Container from "@mui/material/Container";

import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Profile from "./pages/profile/Profile";
import Nav from "./components/nav/Nav";

ReactDOM.createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <div style={{ marginBottom: "100px" }}>
            <Nav />
        </div>
        <Container maxWidth="md">
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<Profile />} />
            </Routes>
        </Container>
    </BrowserRouter>
);
