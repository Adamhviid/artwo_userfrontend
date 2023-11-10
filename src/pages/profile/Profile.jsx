import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../AuthContext";

const Profile = () => {
    const { state } = useAuth();
    const [user, setUser] = useState({});
    const { username } = useParams();

    /*  const navigate = useNavigate(); */

    useEffect(() => {
        if (state.isAuthenticated != true) {
            fetchUser();
        } else {
            setUser(state.user);
        }
    }, [username]);

    async function fetchUser() {
        await axios
            .get("http://localhost:8080/user/get/" + username)
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
