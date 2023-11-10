import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
    Button,
    CssBaseline,
    TextField,
    Grid,
    Box,
    Typography,
    Container,
} from "@mui/material";

const Form = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [tags, setTags] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {
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
                    Hvad har du på hjertet?
                </Typography>
                <Box component="form" onSubmit={handleLogin} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="title"
                                label="Titel"
                                name="username"
                                autoFocus
                                onChange={(event) =>
                                    setTitle(event.target.value)
                                }
                                title="F.eks: Problemer med min bil, hvorfor er der så mange der ikke kan køre bil?"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="content"
                                label="Dit opslag"
                                type="text"
                                id="content"
                                multiline
                                rows={15}
                                onChange={(event) =>
                                    setContent(event.target.value)
                                }
                                title="F.eks Jeg har problemer med min bil, den vil ikke starte, hvad kan jeg gøre? Jeg har prøvet alt! Hjælp mig! :( #RAWR "
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="tags"
                                label="Tags"
                                type="text"
                                id="tags"
                                onChange={(event) =>
                                    setTags(event.target.value)
                                }
                                title="F.eks: Fest, Venner, Sport, NSFW"
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
            </Box>
        </Container>
    );
};

export default Form;
