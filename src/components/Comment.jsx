import React, { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { formatDistanceToNow, differenceInMinutes } from "date-fns";
import { Avatar, Grid, Paper } from "@mui/material";

const Comment = (props) => {
    const { userId, date, comment } = props;
    const [name, setName] = useState();

    useEffect(() => {
        fetchUser();
    }, []);

    async function fetchUser() {
        await axios
            .get("http://localhost:8080/user/get/" + userId, {
                headers: {
                    token: localStorage.getItem("token"),
                },
            })
            .then((response) => {
                setName(response.data.username);
            });
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

    function commentFromNow(dateString) {
        const date = new Date(dateString);
        const now = new Date();

        if (differenceInMinutes(now, date) > 61) {
            return null;
        }

        return ", " + formatDistanceToNow(date) + " ago";
    }

    return (
        <Paper
            sx={{
                
                padding: "0px 1px 1px 10px",
                margin: "5px",
            }}
        >
            <Grid container direction="row" alignItems="center">
                <Avatar alt="Remy Sharp" src={"asd"} />
                <h4 style={{ paddingLeft: "5px" }}>{name}</h4>
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
    userId: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
    comment: PropTypes.string.isRequired,
};

export default Comment;
