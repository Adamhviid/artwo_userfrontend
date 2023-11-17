import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAuth } from "../../AuthContext";

const Profile = () => {
    const { state } = useAuth();
    const [user, setUser] = useState({});
    const { username } = useParams();

    useEffect(() => {
        if (state.isAuthenticated === false) {
            fetchUser();
        } else {
            setUser(state.user);
        }
    }, [username]);

    async function fetchUser() {
        await axios
            .get(`${import.meta.env.VITE_URL}/user/get/` + username)
            .then((response) => {
                setUser(response.data);
            });
    }

    return (
        <div>
            <h1>Profile</h1>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
            <p>First name: {user.firstName}</p>
            <p>Last name: {user.lastName}</p>
        </div>
    );
};

export default Profile;
