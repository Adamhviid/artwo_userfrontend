import React from "react";
import CombinedForm from "../../components/CombinedForm";

const MyComponent = () => {
    const handleFormSubmit = (formData) => {
        // Handle post form submission here
        // formData will contain title, content, and tags
    };

    return (
        <CombinedForm
            showPostForm={true}
            onPostSubmit={handleFormSubmit}
            postTitleLabel="Titel"
            postContentLabel="Dit opslag"
            postTagsLabel="Tags"
            postTitlePlaceholder="F.eks: Problemer med min bil, hvorfor er der så mange der ikke kan køre bil?"
            postContentPlaceholder="F.eks Jeg har problemer med min bil, den vil ikke starte, hvad kan jeg gøre? Jeg har prøvet alt! Hjælp mig! :( #RAWR"
            postTagsPlaceholder="F.eks: Fest, Venner, Sport, NSFW"
        />
    );
};

export default MyComponent;
