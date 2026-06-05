import React from 'react';

const Title = ({ children, size = 'large' }) => {
    const sizes = {
        large: 'text-5xl',
        medium: 'text-3xl',
        small: 'text-2xl'
    };

    return (
        <h1 className={`${sizes[size]} font-bold text-gray-800 mb-6`}>
            {children}
        </h1>
    );
};

export default Title;