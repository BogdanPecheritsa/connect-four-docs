import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GamePage from '../../pages/GamePage';
import { GameOverModal } from '../index';
import {
    useTimer,
    useMazeGenerator,
    usePlayer,
    useKeyboardControls,
    useGameStats
} from '../../hooks';
import { useStore } from '../../store';

const GameContainer = () => {
    const navigate = useNavigate();
    const [showGameOverModal, setShowGameOverModal] = useState(false);
    const hasStarted = useRef(false);

    const settings = useStore((state) => state.settings);
    const game = useStore((state) => state.game);
    const startGame = useStore((state) => state.startGame);
    const endGame = useStore((state) => state.endGame);
    const nextLevel = useStore((state) => state.nextLevel);
    const addGameResult = useStore((state) => state.addGameResult);

    const { maze, generateMaze } = useMazeGenerator(settings.mazeSize, settings.difficulty);
    const { time, resetTimer, formatTime } = useTimer(game.isActive);
    const { calculateEfficiency } = useGameStats();

    const handleWin = useCallback(() => {
        endGame();
        const currentSteps = playerRef.current.steps;

        addGameResult({
            time: time,
            steps: currentSteps,
            level: game.level,
            efficiency: calculateEfficiency(currentSteps)
        });

        setShowGameOverModal(true);
    }, [time, game.level, calculateEfficiency, endGame, addGameResult]);

    const { position: playerPosition, steps, move, resetPlayer } = usePlayer(maze, handleWin);

    const playerRef = useRef({ steps: 0 });
    playerRef.current.steps = steps;

    useKeyboardControls(move, game.isActive);

    useEffect(() => {
        if (!hasStarted.current) {
            startGame();
            hasStarted.current = true;
        }
    }, [startGame]);

    const handlePlayAgain = useCallback(() => {
        setShowGameOverModal(false);
        startGame();
        resetTimer();
        resetPlayer();
        generateMaze();
    }, [startGame, resetTimer, resetPlayer, generateMaze]);

    const handleNextLevel = useCallback(() => {
        nextLevel();
        setShowGameOverModal(false);
        startGame();
        resetTimer();
        resetPlayer();
        generateMaze();
    }, [nextLevel, startGame, resetTimer, resetPlayer, generateMaze]);

    const handleBackToMenu = useCallback(() => {
        navigate('/');
    }, [navigate]);

    const handleNewMaze = useCallback(() => {
        generateMaze();
        resetPlayer();
        resetTimer();
    }, [generateMaze, resetPlayer, resetTimer]);

    return (
        <>
            <GamePage
                maze={maze}
                playerPosition={playerPosition}
                onMove={move}
                time={formatTime(time)}
                steps={steps}
                level={game.level}
                onNewMaze={handleNewMaze}
            />

            <GameOverModal
                isOpen={showGameOverModal}
                onClose={() => setShowGameOverModal(false)}
                onPlayAgain={handlePlayAgain}
                onNextLevel={handleNextLevel}
                onBackToMenu={handleBackToMenu}
                time={formatTime(time)}
                steps={steps}
                level={game.level}
                efficiency={calculateEfficiency(steps)}
            />
        </>
    );
};

export default GameContainer;