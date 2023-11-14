import React, { useState, useEffect, useRef } from "react";
import "./sidebar.css";
import { Link } from "react-router-dom";
import AddCircleOutlineSharpIcon from "@mui/icons-material/AddCircleOutlineSharp";

const grupper = [
    "Rollespil",
    "Fest",
    "Problemer",
    "Biler",
    "Make-up",
    "Underholdning",
    "Politik",
    "Hardware",
    "Kæledyr",
    "Kendte",
    "Kærlighed",
    "Mobiltelefoni",
    "Fodbold",
];

const Sidebar = () => {
    const [showSidebar, setShowSidebar] = useState(false);
    const sidebarRef = useRef(null);

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    };

    const handleClickOutside = (event) => {
        if (
            sidebarRef.current &&
            !sidebarRef.current.contains(event.target) &&
            showSidebar
        ) {
            setShowSidebar(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showSidebar]);

    return (
        <div>
            <div
                className="burger-menu"
                onClick={toggleSidebar}
                style={{
                    position: "fixed",
                    bottom: "20px",
                    right: "20px",
                    cursor: "pointer",
                    zIndex: "999",
                }}
            >
                <AddCircleOutlineSharpIcon
                    style={{
                        fontSize: 40,
                        color: "rgb(97, 180, 76)",
                        cursor: "pointer",
                    }}
                />
            </div>

            <div
                ref={sidebarRef}
                className={`sidebar${showSidebar ? " active" : ""}`}
                style={{
                    display: showSidebar ? "block" : "none",
                    position: "fixed",
                    top: "65px",
                    bottom: "0",
                    left: "0",
                    backgroundColor: "#333",
                    color: "rgb(97, 180, 76)",
                    padding: "10px",
                    width: "160px",
                    overflowY: "auto",
                    transition: "0.3s",
                }}
            >
                <h2>Fællesskaber</h2>
                <ul>
                    {grupper.map((gruppe, index) => (
                        <li key={index}>
                            <Link to={`/${gruppe.toLowerCase()}`}>
                                {gruppe}
                            </Link>
                        </li>
                    ))}
                </ul>
                <div className="contact">Hjælp og Support</div>
            </div>
        </div>
    );
};

export default Sidebar;
