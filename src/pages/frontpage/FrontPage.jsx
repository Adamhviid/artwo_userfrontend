import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pagination, Grid, Typography } from "@mui/material";
import "./FrontPage.css";

import { useAuth } from "../../AuthContext";
import Post from "../../components/Posts/Post";
import processPost from "../../components/Posts/ProcessPost";
import CreatePost from "../../components/Posts/CreatePost/CreatePostModal";

const FrontPage = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const pageSize = 10;

    const { state } = useAuth();

    useEffect(() => {
        fetchPosts();
    }, [currentPage, loading]);

    async function fetchPosts() {
        try {
            await axios
                .get(
                    `${
                        import.meta.env.VITE_URL
                    }/post/all?page=${currentPage}&pageSize=${pageSize}`
                )
                .then((response) => {
                    console.log(response.data);
                    const tmpPosts = response.data.posts;
                    const followers = response.data.followers;

                    const processedPosts = tmpPosts.map((post) =>
                        processPost(post, state, followers)
                    );
                    setPosts(processedPosts);
                    setLoading(false);
                    setTotalPages(
                        Math.ceil(response.data.postPages / pageSize)
                    );
                });
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    function handlePageChange(event, page) {
        setCurrentPage(page);
        window.scrollTo(0, 0);
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
                        image={post.image}
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
                        onChange={handlePageChange}
                    />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default FrontPage;
