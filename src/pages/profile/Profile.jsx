import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
    const [user, setUser] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            window.location.href = "/login";
        } else {
            fetchUser(token);
        }
    }, []);

    async function fetchUser(token) {
        const id = localStorage.getItem("userId");
        await axios
            .get("http://localhost:8080/user/get/" + id, {
                headers: {
                    token: `${token}`,
                },
            })
            .then((response) => {
                setUser(response.data);
            });
    }

    return (
        <div>
            <h1>Profile</h1>
            <h2>Username: {user.username}</h2>
            <h2>Email: {user.email}</h2>

            <div>
                <h1>Skift kodeord</h1>
                <form>
                    <input type="password" placeholder="Nuværende kodeord" />
                    <input type="password" placeholder="Nyt kodeord" />
                    <input type="password" placeholder="Gentag nyt kodeord" />
                    <button>Skift kodeord</button>
                </form>
            </div>
        </div>
    );
};

export default Profile;
