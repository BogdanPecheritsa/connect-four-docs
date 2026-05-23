import React from 'react';

export default function Button({ variant = 'primary', disabled = false, children }) {
    const baseStyle = "px-4 py-2 rounded font-bold text-sm transition-colors";
    const styles = variant === 'primary' 
        ? `${baseStyle} bg-blue-600 text-white hover:bg-blue-500` 
        : `${baseStyle} bg-slate-700 text-slate-200 hover:bg-slate-600`;
    return (
        <button className={styles} disabled={disabled}>
            {children}
        </button>
    );
}