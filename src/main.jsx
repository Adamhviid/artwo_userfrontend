import React from "react";
import ReactDOM from "react-dom/client";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import "./index.css";
import Container from "@mui/material/Container";

import Nav from "./components/Nav";

import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Profile from "./pages/profile/Profile";
import FrontPage from "./pages/frontpage/FrontPage";
import CreatePost from "./pages/createpost/CreatePost";
import Users from "./pages/users/Users";
import Search from "./pages/search/Search";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <div style={{ marginBottom: "100px" }}>
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
        <Route path="/profile" element={<Profile />} />
        <Route path="/opslag" element={<CreatePost />} />
        <Route path="/users" element={<Users />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </Container>
  </BrowserRouter>
);
