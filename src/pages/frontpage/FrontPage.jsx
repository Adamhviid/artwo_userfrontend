import React, { useState, useEffect } from "react";
import axios from "axios";
import Post from "../../components/Post";
import selfie from "../../images/DuckFace.jpeg";

const FrontPage = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetchPosts();
    }, [posts, setPosts]);

    async function fetchPosts() {
        await axios.get("http://localhost:8080/post/all").then((response) => {
            const likes = response.data.likes;
            let tmpPosts = response.data.posts;

            tmpPosts.forEach((post) => {
                post.userLiked = false;
                let totalLikes = 0;
                likes.forEach((like) => {
                    if (like.postId === post.id) {
                        totalLikes++;

                        if(like.userId == localStorage.getItem("userId")) {
                            post.userLiked = true;
                        }
                    }
                });
                post.totalLikes = totalLikes++;
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
                    totalLikes={post.totalLikes}
                    userLiked={post.userLiked}
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
