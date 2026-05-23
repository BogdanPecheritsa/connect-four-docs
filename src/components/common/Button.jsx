import React from 'react';
import styles from '../../styles/Button.module.css';

const Button = ({ children, onClick, variant = 'primary', className = '', disabled = false, type = 'button' }) => {
    const variantClass = styles[variant] || styles.primary;

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${styles.button} ${variantClass} ${className}`}
        >
            {children}
        </button>
    );
};

export default Button;