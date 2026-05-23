import { useState, useCallback } from 'react';

export const useLevelManager = () => {
    const [level, setLevel] = useState(1);
    const [difficulty, setDifficulty] = useState('easy');

    const nextLevel = useCallback(() => {
        setLevel((prev) => prev + 1);
    }, []);

    const resetLevel = useCallback(() => {
        setLevel(1);
        setDifficulty('easy');
    }, []);

    return { level, difficulty, nextLevel, resetLevel };
};