import React from "react";
import "./sidebar.css";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

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
    return (
        <div className="sidebar">
            <h2>Fællesskaber</h2>
            <ul>
                {grupper.map((gruppe, index) => (
                    <li key={index}>
                        <Link to={`/${gruppe.toLowerCase()}`}>{gruppe}</Link>
                    </li>
                ))}
            </ul>
            <div className="contact">Hjælp og Support</div>
        </div>
    );
};

export default Sidebar;
