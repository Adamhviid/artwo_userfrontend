import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import Post from "../../components/Posts/Post";

const SinglePost = () => {
    const [post, setPost] = useState();
    const { id } = useParams();

    useEffect(() => {
        fetchPost();
    }, [id]);

    async function fetchPost() {
        await axios
            .get(`${import.meta.env.VITE_URL}/post/get/${id}`)
            .then((response) => {
                console.log(response.data);
            });
    }

    return (
        <div>
            {post}
            {/*  <Post
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
                comments={post.comments}
                sx={{ maxWidth: "100%", overflow: "hidden" }}
            /> */}
        </div>
    );
};

export default SinglePost;
