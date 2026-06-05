import { create } from 'zustand';

export const useStore = create((set, get) => ({
    settings: {
        difficulty: 'medium',
        mazeSize: 10,
        soundEnabled: true,
        playerName: ''
    },

    loadSettings: () => {
        try {
            const saved = localStorage.getItem('mazeRunnerSettings');
            if (saved) {
                set({ settings: JSON.parse(saved) });
            }
        } catch (error) {
            console.error('Error loading settings:', error);
        }
    },

    updateSettings: (newSettings) => {
        set((state) => {
            const updatedSettings = { ...state.settings, ...newSettings };
            localStorage.setItem('mazeRunnerSettings', JSON.stringify(updatedSettings));
            return { settings: updatedSettings };
        });
    },

    resetSettings: () => {
        const defaultSettings = {
            difficulty: 'medium',
            mazeSize: 10,
            soundEnabled: true,
            playerName: ''
        };
        set({ settings: defaultSettings });
        localStorage.setItem('mazeRunnerSettings', JSON.stringify(defaultSettings));
    },

    game: {
        isActive: false,
        isPaused: false,
        level: 1,
        score: 0,
        time: 0,
        steps: 0,
        gameId: null
    },

    startGame: () => {
        set((state) => ({
            game: {
                isActive: true,
                isPaused: false,
                level: state.game.level,
                score: 0,
                time: 0,
                steps: 0,
                gameId: Date.now().toString()
            }
        }));
    },

    endGame: () => {
        set((state) => ({
            game: { ...state.game, isActive: false }
        }));
    },

    nextLevel: () => {
        set((state) => ({
            game: {
                ...state.game,
                level: state.game.level + 1,
                steps: 0,
                time: 0
            }
        }));
    },

    resetGame: () => {
        set({
            game: {
                isActive: false,
                isPaused: false,
                level: 1,
                score: 0,
                time: 0,
                steps: 0,
                gameId: null
            }
        });
    },

    leaderboard: [],

    loadLeaderboard: () => {
        try {
            const saved = localStorage.getItem('gameHistory');
            if (!saved) {
                set({ leaderboard: [] });
                return;
            }

            const history = JSON.parse(saved);
            const playersMap = new Map();

            history.forEach((game) => {
                const playerName = game.playerName || 'Гість';

                if (playersMap.has(playerName)) {
                    const player = playersMap.get(playerName);
                    player.gamesPlayed++;
                    player.totalSteps += game.steps;
                    player.totalTime += game.time;

                    if (game.time < player.bestTime) {
                        player.bestTime = game.time;
                        player.bestSteps = game.steps;
                    }

                    if (game.level > player.bestLevel) {
                        player.bestLevel = game.level;
                    }
                } else {
                    playersMap.set(playerName, {
                        name: playerName,
                        bestTime: game.time,
                        bestSteps: game.steps,
                        bestLevel: game.level,
                        gamesPlayed: 1,
                        totalSteps: game.steps,
                        totalTime: game.time
                    });
                }
            });

            const players = Array.from(playersMap.values()).map(player => ({
                ...player,
                avgSteps: Math.round(player.totalSteps / player.gamesPlayed),
                avgTime: Math.round(player.totalTime / player.gamesPlayed)
            }));

            const sortedPlayers = players.sort((a, b) => a.bestTime - b.bestTime).slice(0, 10);
            set({ leaderboard: sortedPlayers });
        } catch (error) {
            console.error('Error loading leaderboard:', error);
            set({ leaderboard: [] });
        }
    },

    addGameResult: (result) => {
        try {
            const state = get();
            const saved = localStorage.getItem('gameHistory');
            const history = saved ? JSON.parse(saved) : [];

            const gameResult = {
                ...result,
                playerName: state.settings.playerName || 'Гість',
                date: new Date().toISOString(),
                gameId: state.game.gameId
            };

            history.push(gameResult);
            localStorage.setItem('gameHistory', JSON.stringify(history));

            get().loadLeaderboard();
        } catch (error) {
            console.error('Error adding game result:', error);
        }
    },

    clearLeaderboard: () => {
        localStorage.removeItem('gameHistory');
        set({ leaderboard: [] });
    },

    getPlayerRank: (playerName) => {
        const state = get();
        const index = state.leaderboard.findIndex(p => p.name === playerName);
        return index !== -1 ? index + 1 : null;
    },

    player: {
        name: '',
        userId: '',
        stats: {
            gamesPlayed: 0,
            bestTime: null,
            avgSteps: 0,
            bestLevel: 0,
            totalPlayTime: 0
        },
        achievements: [],
        history: []
    },

    loadPlayer: () => {
        try {
            const state = get();
            const playerName = state.settings.playerName || 'Гість';
            const userId = playerName.toLowerCase().replace(/\s+/g, '-');

            const saved = localStorage.getItem('gameHistory');
            const history = saved ? JSON.parse(saved) : [];

            const playerGames = history.filter(g =>
                (g.playerName || 'Гість') === playerName
            );

            let stats;
            if (playerGames.length === 0) {
                stats = {
                    gamesPlayed: 0,
                    bestTime: null,
                    avgSteps: 0,
                    bestLevel: 0,
                    totalPlayTime: 0
                };
            } else {
                const bestTime = Math.min(...playerGames.map(g => g.time));
                const avgSteps = Math.round(
                    playerGames.reduce((acc, g) => acc + g.steps, 0) / playerGames.length
                );
                const bestLevel = Math.max(...playerGames.map(g => g.level));
                const totalPlayTime = playerGames.reduce((acc, g) => acc + g.time, 0);

                stats = {
                    gamesPlayed: playerGames.length,
                    bestTime,
                    avgSteps,
                    bestLevel,
                    totalPlayTime
                };
            }

            const achievements = [];
            if (stats.gamesPlayed >= 1) {
                achievements.push({ id: 'first_game', name: 'Перша гра', icon: '🎮' });
            }
            if (stats.gamesPlayed >= 10) {
                achievements.push({ id: 'veteran', name: 'Ветеран', icon: '🏆' });
            }
            if (stats.bestLevel >= 5) {
                achievements.push({ id: 'level_5', name: 'Рівень 5', icon: '⭐' });
            }
            if (stats.bestTime && stats.bestTime < 60) {
                achievements.push({ id: 'speedrunner', name: 'Спідранер', icon: '⚡' });
            }

            set({
                player: {
                    name: playerName,
                    userId,
                    stats,
                    achievements,
                    history: playerGames
                }
            });
        } catch (error) {
            console.error('Error loading player:', error);
        }
    }
}));