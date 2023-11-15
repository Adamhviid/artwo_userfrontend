import React from "react";
import PropTypes from "prop-types";

import { TextField, Autocomplete } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import Chip from "@mui/material/Chip";
import CancelIcon from "@mui/icons-material/Cancel";

const Tags = (props) => {
    const { tags, setTags, popularTags } = props;

    return (
        <>
            {tags.map((tag, index) => (
                <Chip
                    key={index}
                    label={tag}
                    onDelete={() => {
                        setTags((prevTags) =>
                            prevTags.filter((t) => t !== tag)
                        );
                    }}
                    sx={{ margin: "2px" }}
                    deleteIcon={<CancelIcon />}
                />
            ))}
            <Autocomplete
                id="tags-standard"
                options={popularTags}
                getOptionLabel={(option) =>
                    typeof option === "object" ? option.tag : option
                }
                isOptionEqualToValue={(option, value) =>
                    option.tag === value.tag
                }
                renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="standard"
                        label="Tags"
                        placeholder="Add Tags"
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <>
                                    {params.InputProps.endAdornment}
                                    <IconButton
                                        onClick={() => {
                                            const value = params.inputProps.value;
                                            
                                            if (value !== "" && !tags.includes(value)) {
                                                setTags((prevTags) => [
                                                    ...prevTags,
                                                    value,
                                                ]);
                                                params.inputProps.value = "";
                                            }
                                        }}
                                    >
                                        <AddIcon />
                                    </IconButton>
                                </>
                            ),
                        }}
                        onKeyDown={(event) => {
                            if (event.key === "Enter") {
                                event.preventDefault();
                                const value = params.inputProps.value;
                                if (value !== "" && !tags.includes(value)) {
                                    setTags((prevTags) => [...prevTags, value]);
                                    params.inputProps.value = "";
                                }
                            }
                        }}
                    />
                )}
            />
        </>
    );
};

Tags.propTypes = {
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    setTags: PropTypes.func.isRequired,
    popularTags: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Tags;
