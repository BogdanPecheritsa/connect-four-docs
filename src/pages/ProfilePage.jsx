import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { User, Trophy, Clock, TrendingUp, ArrowLeft, Star } from 'lucide-react';
import { Card, Button } from '../components';
import { useStore } from '../store';

const ProfilePage = () => {
    const { userId } = useParams();
    const navigate = useNavigate();

    const player = useStore((state) => state.player);
    const settings = useStore((state) => state.settings);
    const loadPlayer = useStore((state) => state.loadPlayer);

    useEffect(() => {
        loadPlayer();
    }, [loadPlayer, userId]);

    const currentUserId = settings.playerName
        ? settings.playerName.toLowerCase().replace(/\s+/g, '-')
        : 'guest';

    const isOwnProfile = userId === currentUserId;

    const formatTime = (seconds) => {
        if (!seconds) return '-';
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const formatTotalTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        if (hours > 0) {
            return `${hours}г ${mins}хв`;
        }
        return `${mins}хв`;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                <Button
                    onClick={() => navigate('/')}
                    variant="secondary"
                    className="mb-6"
                >
                    <ArrowLeft size={20} />
                    Назад
                </Button>

                <Card gradient title={`Профіль: ${userId}`} className="mb-6">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                            <User size={40} className="text-purple-600" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-white capitalize">
                                {player.name || userId.replace(/-/g, ' ')}
                            </h2>
                            <p className="text-purple-100">
                                {isOwnProfile ? 'Це ваш профіль' : 'Профіль гравця'}
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
                            <Trophy className="mx-auto mb-2 text-yellow-300" size={32} />
                            <div className="text-2xl font-bold text-white">{player.stats.gamesPlayed}</div>
                            <div className="text-sm text-purple-100">Ігор зіграно</div>
                        </div>

                        <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
                            <Clock className="mx-auto mb-2 text-blue-300" size={32} />
                            <div className="text-2xl font-bold text-white">
                                {formatTime(player.stats.bestTime)}
                            </div>
                            <div className="text-sm text-purple-100">Кращий час</div>
                        </div>

                        <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
                            <TrendingUp className="mx-auto mb-2 text-green-300" size={32} />
                            <div className="text-2xl font-bold text-white">{player.stats.avgSteps}</div>
                            <div className="text-sm text-purple-100">Середні кроки</div>
                        </div>

                        <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
                            <Star className="mx-auto mb-2 text-orange-300" size={32} />
                            <div className="text-2xl font-bold text-white">{player.stats.bestLevel}</div>
                            <div className="text-sm text-purple-100">Найвищий рівень</div>
                        </div>
                    </div>

                    {player.stats.totalPlayTime > 0 && (
                        <div className="mt-4 bg-white bg-opacity-20 rounded-lg p-3 text-center">
                            <p className="text-purple-100 text-sm">
                                Загальний час гри: <span className="font-bold text-white">
                  {formatTotalTime(player.stats.totalPlayTime)}
                </span>
                            </p>
                        </div>
                    )}
                </Card>

                {isOwnProfile && player.achievements.length > 0 && (
                    <Card title="Досягнення" className="mb-6">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {player.achievements.map((achievement) => (
                                <div
                                    key={achievement.id}
                                    className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4 text-center border-2 border-purple-200"
                                >
                                    <div className="text-4xl mb-2">{achievement.icon}</div>
                                    <div className="text-sm font-semibold text-gray-800">{achievement.name}</div>
                                </div>
                            ))}
                        </div>
                    </Card>
                )}

                {isOwnProfile && player.history.length > 0 && (
                    <Card title="Історія ігор">
                        <div className="space-y-3">
                            {player.history.slice(-10).reverse().map((game, index) => (
                                <div
                                    key={index}
                                    className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                                            <Trophy className="text-purple-600" size={20} />
                                        </div>
                                        <div>
                                            <div className="font-semibold text-gray-800">
                                                Рівень {game.level}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {new Date(game.date).toLocaleDateString('uk-UA')}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-semibold text-gray-800">
                                            {formatTime(game.time)}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            {game.steps} кроків
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                )}

                {!isOwnProfile && (
                    <Card>
                        <p className="text-gray-600 text-center">
                            Детальна статистика доступна тільки власнику профілю
                        </p>
                    </Card>
                )}
            </div>
        </div>
    );
};

export default ProfilePage;