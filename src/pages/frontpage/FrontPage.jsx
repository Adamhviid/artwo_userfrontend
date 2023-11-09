import React, { useState, useEffect } from "react";
import axios from "axios";
import Post from "../../components/Post";
import selfie from "../../images/DuckFace.jpeg";

const FrontPage = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetchPosts();
    }, []);

    async function fetchPosts() {
        await axios.get("http://localhost:8080/post/all").then((response) => {
            const likes = response.data.likes;
            let tmpPosts = response.data.posts;

            tmpPosts.forEach((post) => {
                post.isLiked = false;
                likes.forEach((like) => {
                    if (like.postId === post.id) {
                        post.isLiked = true;
                    }
                });
            });
            setPosts(tmpPosts);
        });
    }

    return (
        <div>
            <h1>FrontPage</h1>
            {posts.map((post) => (
                <Post
                    key={post.id}
                    id={post.id}
                    isLiked={post.isLiked}
                    title={post.title}
                    date={post.updatedAt}
                    description={post.content}
                    image={selfie}
                />
            ))}
        </div>
    );
};

export default FrontPage;
