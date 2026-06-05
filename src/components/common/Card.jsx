import React from 'react';
import styles from '../../styles/Card.module.css';

const Card = ({ children, className = '', gradient = false, title, headerContent }) => {
    return (
        <div className={`${styles.card} ${gradient ? styles.cardGradient : ''} ${className}`}>
            {(title || headerContent) && (
                <div className={styles.cardHeader}>
                    {title && <h3 className={styles.cardTitle}>{title}</h3>}
                    {headerContent}
                </div>
            )}
            <div className={styles.cardContent}>
                {children}
            </div>
        </div>
    );
};

export default Card;