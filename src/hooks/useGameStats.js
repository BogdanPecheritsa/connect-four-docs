import { useState, useCallback } from 'react';

export const useGameStats = () => {
    const [stats, setStats] = useState({
        bestTime: null,
        gamesPlayed: 0,
        totalSteps: 0
    });

    const updateStats = useCallback((time, steps) => {
        setStats((prev) => ({
            bestTime: prev.bestTime === null ? time : Math.min(prev.bestTime, time),
            gamesPlayed: prev.gamesPlayed + 1,
            totalSteps: prev.totalSteps + steps
        }));
    }, []);

    const calculateEfficiency = useCallback((steps) => {
        const optimalSteps = 18; // Мінімум для 10x10
        return Math.max(0, Math.min(100, Math.round((optimalSteps / steps) * 100)));
    }, []);

    return { stats, updateStats, calculateEfficiency };
};