import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAuth } from "../../AuthContext";

import { Grid, Typography } from "@mui/material";

import processPost from "../../components/Posts/ProcessPost";
import Post from "../../components/Posts/Post";

const Tag = () => {
    const [posts, setPosts] = useState({});
    const [loading, setLoading] = useState(true);
    const { tag } = useParams();
    const { state } = useAuth();

    useEffect(() => {
        fetchPost();
    }, [loading, tag]);

    async function fetchPost() {
        try {
            await axios
                .get(`${import.meta.env.VITE_URL}/post/get/tag/${tag}`)
                .then((response) => {
                    const tmpPosts = response.data.posts;
                    const followers = response.data.followers;

                    const processedPosts = tmpPosts.map((post) =>
                        processPost(post, state, followers)
                    );
                    setPosts(processedPosts);
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
            <Typography
                variant="h4"
                sx={{ marginBottom: "20px", textAlign: "center" }}
            >
                {tag.toUpperCase()}
            </Typography>
            {posts.map((post) => (
                <Post
                    key={post.id}
                    id={post.id}
                    username={post.user.username}
                    userId={post.userId}
                    totalLikes={post.totalLikes}
                    userLiked={post.userLiked}
                    totalFollowers={post.totalFollowers}
                    userFollowed={post.userFollowed}
                    title={post.title}
                    date={post.updatedAt}
                    description={post.content}
                    image={post.image}
                    comments={post.comments}
                    tags={post.tags}
                    sx={{ maxWidth: "100%", overflow: "hidden" }}
                />
            ))}
        </Grid>
    );
};

export default Tag;
