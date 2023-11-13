import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import {
    Box,
    Card,
    CardContent,
    CardMedia,
    Typography,
    Grid,
} from "@mui/material";

const Users = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers();
        console.log(users);
    }, []);

    async function getUsers() {
        await axios
            .get(`${import.meta.env.VITE_URL}/user/all`)
            .then((response) => {
                setUsers(response.data);
            });
    }

    return (
        <Grid container spacing={2}>
            {users.map((user) => (
                <Grid item xs={12} sm={6} key={user.id}>
                    <Link to={"/" + user.username} key={user.id}>
                        <Card sx={{ display: "flex" }}>
                            <Grid item md={6}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        height: "200px",
                                    }}
                                >
                                    <CardContent sx={{ flex: "1 0 auto" }}>
                                        <Typography
                                            component="div"
                                            variant="h5"
                                        >
                                            {user.username}
                                        </Typography>
                                        <Typography
                                            variant="subtitle1"
                                            color="text.secondary"
                                            component="div"
                                        >
                                            {user.email}
                                        </Typography>
                                    </CardContent>
                                </Box>
                            </Grid>
                            <Grid item md={6}>
                                <CardMedia
                                    component="img"
                                    sx={{
                                        width: 5,
                                        height: "auto",
                                        objectFit: "contain",
                                    }}
                                    image=""
                                    alt="profile picture"
                                />
                            </Grid>
                        </Card>
                    </Link>
                </Grid>
            ))}
        </Grid>
    );
};

export default Users;
