import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trophy, Medal, ArrowLeft, User, RefreshCw, Trash2 } from 'lucide-react';
import { Card, Button } from '../components';
import { useStore } from '../store';

const LeaderboardPage = () => {
    const navigate = useNavigate();
    const [showConfirm, setShowConfirm] = useState(false);

    const leaderboard = useStore((state) => state.leaderboard);
    const settings = useStore((state) => state.settings);
    const loadLeaderboard = useStore((state) => state.loadLeaderboard);
    const clearLeaderboard = useStore((state) => state.clearLeaderboard);
    const getPlayerRank = useStore((state) => state.getPlayerRank);

    useEffect(() => {
        loadLeaderboard();
    }, [loadLeaderboard]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const getMedalIcon = (position) => {
        if (position === 0) return <Medal className="text-yellow-500" size={28} />;
        if (position === 1) return <Medal className="text-gray-400" size={28} />;
        if (position === 2) return <Medal className="text-orange-600" size={28} />;
        return <span className="text-gray-500 font-bold text-xl">{position + 1}</span>;
    };

    const handleClearLeaderboard = () => {
        clearLeaderboard();
        setShowConfirm(false);
    };

    const currentPlayerRank = settings.playerName
        ? getPlayerRank(settings.playerName)
        : null;

    return (
        <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="flex gap-2 mb-6">
                    <Button
                        onClick={() => navigate('/')}
                        variant="secondary"
                    >
                        <ArrowLeft size={20} />
                        Назад
                    </Button>

                    <Button
                        onClick={loadLeaderboard}
                        variant="primary"
                    >
                        <RefreshCw size={20} />
                        Оновити
                    </Button>

                    {leaderboard.length > 0 && (
                        <Button
                            onClick={() => setShowConfirm(true)}
                            variant="danger"
                        >
                            <Trash2 size={20} />
                            Очистити
                        </Button>
                    )}
                </div>

                <Card gradient className="mb-6 text-center">
                    <Trophy size={48} className="mx-auto mb-4 text-yellow-300" />
                    <h1 className="text-4xl font-bold text-white mb-2">Таблиця лідерів</h1>
                    <p className="text-yellow-100 mb-4">Топ-10 найкращих гравців</p>

                    {currentPlayerRank && (
                        <div className="bg-white bg-opacity-20 rounded-lg px-4 py-2 inline-block">
                            <p className="text-white font-semibold">
                                Ваша позиція: <span className="text-yellow-300">#{currentPlayerRank}</span>
                            </p>
                        </div>
                    )}
                </Card>

                <Card>
                    {leaderboard.length === 0 ? (
                        <div className="text-center py-12">
                            <Trophy size={64} className="mx-auto mb-4 text-gray-300" />
                            <p className="text-gray-500 text-xl font-semibold mb-2">Поки що немає результатів</p>
                            <p className="text-gray-400 text-sm">Зіграйте свою першу гру!</p>
                            <Button
                                onClick={() => navigate('/')}
                                variant="primary"
                                className="mt-6"
                            >
                                Почати гру
                            </Button>
                        </div>
                    ) : (
                        <>
                            <div className="mb-4 text-sm text-gray-600 flex justify-between items-center">
                                <span>Всього гравців: <strong>{leaderboard.length}</strong></span>
                                <span>Оновлено: <strong>{new Date().toLocaleTimeString('uk-UA')}</strong></span>
                            </div>

                            <div className="space-y-3">
                                {leaderboard.map((player, index) => {
                                    const userId = player.name.toLowerCase().replace(/\s+/g, '-');
                                    const isCurrentPlayer = player.name === settings.playerName;

                                    return (
                                        <Link
                                            key={index}
                                            to={`/profile/${userId}`}
                                            className={`flex items-center gap-4 p-4 rounded-lg hover:shadow-xl transition-all border-2 ${
                                                isCurrentPlayer
                                                    ? 'bg-gradient-to-r from-blue-50 to-purple-50 border-purple-300'
                                                    : 'bg-gradient-to-r from-gray-50 to-white border-transparent hover:border-purple-200'
                                            }`}
                                        >
                                            <div className="w-14 h-14 flex items-center justify-center flex-shrink-0">
                                                {getMedalIcon(index)}
                                            </div>

                                            <div className={`w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 ${
                                                isCurrentPlayer ? 'bg-purple-200' : 'bg-purple-100'
                                            }`}>
                                                <User className={isCurrentPlayer ? 'text-purple-700' : 'text-purple-600'} size={28} />
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h3 className="font-bold text-gray-800 text-lg truncate">
                                                        {player.name}
                                                    </h3>
                                                    {isCurrentPlayer && (
                                                        <span className="text-xs bg-purple-500 text-white px-2 py-1 rounded-full">
                              Ви
                            </span>
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-4 text-sm text-gray-600">
                                                    <span>🎮 {player.gamesPlayed} {player.gamesPlayed === 1 ? 'гра' : 'ігор'}</span>
                                                    <span>📊 Рівень {player.bestLevel}</span>
                                                </div>
                                            </div>

                                            <div className="text-right flex-shrink-0">
                                                <div className="font-bold text-3xl text-purple-600">
                                                    {formatTime(player.bestTime)}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {player.bestSteps} кроків
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        </>
                    )}
                </Card>

                {showConfirm && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <Card className="max-w-md">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Підтвердження</h3>
                            <p className="text-gray-600 mb-6">
                                Ви впевнені, що хочете очистити таблицю лідерів?
                            </p>
                            <div className="flex gap-3">
                                <Button
                                    onClick={handleClearLeaderboard}
                                    variant="danger"
                                    className="flex-1"
                                >
                                    Так, очистити
                                </Button>
                                <Button
                                    onClick={() => setShowConfirm(false)}
                                    variant="secondary"
                                    className="flex-1"
                                >
                                    Скасувати
                                </Button>
                            </div>
                        </Card>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LeaderboardPage;