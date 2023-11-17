import React, { useState, useEffect, useRef } from "react";
<<<<<<< HEAD
import "./Sidebar.css";
=======
import axios from "axios";
import "./sidebar.css";
>>>>>>> staging
import { Link } from "react-router-dom";
import AddCircleOutlineSharpIcon from "@mui/icons-material/AddCircleOutlineSharp";

const Sidebar = () => {
    const [showSidebar, setShowSidebar] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 1000);
    const sidebarRef = useRef(null);

    const [tags, setTags] = useState([]);

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
        getTags();
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 1000);
        };

        window.addEventListener("resize", handleResize);
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            window.removeEventListener("resize", handleResize);
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    async function getTags() {
        const response = await axios.get(
            `${import.meta.env.VITE_URL}/post/all/tags`
        );
        setTags(response.data);
    }

    return (
        <div>
            {isMobile && (
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
                        style={{ fontSize: 40, color: "rgb(97, 180, 76)" }}
                    />
                </div>
            )}

            <div
                ref={sidebarRef}
                className={`sidebar${showSidebar ? " active" : ""}`}
                style={{
                    display: isMobile
                        ? showSidebar
                            ? "block"
                            : "none"
                        : "block",
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
                    {tags.map((tag, index) => (
                        <li key={index}>
                            {/* <Link to={`/${gruppe.toLowerCase()}`}> */}
                            {tag.tag} ({tag.count} opslag)
                            {/*  </Link> */}
                        </li>
                    ))}
                </ul>
                <div className="contact">Hjælp og Support</div>
            </div>
        </div>
    );
};

export default Sidebar;
