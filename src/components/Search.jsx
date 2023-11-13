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
                setUsers(response.data.users);
                setPosts(response.data.posts);
                setComments(response.data.comments);
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
                renderOption={(props, option) => {
                    let link;
                    switch (option.type) {
                        case "Brugere":
                            link = `/u/${option.title}`;
                            break;

                        case "Posts":
                            link = `/posts/${option.id}`;
                            break;

                        case "Kommentarer":
                            link = `/comments/${option.id}`;
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
