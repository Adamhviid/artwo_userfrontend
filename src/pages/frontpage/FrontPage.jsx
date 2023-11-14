import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pagination, Grid } from "@mui/material";

import { useAuth } from "../../AuthContext";
import Post from "../../components/Post";
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
            const totalCount = response.data.postPages;
            const likes = response.data.likes;
            const followers = response.data.followers;
            const tmpComments = response.data.comments;
            const tmpPosts = response.data.posts;

            const calculatedTotalPages = Math.ceil(totalCount / pageSize);
            setTotalPages(calculatedTotalPages);

            tmpPosts.forEach((post) => {
                let totalLikes = 0;
                post.userLiked = false;

                let totalFollowers = 0;
                post.userFollowed = false;

                post.comments = [];

                likes.forEach((like) => {
                    if (like.postId === post.id) {
                        totalLikes++;

                        if (
                            state.isAuthenticated &&
                            like.userId == state.user.id
                        ) {
                            post.userLiked = true;
                        }
                    }
                });
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

                post.totalLikes = totalLikes++;
                post.totalFollowers = totalFollowers++;

                tmpComments.forEach((comment) => {
                    if (comment.postId === post.id) {
                        post.comments.push(comment);
                    }
                });
            });
            setPosts(tmpPosts);
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    }

    return (
        <Grid container spacing={2} sx={{ width: "70%", overflow: "" }}>
            <Grid item xs={12}>
                <h1>Frontpage + rasmus</h1>
                {posts.map((post) => (
                    <Post
                        key={post.id}
                        id={post.id}
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
                        sx={{ maxWidth: "100%", overflow: "hidden" }} // Adjust styles for Post component
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
