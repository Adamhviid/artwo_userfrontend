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
import CreatePost from "./pages/createpost/CreatePost";
import Users from "./pages/users/Users";
import Search from "./pages/search/Search";
import Rollespil from "./pages/underersider/Rollespil";
import Biler from "./pages/underersider/Biler";
import Fest from "./pages/underersider/Fest";
import Fodbold from "./pages/underersider/Fodbold";
import Hardware from "./pages/underersider/Hardware";
import Kæledyr from "./pages/underersider/Kæledyr";
import Kendte from "./pages/underersider/Kendte";
import Makeup from "./pages/underersider/Makeup";
import Mobiltelefoni from "./pages/underersider/Mobiltelefoni";
import Politik from "./pages/underersider/Politik";
import Underholdning from "./pages/underersider/Underholdning";
import Problemer from "./pages/underersider/Problemer";
import Kærlighed from "./pages/underersider/Kærlighed";

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
                    <Route path="/:username" element={<Profile />} />
                    <Route path="/opslag" element={<CreatePost />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/rollespil" element={<Rollespil />} />
                    <Route path="/biler" element={<Biler />} />
                    <Route path="/fest" element={<Fest />} />
                    <Route path="/fodbold" element={<Fodbold />} />
                    <Route path="/hardware" element={<Hardware />} />
                    <Route path="/kæledyr" element={<Kæledyr />} />
                    <Route path="/kendte" element={<Kendte />} />
                    <Route path="/makeup" element={<Makeup />} />
                    <Route path="/mobiltelefoni" element={<Mobiltelefoni />} />
                    <Route path="/politik" element={<Politik />} />
                    <Route path="/underholdning" element={<Underholdning />} />
                    <Route path="/problemer" element={<Problemer />} />
                    <Route path="/kærlighed" element={<Kærlighed />} />
                </Routes>
                <Sidebar />
            </Container>
        </BrowserRouter>
    </AuthProvider>
);
