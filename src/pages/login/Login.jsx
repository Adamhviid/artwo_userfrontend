import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
    Button,
    CssBaseline,
    TextField,
    Link,
    Grid,
    Box,
    Typography,
    Container,
} from "@mui/material";

import { useAuth } from "../../AuthContext";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const { login, state } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (state.user) {
            navigate("/u/" + state.user.username);
        }
    }, [state, navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await axios
                .post(`${import.meta.env.VITE_URL}/user/login`, {
                    username: username,
                    password: password,
                })
                .then((response) => {
                    localStorage.setItem("token", response.data.token);
                    login(response.data);
                    navigate("/u/" + response.data.username);
                });
        } catch (error) {
            console.log(error);
        }
    };

    /*   const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            handleLogin(event);
        }
    }; */

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Typography component="h1" variant="h5">
                    Lav en bruger her
                </Typography>
                <Box component="form" onSubmit={handleLogin} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="username"
                                label="Brugernavn"
                                name="username"
                                autoFocus
                                onChange={(event) =>
                                    setUsername(event.target.value)
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                                onChange={(event) =>
                                    setPassword(event.target.value)
                                }
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        style={{ backgroundColor: "rgb(97, 180, 76)" }}
                    >
                        Log ind
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid>
                            <Link
                                variant="body2"
                                onClick={(e) => {
                                    e.preventDefault();
                                    navigate("/register");
                                }}
                                style={{ cursor: "pointer" }}
                            >
                                Har du endnu ikke en bruger? Registrer her
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

export default Login;
