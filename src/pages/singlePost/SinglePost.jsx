import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAuth } from "../../AuthContext";

import { Grid } from "@mui/material";

import processPost from "../../components/Posts/ProcessPost";
import Post from "../../components/Posts/Post";

const SinglePost = () => {
    const [post, setPost] = useState({});
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const { state } = useAuth();

    useEffect(() => {
        fetchPost();
    }, [loading, id]);

    async function fetchPost() {
        try {
            await axios
                .get(`${import.meta.env.VITE_URL}/post/get/id/${id}`)
                .then((response) => {
                    const post = response.data.post;
                    const followers = response.data.followers;

                    const tmpPost = processPost(post, state, followers);
                    setPost(tmpPost);
                    setLoading(false);
                });
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Grid container spacing={2} sx={{ width: "85%" }}>
            <Post
                key={post.id}
                id={post.id}
                title={post.title}
                description={post.content}
                username={post.user.username}
                userId={post.user.id}
                totalLikes={post.totalLikes}
                userLiked={post.userLiked}
                totalFollowers={post.totalFollowers}
                userFollowed={post.userFollowed}
                date={post.updatedAt}
                comments={post.comments}
                tags={post.tags}
                sx={{ maxWidth: "100%", overflow: "hidden" }}
            />
        </Grid>
    );
};

export default SinglePost;
