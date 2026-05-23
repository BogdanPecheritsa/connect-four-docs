import { useState, useCallback, useRef } from 'react';

export const usePlayer = (maze, onWin) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [steps, setSteps] = useState(0);
    const isMovingRef = useRef(false);

    const resetPlayer = useCallback(() => {
        setPosition({ x: 0, y: 0 });
        setSteps(0);
    }, []);

    const move = useCallback((direction) => {
        if (!maze || maze.length === 0 || isMovingRef.current) return;

        isMovingRef.current = true;

        let newX = position.x;
        let newY = position.y;

        switch (direction) {
            case 'UP':
                newY = Math.max(0, position.y - 1);
                break;
            case 'DOWN':
                newY = Math.min(maze.length - 1, position.y + 1);
                break;
            case 'LEFT':
                newX = Math.max(0, position.x - 1);
                break;
            case 'RIGHT':
                newX = Math.min(maze[0].length - 1, position.x + 1);
                break;
            default:
                isMovingRef.current = false;
                return;
        }

        if (maze[newY] && maze[newY][newX] && maze[newY][newX].type === 'wall') {
            isMovingRef.current = false;
            return;
        }

        if (newX === position.x && newY === position.y) {
            isMovingRef.current = false;
            return;
        }

        setPosition({ x: newX, y: newY });
        setSteps((s) => s + 1);

        if (maze[newY] && maze[newY][newX] && maze[newY][newX].type === 'finish') {
            setTimeout(() => onWin(), 100);
        }

        setTimeout(() => {
            isMovingRef.current = false;
        }, 50);

    }, [maze, position, onWin]);

    return { position, steps, move, resetPlayer };
};