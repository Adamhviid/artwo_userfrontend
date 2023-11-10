import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pagination, Stack } from "@mui/material";

import Post from "../../components/Post";
import selfie from "../../images/DuckFace.jpeg";

const FrontPage = () => {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const pageSize = 2; 

    useEffect(() => {
        fetchPosts();
    }, [currentPage]);

    async function fetchPosts() {
        try {
            const response = await axios.get(
                `http://localhost:8080/post/all?page=${currentPage}&pageSize=${pageSize}`
            );
            const likes = response.data.likes;
            let tmpPosts = response.data.posts;
            let tmpComments = response.data.comments;
            const totalCount = response.data.postPages;

            const calculatedTotalPages = Math.ceil(totalCount / pageSize);
            setTotalPages(calculatedTotalPages);

            tmpPosts.forEach((post) => {
                let totalLikes = 0;
                post.comments = [];
                post.userLiked = false;

                likes.forEach((like) => {
                    if (like.postId === post.id) {
                        totalLikes++;

                        if (like.userId == localStorage.getItem("userId")) {
                            post.userLiked = true;
                        }
                    }
                });
                post.totalLikes = totalLikes++;

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
        <div>
            <h1>Frontpage</h1>
            {posts.map((post) => (
                <Post
                    key={post.id}
                    id={post.id}
                    totalLikes={post.totalLikes}
                    userLiked={post.userLiked}
                    title={post.title}
                    date={post.updatedAt}
                    description={post.content}
                    image={selfie}
                    comments={post.comments}
                />
            ))}
            <Stack spacing={2} sx={{float: 'right', marginBottom: '50px'}}>
                <Pagination
                    count={totalPages}
                    shape="rounded"
                    page={currentPage}
                    onChange={(event, page) => setCurrentPage(page)}
                />
            </Stack>
        </div>
    );
};

export default FrontPage;
