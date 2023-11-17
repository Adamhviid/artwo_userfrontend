import React, { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { formatDistanceToNow, differenceInMinutes } from "date-fns";
import { Avatar, Grid, Paper } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAuth } from "../../AuthContext";

const Comment = (props) => {
    const { isDeleted, postId, commentId, userId, date, comment, username } =
        props;

    const [userComment, setUserComment] = useState(false);
    const [isDeletedState, setIsDeletedState] = useState(false);

    const { state } = useAuth();

    useEffect(() => {
        if (isDeleted != null) {
            setIsDeletedState(true);
        }
        handleDeteIcon();
    }, []);

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

    function commentFromNow(dateString) {
        const date = new Date(dateString);
        const now = new Date();

        if (differenceInMinutes(now, date) > 61) {
            return null;
        }

        return ", " + formatDistanceToNow(date) + " ago";
    }

    function handleDeteIcon() {
        if (state.isAuthenticated && state.user.id == userId) {
            setUserComment(true);
        }
    }

    async function handleDelete() {
        await axios
            .post(
                `${import.meta.env.VITE_URL}/post/uncomment/` + postId,
                {
                    commentId: commentId,
                },
                {
                    headers: {
                        token: localStorage.getItem("token"),
                    },
                }
            )
            .then(() => {
                setIsDeletedState(true);
            });
    }

    if (isDeletedState) {
        return null;
    }

    return (
        <Paper
            sx={{
                padding: "0px 1px 1px 10px",
                margin: "5px",
            }}
        >
            <Grid container direction="row" alignItems="center">
                <Avatar aria-label="profilePicture">
                    {username.charAt(0)}
                </Avatar>
                <Link to={`/u/${username}`} style={{ textDecoration: "none" }}>
                    <p style={{ padding: "10px" }}>{username}</p>
                </Link>
                {userComment ? (
                    <DeleteIcon
                        style={{
                            marginLeft: "auto",
                            paddingRight: "5px",
                            cursor: "pointer",
                        }}
                        onClick={() => handleDelete()}
                    />
                ) : null}
            </Grid>
            <Grid justifyContent="left">
                <p
                    style={{ wordWrap: "break-word", marginTop: "-5px" }}
                    dangerouslySetInnerHTML={{
                        __html: comment.replace(/\n/g, "<br />"),
                    }}
                />
                <p style={{ color: "grey", fontSize: "15px" }}>
                    {formatDate(date)}
                    {commentFromNow(date)}
                </p>
            </Grid>
        </Paper>
    );
};

Comment.propTypes = {
    isDeleted: PropTypes.string,
    postId: PropTypes.number.isRequired,
    commentId: PropTypes.number.isRequired,
    userId: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
    comment: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
};

export default Comment;
