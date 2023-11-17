export default function processPost(post, state, followers) {
    const likes = post.likes;
    const comments = post.comments;
    const tags = post.tags;

    let totalLikes = 0;
    post.userLiked = false;

    let totalFollowers = 0;
    post.userFollowed = false;

    post.comments = [];
    post.tags = [];

    likes.forEach((like) => {
        totalLikes++;

        if (
            state.isAuthenticated &&
            like.userId == state.user.id
        ) {
            post.userLiked = true;
        }
    });
    post.totalLikes = totalLikes++;

    followers.forEach((follower) => {
        if (follower.followId == post.userId) {
            totalFollowers++;

            if (
                state.isAuthenticated &&
                follower.userId == state.user.id
            ) {
                post.userFollowed = true;
            }
        }
    });
    post.totalFollowers = totalFollowers++;

    comments.forEach((comment) => {
        post.comments.push(comment);
    });

    tags.forEach((tag) => {
        post.tags.push(tag.tag);
    });

    return post;
}