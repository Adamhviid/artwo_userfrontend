import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import { Pagination, Grid, Typography } from "@mui/material";

import Post from "../../components/Posts/Post";
import processPost from "../../components/Posts/ProcessPost";

const Profile = () => {
    const { state } = useAuth();
    const [user, setUser] = useState({});
    const { username } = useParams();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUser();
    }, [username]);

    async function fetchUser() {
        await axios
            .get(`${import.meta.env.VITE_URL}/user/get/` + username)
            .then(async (response) => {
                if (response.data != null) {
                    setUser(response.data);
                    await fetchPosts(response.data.id);
                    /* await fetchPosts(); */
                } else {
                    setUser({});
                }
            });
    }

    async function fetchPosts(id) {
        try {
            await axios
                .get(`${import.meta.env.VITE_URL}/post/get/userid/` + id)
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

    return (
        <>
            <div>
                <h1>Velkommen</h1>
                <p>Brugernavn: {user.username}</p>
                <p>E-mail: {user.email}</p>
                <p>Fornavn: {user.firstName}</p>
                <p>Efternavn: {user.lastName}</p>
            </div>
            <Grid container spacing={2} sx={{ width: "85%" }}>
                <Grid item xs={12}>
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
            </Grid>
        </>
    );
};

export default Profile;
