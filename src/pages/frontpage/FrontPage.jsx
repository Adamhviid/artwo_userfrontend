import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pagination, Grid, Typography } from "@mui/material";

import { useAuth } from "../../AuthContext";
import Post from "../../components/Posts/Post";
import CreatePost from "../../components/Posts/CreatePost/CreatePostModal";
import selfie from "../../images/DuckFace.jpeg";

const FrontPage = () => {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const pageSize = 2;

    const { state } = useAuth();

    useEffect(() => {
        fetchPosts();
    }, [currentPage]);

    async function fetchPosts() {
        try {
            const response = await axios.get(
                `${
                    import.meta.env.VITE_URL
                }/post/all?page=${currentPage}&pageSize=${pageSize}`
            );
            const tmpPosts = response.data.posts;
            const totalCount = response.data.postPages;

            const followers = response.data.followers;

            const calculatedTotalPages = Math.ceil(totalCount / pageSize);
            setTotalPages(calculatedTotalPages);

            tmpPosts.forEach((post) => {
                const likes = post.likes;
                const comments = post.comments;
                const tags = post.tags;

                let totalLikes = 0;
                post.userLiked = false;

                let totalFollowers = 0;
                post.userFollowed = false;

                post.comments = [];
                post.tags = [];

                likes.forEach((like) => {
                    totalLikes++;

                    if (state.isAuthenticated && like.userId == state.user.id) {
                        post.userLiked = true;
                    }
                });
                post.totalLikes = totalLikes++;

                followers.forEach((follower) => {
                    if (follower.followId == post.userId) {
                        totalFollowers++;

                        if (
                            state.isAuthenticated &&
                            follower.userId == state.user.id
                        ) {
                            post.userFollowed = true;
                        }
                    }
                });
                post.totalFollowers = totalFollowers++;

                comments.forEach((comment) => {
                    post.comments.push(comment);
                });

                tags.forEach((tag) => {
                    post.tags.push(tag.tag);
                });
            });

            setPosts(tmpPosts);
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    }

    return (
        <Grid container spacing={2} sx={{ width: "85%" }}>
            {state.isAuthenticated ? (
                <Grid item xs={12}>
                    <CreatePost fetchPosts={fetchPosts} />
                </Grid>
            ) : null}
            <Grid item xs={12}>
                <Typography
                    variant="h4"
                    align="center"
                    sx={{ fontStyle: "italic" }}
                >
                    Opslag
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
                        image={selfie}
                        comments={post.comments}
                        tags={post.tags}
                        sx={{ maxWidth: "100%", overflow: "hidden" }}
                    />
                ))}
            </Grid>
            <Grid item xs={12}>
                <Grid container justifyContent="center">
                    <Pagination
                        count={totalPages}
                        shape="rounded"
                        page={currentPage}
                        onChange={(event, page) => setCurrentPage(page)}
                    />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default FrontPage;
