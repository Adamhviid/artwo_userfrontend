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
            let tmpComments = response.data.comments;

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
        });
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
        </div>
    );
};

export default FrontPage;
