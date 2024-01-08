import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAuth } from "../../AuthContext";

const Profile = () => {
    const { state } = useAuth();
    const [user, setUser] = useState({});
    const { username } = useParams();

    useEffect(() => {
        fetchUser();
    }, [username]);

    async function fetchUser() {
        await axios
            .get(`${import.meta.env.VITE_URL}/user/get/` + username)
            .then((response) => {
                if (response.data != null) {
                    setUser(response.data);
                } else {
                    setUser({});
                }
            });
    }

    return (
        <div>
            <h1>Velkommen</h1>
            <p>Brugernavn: {user.username}</p>
            <p>E-mail: {user.email}</p>
            <p>Fornavn: {user.firstName}</p>
            <p>Efternavn: {user.lastName}</p>
        </div>
    );
};

export default Profile;
