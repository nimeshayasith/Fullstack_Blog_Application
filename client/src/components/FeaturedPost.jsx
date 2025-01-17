import React from 'react';

const FeaturedPost = ({ title, content, author }) => {
    return (
        <div className="featured-post">
            <h2>{title}</h2>
            <p>{content}</p>
            <p><strong>Author:</strong> {author}</p>
        </div>
    );
};

export default FeaturedPost;