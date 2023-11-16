import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import {
    Card,
    Grid,
    CardHeader,
    CardContent,
    Avatar,
    TextField,
    Button,
    CardMedia,
    Modal,
    Typography,
} from "@mui/material";

import Tags from "./Tags";
import { useAuth } from "../../../AuthContext";

const CreatePostModal = (props) => {
    const { fetchPosts } = props;
    const [title, setTitle] = useState();
    const [image, setImage] = useState();
    const [description, setDescription] = useState();
    const [tags, setTags] = useState([]);
    const [popularTags, setPopularTags] = useState([]);

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setTitle("");
        setImage("");
        setDescription("");
        setTags([]);
        setOpen(false);
    };

    const fileInputRef = useRef();
    const { state } = useAuth();

    useEffect(() => {
        getTags();
    }, []);

    const handleUploadButtonClick = () => {
        fileInputRef.current.click();
    };

    function handleSubmit(event) {
        event.preventDefault();
        if (title != "") {
            axios
                .post(
                    `${import.meta.env.VITE_URL}/post/create`,
                    {
                        title: title,
                        content: description,
                        tags: tags,
                        userId: state.user.id,
                    },
                    {
                        headers: {
                            token: localStorage.getItem("token"),
                        },
                    }
                )
                .then(() => {
                    fetchPosts();
                    handleClose();
                })
                .catch((error) => {
                    console.log(error.response);
                });
        }
    }

    function getTags() {
        axios
            .get(`${import.meta.env.VITE_URL}/post/tags/all`)
            .then((response) => {
                const tags = response.data.map((item) => item.tag);
                setPopularTags(tags);
            })
            .catch((error) => {
                console.log(error.response);
            });
    }

    return (
        <>
            <Card sx={{ width: "100%", margin: "20px" }}>
                <Grid container spacing={2}>
                    <Grid item xs={11}>
                        <CardHeader
                            avatar={
                                <Avatar aria-label="profilePicture">Bro</Avatar>
                            }
                            title={
                                <TextField
                                    fullWidth
                                    label={
                                        "Har du noget på hjertet, " +
                                        state.user.username
                                    }
                                    onClick={handleOpen}
                                />
                            }
                        />
                    </Grid>
                </Grid>
            </Card>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Card
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 500,
                        height: "auto",
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <Grid container spacing={2}>
                        <Typography variant="h4" align="center">
                            Opret opslag
                        </Typography>
                        <Grid item xs={11}>
                            <CardHeader
                                title={
                                    <TextField
                                        required
                                        fullWidth
                                        id="title"
                                        label="Titel"
                                        name="title"
                                        onChange={(event) =>
                                            setTitle(event.target.value)
                                        }
                                    />
                                }
                            />
                            <CardContent>
                                {image != undefined ? (
                                    <CardMedia
                                        component="img"
                                        height="200"
                                        image={image}
                                        sx={{ objectFit: "contain" }}
                                    />
                                ) : null}
                                <Button
                                    variant="contained"
                                    component="span"
                                    onClick={handleUploadButtonClick}
                                >
                                    Upload billede
                                </Button>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    hidden
                                    onChange={(event) => {
                                        const file = event.target.files[0];
                                        setImage(URL.createObjectURL(file));
                                    }}
                                />
                            </CardContent>
                            <CardContent>
                                <TextField
                                    fullWidth
                                    id="description"
                                    label="Beskrivelse"
                                    name="description"
                                    onChange={(event) =>
                                        setDescription(event.target.value)
                                    }
                                />
                            </CardContent>
                            <CardContent>
                                <Tags
                                    tags={tags}
                                    setTags={setTags}
                                    popularTags={popularTags}
                                />
                            </CardContent>
                        </Grid>
                    </Grid>
                    <Button
                        variant="contained"
                        sx={{ float: "right", margin: "5px" }}
                        onClick={handleSubmit}
                    >
                        Opret
                    </Button>
                </Card>
            </Modal>
        </>
    );
};

CreatePostModal.propTypes = {
    fetchPosts: PropTypes.func.isRequired,
};

export default CreatePostModal;
