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
} from "@mui/material";
import {
    Favorite as FavoriteIcon,
    Share as ShareIcon,
} from "@mui/icons-material";

const Post = (props) => {
    const { id, userLiked, totalLikes, title, date, description, image } = props;
    const [like, setLike] = useState(userLiked);

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
                    } else {
                        alert("Noget gik galt");
                    }
                });
        }
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <Card sx={{ width: "350px", margin: "20px" }}>
            <CardHeader
                avatar={<Avatar aria-label="profilePicture">Bro</Avatar>}
                title={title}
                subheader={formatDate(date)}
            />
            {/* <CardMedia
                component="img"
                height="194"
                image={image}
                alt="Post"
                sx={{ objectFit: "contain", padding: "10px" }}
            /> */}
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
                </IconButton> {totalLikes} likes
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
            </CardActions>
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
};

export default Post;
