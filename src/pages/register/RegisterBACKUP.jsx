import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateField } from "@mui/x-date-pickers/DateField";
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

const Register = () => {
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState();
    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            if (password !== passwordCheck) {
                alert("Kodeord er ikke ens");
                return;
            }

            const tenYearsCheck = new Date();
            tenYearsCheck.setFullYear(tenYearsCheck.getFullYear() - 10);
            if (new Date(dateOfBirth) > tenYearsCheck) {
                alert("Man skal være 10 år for at oprette en bruger");
                return;
            }

            await axios
                .post("http://localhost:8080/user/register", {
                    username: username,
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    dateOfBirth: dateOfBirth,
                    password: password,
                })
                .then(() => {
                    navigate("/");
                });
        } catch (error) {
            if (error.response.status === 400) {
                alert(error.response.data);
            } else {
                console.log(error);
            }
        }
    };

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
                <Box component="form" onSubmit={handleRegister} sx={{ mt: 3 }}>
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
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="given-name"
                                name="firstName"
                                required
                                fullWidth
                                id="firstName"
                                label="Fornavn"
                                onChange={(event) =>
                                    setFirstName(event.target.value)
                                }
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="lastName"
                                label="Efternavn"
                                name="lastName"
                                autoComplete="family-name"
                                onChange={(event) =>
                                    setLastName(event.target.value)
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email Adresse"
                                name="email"
                                autoComplete="email"
                                onChange={(event) =>
                                    setEmail(event.target.value)
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={["DateField"]}>
                                    <DateField
                                        required
                                        fullWidth
                                        label="Fødselsdato"
                                        name="dateOfBirth"
                                        id="dateOfBirth"
                                        autoComplete="bday"
                                        value={dateOfBirth}
                                        format="DD/MM/YYYY"
                                        onChange={(date) =>
                                            setDateOfBirth(date)
                                        }
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
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
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="passwordCheck"
                                label="Genindtast Password"
                                type="password"
                                id="passwopasswordCheckrd"
                                onChange={(event) =>
                                    setPasswordCheck(event.target.value)
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
                        Opret bruger
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid>
                            <Link
                                variant="body2"
                                onClick={(e) => {
                                    e.preventDefault();
                                    navigate("/login");
                                }}
                            >
                                Har du allerede en bruger? Log ind her
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

export default Register;
