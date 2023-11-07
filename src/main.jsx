import React from "react";
import ReactDOM from "react-dom/client";
//import App from "./App.jsx";
import "./index.css";

// DONT FIX THIS ERRROR... SHIT WORKS...
import Login from "./pages/login/Login";
// DONT FIX THIS ERRROR... SHIT WORKS...

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <App /> */}
    <Login />
  </React.StrictMode>
);
