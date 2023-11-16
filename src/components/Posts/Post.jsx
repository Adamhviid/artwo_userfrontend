import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useAuth } from "../../AuthContext";
import { Link } from "react-router-dom";
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
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";

import Comment from "./Comment";

const Post = (props) => {
    const {
        id,
        userId,
        username,
        userLiked,
        totalFollowers,
        userFollowed,
        totalLikes,
        title,
        date,
        description,
        image,
        comments,
    } = props;

    const { state } = useAuth();

    const [like, setLike] = useState(userLiked);
    const [totalLikesState, setTotalLikesState] = useState(totalLikes);

    const [followed, setFollowed] = useState(userFollowed);
    const [totalFollowersState, setTotalFollowersState] =
        useState(totalFollowers);

    const [comment, setComment] = useState();
    const [commentsState, setCommentsState] = useState(comments);

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

    async function handleLike() {
        if (state.isAuthenticated != true) {
            alert("You must be logged in to like a post");
            return;
        }

        if (!like) {
            await axios
                .post(
                    `${import.meta.env.VITE_URL}/post/like/` + id,
                    {
                        userId: state.user.id,
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
                    }
                });
        } else {
            await axios
                .post(
                    `${import.meta.env.VITE_URL}/post/unlike/` + id,
                    {
                        userId: state.user.id,
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
                    }
                });
        }
    }

    function commentSection() {
        return commentsState.map((comment) => (
            <Comment
                key={comment.id}
                commentId={comment.id}
                username={comment.user.username}
                userId={comment.user.id}
                postId={id}
                isDeleted={comment.deletedAt}
                date={new Date(comment.updatedAt).toISOString()}
                comment={comment.content}
            />
        ));
    }

    async function handleComment() {
        await axios
            .post(
                `${import.meta.env.VITE_URL}/post/comment/` + id,
                {
                    userId: state.user.id,
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
                            userId: state.user.id,
                            user: {
                                username: state.user.username,
                                id: state.user.id,
                            },
                            postId: id,
                            isDeleted: null,
                            updatedAt: new Date(),
                            content: comment,
                        },
                    ]);
                    setComment("");
                } else {
                    alert("Noget gik galt");
                }
            });
    }

    async function handleFollow() {
        await axios
            .post(
                `${import.meta.env.VITE_URL}/user/follow/` + id,
                {
                    userId: state.user.id,
                    followId: userId,
                },
                {
                    headers: {
                        token: localStorage.getItem("token"),
                    },
                }
            )
            .then(() => {
                setFollowed(true);
                setTotalFollowersState(totalFollowersState + 1);
            });
    }

    return (
        <Card sx={{ width: "100%", margin: "20px" }}>
            <Grid container spacing={2}>
                <Grid item xs={11}>
                    <Link
                        to={`/u/${username}`}
                        style={{ textDecoration: "none" }}
                    >
                        <CardHeader
                            avatar={
                                <Avatar aria-label="profilePicture">
                                    {username.charAt(0)}
                                </Avatar>
                            }
                            title={
                                username +
                                " (" +
                                totalFollowersState +
                                " følgere)"
                            }
                            subheader={formatDate(date)}
                        />
                    </Link>
                </Grid>
                <Grid item xs={1}>
                    {!followed ? (
                        <AddIcon
                            sx={{
                                position: "relative",
                                right: "100%",
                                top: "50%",
                                cursor: "pointer",
                            }}
                            onClick={() => handleFollow()}
                        />
                    ) : (
                        <CheckIcon sx={{ paddingTop: "5px" }} />
                    )}
                </Grid>
            </Grid>
            <CardContent>
                <Typography>{title}</Typography>
            </CardContent>
            <CardMedia
                component="img"
                height="350"
                image={""}
                sx={{ objectFit: "contain" }}
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton
                    aria-label="Tilføj til favorriter"
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

            {state.isAuthenticated ? (
                <Card sx={{ padding: "20px" }}>
                    <Grid container spacing={2}>
                        <Grid item xs={11}>
                            <TextField
                                id="input-with-icon-textfield"
                                label="Ny kommentar"
                                fullWidth
                                multiline
                                value={comment}
                                variant="standard"
                                onChange={(e) => setComment(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" && !e.shiftKey) {
                                        e.preventDefault();
                                        handleComment();
                                    }
                                }}
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
    userId: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
    userLiked: PropTypes.bool.isRequired,
    totalFollowers: PropTypes.number.isRequired,
    userFollowed: PropTypes.bool.isRequired,
    totalLikes: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    description: PropTypes.string,
    image: PropTypes.string,
    comments: PropTypes.array,
};

export default Post;
