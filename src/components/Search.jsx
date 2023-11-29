import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Link } from "react-router-dom";

const Search = () => {
    const [users, setUsers] = useState([]);
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState([]);
    const [query, setQuery] = useState("");
    const timeoutRef = useRef(null);

    const options = [
        ...users.map((user) => ({
            type: "Brugere",
            title: user.username,
            id: user.id,
        })),
        ...posts.map((post) => ({
            type: "Posts",
            title: post.title,
            id: post.id,
        })),
        ...comments.map((comment) => ({
            type: "Kommentarer",
            title: comment.content,
            id: comment.id,
            postId: comment.postId,
        })),
    ];

    useEffect(() => {
        if (query !== "") {
            if (timeoutRef.current !== null) {
                clearTimeout(timeoutRef.current);
            }

            timeoutRef.current = setTimeout(() => {
                searchAll();
            }, 1000);
        }
    }, [query]);

    async function searchAll() {
        await axios
            .get(`${import.meta.env.VITE_URL}/search/all/${query}`)
            .then((response) => {
                const { users, posts, comments } = response.data;

                const hasDeletedAt = [users, posts, comments].some((data) =>
                    data.some((item) => item.deletedAt)
                );

                if (!hasDeletedAt) {
                    setUsers(users);
                    setPosts(posts);
                    setComments(comments);
                }
            });
    }

    return (
        <>
            <Autocomplete
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Søg"
                        variant="outlined"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                )}
                options={options}
                groupBy={(option) => option.type}
                getOptionLabel={(option) => option.title}
                isOptionEqualToValue={(option, value) =>
                    option.id === value.id && option.type === value.type
                }
                renderOption={(props, option) => {
                    let link;
                    switch (option.type) {
                        case "Brugere":
                            link = `/u/${option.title}`;
                            break;

                        case "Posts":
                            link = `/p/${option.id}`;
                            break;

                        case "Kommentarer":
                            link = `/p/${option.postId}`;
                            break;
                    }

                    return (
                        <li {...props}>
                            <Link to={link} sx={{ textDecoration: "none" }}>
                                {option.title}
                            </Link>
                        </li>
                    );
                }}
                sx={{ width: 200 }}
            />
        </>
    );
};

export default Search;
