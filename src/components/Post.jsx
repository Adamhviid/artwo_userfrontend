import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

import {
    Card,
    CardHeader,
    CardMedia,
    CardContent,
    CardActions,
    Avatar,
    IconButton,
    Typography,
    TextField,
    Grid,
} from "@mui/material";
import { Favorite as FavoriteIcon } from "@mui/icons-material";
import SendIcon from "@mui/icons-material/Send";

import Comment from "./Comment";

const Post = (props) => {
    const {
        id,
        userLiked,
        totalLikes,
        title,
        date,
        description,
        image,
        comments,
    } = props;

    const [like, setLike] = useState(userLiked);
    const [totalLikesState, setTotalLikesState] = useState(totalLikes);
    const [comment, setComment] = useState();
    const [commentsState, setCommentsState] = useState(comments);

    async function handleLike() {
        if (!localStorage.getItem("userId")) {
            alert("You must be logged in to like a post");
            return;
        }

        if (!like) {
            await axios
                .post(
                    "http://localhost:8080/post/like/" + id,
                    {
                        userId: localStorage.getItem("userId"),
                        postId: id,
                    },
                    {
                        headers: {
                            token: localStorage.getItem("token"),
                        },
                    }
                )
                .then((response) => {
                    if (response.status === 200) {
                        setLike(true);
                        setTotalLikesState(totalLikesState + 1);
                    } else {
                        alert("Noget gik galt");
                    }
                });
        } else {
            await axios
                .post(
                    "http://localhost:8080/post/unlike/" + id,
                    {
                        userId: localStorage.getItem("userId"),
                        postId: id,
                    },
                    {
                        headers: {
                            token: localStorage.getItem("token"),
                        },
                    }
                )
                .then((response) => {
                    if (response.status === 200) {
                        setLike(false);
                        setTotalLikesState(totalLikesState - 1);
                    } else {
                        alert("Noget gik galt");
                    }
                });
        }
    }

    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    }

    function commentSection() {
        return commentsState.map((comment) => (
            <Comment
                key={comment.id}
                userId={comment.userId}
                date={comment.updatedAt}
                comment={comment.content}
            />
        ));
    }

    async function handleComment() {
        console.log(id, comment);
        await axios
            .post(
                "http://localhost:8080/post/comment/" + id,
                {
                    userId: localStorage.getItem("userId"),
                    postId: id,
                    content: comment,
                },
                {
                    headers: {
                        token: localStorage.getItem("token"),
                    },
                }
            )
            .then((response) => {
                if (response.status === 200) {
                    setCommentsState([
                        ...commentsState,
                        {
                            id: response.data.id,
                            userId: localStorage.getItem("userId"),
                            updatedAt: new Date(),
                            content: comment,
                        },
                    ]);
                } else {
                    alert("Noget gik galt");
                }
            });
    }

    return (
        <Card sx={{ width: "550px", margin: "20px" }}>
            <CardHeader
                avatar={<Avatar aria-label="profilePicture">Bro</Avatar>}
                title={title}
                subheader={formatDate(date)}
            />
            <CardMedia
                component="img"
                height="350"
                image={image}
                alt="Post"
                sx={{ objectFit: "contain" }}
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton
                    aria-label="add to favorites"
                    onClick={() => handleLike()}
                >
                    {like ? (
                        <FavoriteIcon style={{ color: "red" }} />
                    ) : (
                        <FavoriteIcon style={{ color: "grey" }} />
                    )}
                </IconButton>{" "}
                {totalLikesState} likes
            </CardActions>

            {commentSection()}

            {localStorage.getItem("userId") ? (
                <Card sx={{ padding: "20px" }}>
                    <Grid container spacing={2}>
                        <Grid item xs={11}>
                            <TextField
                                id="input-with-icon-textfield"
                                label="Ny kommentar"
                                fullWidth
                                multiline
                                variant="standard"
                                onChange={(e) => setComment(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={1}>
                            <SendIcon
                                sx={{
                                    float: "right",
                                    width: "30px",
                                    height: "auto",
                                    paddingTop: "10px",
                                    color: "rgb(97, 180, 76)",
                                    cursor: "pointer",
                                }}
                                onClick={() => handleComment()}
                            />
                        </Grid>
                    </Grid>
                </Card>
            ) : null}
        </Card>
    );
};

Post.propTypes = {
    id: PropTypes.number.isRequired,
    userLiked: PropTypes.bool.isRequired,
    totalLikes: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    comments: PropTypes.array.isRequired,
};

export default Post;
