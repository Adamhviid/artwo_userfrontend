import React from "react";
import ReactDOM from "react-dom/client";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import "./index.css";
import Container from "@mui/material/Container";

import { AuthProvider } from "./AuthContext";
import Nav from "./components/Nav";
import Sidebar from "./components/Sidebar/Sidebar";

import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Profile from "./pages/profile/Profile";
import FrontPage from "./pages/frontpage/FrontPage";
import Users from "./pages/users/Users";
import Search from "./components/Search";
import SinglePost from "./pages/SinglePost/SinglePost";
import Contact from "./components/contact/Contact";

ReactDOM.createRoot(document.getElementById("root")).render(
    <AuthProvider>
        <BrowserRouter>
            <div style={{ marginBottom: "100px", display: "flex" }}>
                <Nav />
            </div>
            <Container
                maxWidth="md"
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Routes>
                    <Route path="/" element={<FrontPage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/u/:username" element={<Profile />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/p/:id" element={<SinglePost />} />
                    <Route path="/contact" element={<Contact />} />
                </Routes>
                <Sidebar />
            </Container>
        </BrowserRouter>
    </AuthProvider>
);
