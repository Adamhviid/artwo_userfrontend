import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useAuth } from "../AuthContext";
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
                    "http://localhost:8080/post/like/" + id,
                    {
                        userId: state.user.id,
                        postId: id,
                    },
                    {
                        headers: {
                            token: state.user.token,
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
                    "http://localhost:8080/post/unlike/" + id,
                    {
                        userId: state.user.id,
                        postId: id,
                    },
                    {
                        headers: {
                            token: state.user.token,
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
                postId={id}
                isDeleted={comment.deletedAt}
                userId={comment.userId}
                date={comment.updatedAt}
                comment={comment.content}
            />
        ));
    }

    async function handleComment() {
        await axios
            .post(
                "http://localhost:8080/post/comment/" + id,
                {
                    userId: state.user.id,
                    postId: id,
                    content: comment,
                },
                {
                    headers: {
                        token: state.user.token,
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
                            updatedAt: new Date(),
                            content: comment,
                        },
                    ]);
                } else {
                    alert("Noget gik galt");
                }
            });
    }

    async function handleFollow() {
        await axios
            .post(
                "http://localhost:8080/user/follow/" + id,
                {
                    userId: state.user.id,
                    followId: userId,
                },
                {
                    headers: {
                        token: state.user.token,
                    },
                }
            )
            .then(() => {
                setFollowed(true);
                setTotalFollowersState(totalFollowersState + 1);
            });
    }

    return (
        <Card sx={{ width: "550px", margin: "20px" }}>
            <Grid container spacing={2}>
                <Grid item xs={11}>
                    <CardHeader
                        avatar={
                            <Avatar aria-label="profilePicture">Bro</Avatar>
                        }
                        title={
                            "userid:" +
                            userId +
                            " (" +
                            totalFollowers +
                            " følgere)"
                        }
                        subheader={formatDate(date)}
                    />
                </Grid>
                <Grid item xs={1}>
                    {!userFollowed ? (
                        <AddIcon
                            sx={{ paddingTop: "5px", cursor: "pointer" }}
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

            {state.isAuthenticated ? (
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
    userId: PropTypes.number.isRequired,
    userLiked: PropTypes.bool.isRequired,
    totalFollowers: PropTypes.number.isRequired,
    userFollowed: PropTypes.bool.isRequired,
    totalLikes: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    comments: PropTypes.array.isRequired,
};

export default Post;
