import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Container from "@mui/material/Container";

import routes from "./routes";
import Navbar from "./components/navbar/navbar";

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        
        <Navbar />
        <Container maxWidth="md">
            <RouterProvider router={router} />
        </Container>
    </React.StrictMode>
);
