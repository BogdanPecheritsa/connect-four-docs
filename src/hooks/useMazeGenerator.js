import { useState, useCallback, useEffect } from 'react';

export const useMazeGenerator = (size = 10, difficulty = 'medium') => {
    const [maze, setMaze] = useState([]);

    const generateMaze = useCallback(() => {
        const wallProbability = {
            easy: 0.2,
            medium: 0.3,
            hard: 0.4
        }[difficulty] || 0.3;

        const newMaze = Array(size).fill(null).map(() =>
            Array(size).fill(null).map(() => ({
                type: Math.random() > wallProbability ? 'path' : 'wall',
                visited: false
            }))
        );

        newMaze[0][0] = { type: 'start', visited: false };
        newMaze[size - 1][size - 1] = { type: 'finish', visited: false };

        for (let i = 0; i < size - 1; i++) {
            newMaze[0][i] = { type: 'path', visited: false };
            newMaze[i][0] = { type: 'path', visited: false };
        }

        setMaze(newMaze);
    }, [size, difficulty]);

    useEffect(() => {
        generateMaze();
    }, [generateMaze]);

    return { maze, generateMaze };
};