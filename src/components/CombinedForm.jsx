import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateField } from "@mui/x-date-pickers/DateField";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import {
    Button,
    CssBaseline,
    TextField,
    Grid,
    Link,
    Box,
    Typography,
    Container,
} from "@mui/material";

const CombinedForm = ({
    onPostSubmit,
    onLoginSubmit,
    onRegisterSubmit,
    postTitleLabel,
    postContentLabel,
    postTagsLabel,
    postTitlePlaceholder,
    postContentPlaceholder,
    postTagsPlaceholder,
    loginUsernameLabel,
    loginPasswordLabel,
    registerUsernameLabel,
    registerFirstNameLabel,
    registerLastNameLabel,
    registerEmailLabel,
    registerDateOfBirthLabel,
    registerPasswordLabel,
    registerPasswordCheckLabel,
    showPostForm,
    showLoginForm,
    showRegisterForm,
}) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [tags] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [registerUsername, setRegisterUsername] = useState("");
    const [registerFirstName, setRegisterFirstName] = useState("");
    const [registerLastName, setRegisterLastName] = useState("");
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerDateOfBirth, setRegisterDateOfBirth] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");

    const navigate = useNavigate();

    const handlePostSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios
                .post("http://localhost:8080/post/createpost", {
                    title: title,
                    content: content,
                    tags: tags,
                })
                .then((response) => {
                    localStorage.setItem("token", response.data.token);
                    localStorage.setItem("userId", response.data.id);
                    navigate("/profile");
                });
        } catch (error) {
            console.log(error);
        }
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios
                .post("http://localhost:8080/user/login", {
                    username: username,
                    password: password,
                })
                .then((response) => {
                    localStorage.setItem("token", response.data.token);
                    localStorage.setItem("userId", response.data.id);
                    navigate("/profile");
                });
        } catch (error) {
            console.log(error);
        }
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();

        try {
            const tenYearsCheck = new Date();
            tenYearsCheck.setFullYear(tenYearsCheck.getFullYear() - 10);
            if (new Date(registerDateOfBirth) > tenYearsCheck) {
                alert("Man skal være 10 år for at oprette en bruger");
                return;
            }
            await axios
                .post("http://localhost:8080/user/register", {
                    username: registerUsername,
                    firstName: registerFirstName,
                    lastName: registerLastName,
                    email: registerEmail,
                    dateOfBirth: registerDateOfBirth,
                    password: registerPassword,
                })
                .then((response) => {
                    localStorage.setItem("token", response.data.token);
                    localStorage.setItem("userId", response.data.id);
                    navigate("/profile");
                });
        } catch (error) {
            console.log(error);
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
                {showPostForm && (
                    <>
                        <Typography component="h1" variant="h5">
                            Hvad har du på hjertet?
                        </Typography>
                        <Box
                            component="form"
                            onSubmit={handlePostSubmit}
                            sx={{ mt: 3 }}
                        >
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="title"
                                        label={postTitleLabel}
                                        name="title"
                                        autoFocus
                                        placeholder={postTitlePlaceholder}
                                        onChange={(event) =>
                                            setTitle(event.target.value)
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="content"
                                        label={postContentLabel}
                                        type="text"
                                        multiline
                                        rows={15}
                                        placeholder={postContentPlaceholder}
                                        onChange={(event) =>
                                            setContent(event.target.value)
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="tags"
                                        label={postTagsLabel}
                                        type="text"
                                        placeholder={postTagsPlaceholder}
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
                                Offentliggør
                            </Button>
                            <Grid container justifyContent="flex-end"></Grid>
                        </Box>
                    </>
                )}

                {showLoginForm && (
                    <>
                        <Typography component="h1" variant="h5">
                            Log ind
                        </Typography>
                        <Box
                            component="form"
                            onSubmit={handleLoginSubmit}
                            sx={{ mt: 3 }}
                        >
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="username"
                                        label={loginUsernameLabel}
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
                                        label={loginPasswordLabel}
                                        type="password"
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
                            <Grid container justifyContent="flex-end"></Grid>
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
                                        Har du ikke en bruger? Opret en bruger
                                        her
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </>
                )}
                {showRegisterForm && (
                    <>
                        <Typography component="h1" variant="h5">
                            Registrer
                        </Typography>
                        <Box
                            component="form"
                            onSubmit={handleRegisterSubmit}
                            sx={{ mt: 3 }}
                        >
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="register-username"
                                        label={registerUsernameLabel}
                                        name="register-username"
                                        autoFocus
                                        onChange={(event) =>
                                            setRegisterUsername(
                                                event.target.value
                                            )
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="register-first-name"
                                        label={registerFirstNameLabel}
                                        onChange={(event) =>
                                            setRegisterFirstName(
                                                event.target.value
                                            )
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="register-last-name"
                                        label={registerLastNameLabel}
                                        onChange={(event) =>
                                            setRegisterLastName(
                                                event.target.value
                                            )
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="register-email"
                                        label={registerEmailLabel}
                                        onChange={(event) =>
                                            setRegisterEmail(event.target.value)
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid item xs={12}>
                                        <LocalizationProvider
                                            dateAdapter={AdapterDayjs}
                                        >
                                            <DemoContainer
                                                components={["DateField"]}
                                            >
                                                <DateField
                                                    required
                                                    fullWidth
                                                    label="Fødselsdato"
                                                    name="dateOfBirth"
                                                    id="dateOfBirth"
                                                    autoComplete="bday"
                                                    value={registerDateOfBirth}
                                                    format="DD/MM/YYYY"
                                                    onChange={(date) =>
                                                        setRegisterDateOfBirth(
                                                            date
                                                        )
                                                    }
                                                />
                                            </DemoContainer>
                                        </LocalizationProvider>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="register-password"
                                        label={registerPasswordLabel}
                                        type="password"
                                        onChange={(event) =>
                                            setRegisterPassword(
                                                event.target.value
                                            )
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
                                Register
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid>
                                    <Link
                                        variant="body2"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            navigate("/login");
                                        }}
                                        style={{ cursor: "pointer" }}
                                    >
                                        Har du allerede en bruger? Log ind her
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </>
                )}
            </Box>
        </Container>
    );
};

export default CombinedForm;
