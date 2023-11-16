import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAuth } from "../../AuthContext";

import { Grid } from "@mui/material";

import Post from "../../components/Posts/Post";

const SinglePost = () => {
    const [post, setPost] = useState({});
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const { state } = useAuth();

    useEffect(() => {
        fetchPost();
    }, [loading, id]);

    function fetchPost() {
        axios
            .get(`${import.meta.env.VITE_URL}/post/get/${id}`)
            .then((response) => {
                const likes = response.data.post.likes;
                const tmpComments = response.data.post.comments;
                const followers = response.data.followers;
                const tmpPost = response.data.post;

                let totalLikes = 0;
                tmpPost.userLiked = false;

                let totalFollowers = 0;
                tmpPost.userFollowed = false;

                tmpPost.comments = [];

                likes.forEach((like) => {
                    if (like.postId === tmpPost.id) {
                        totalLikes++;

                        if (
                            state.isAuthenticated &&
                            like.userId == state.user.id
                        ) {
                            tmpPost.userLiked = true;
                        }
                    }
                });
                followers.forEach((follower) => {
                    if (follower.followId == tmpPost.userId) {
                        totalFollowers++;

                        if (
                            state.isAuthenticated &&
                            follower.userId == state.user.id
                        ) {
                            tmpPost.userFollowed = true;
                        }
                    }
                });

                tmpPost.totalLikes = totalLikes++;
                tmpPost.totalFollowers = totalFollowers++;

                tmpComments.forEach((comment) => {
                    if (comment.postId === tmpPost.id) {
                        tmpPost.comments.push(comment);
                    }
                });
                setPost(tmpPost);
                setLoading(false);
            });
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
                sx={{ maxWidth: "100%", overflow: "hidden" }}
            />
        </Grid>
    );
};

export default SinglePost;
