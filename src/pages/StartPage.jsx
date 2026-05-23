import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Settings as SettingsIcon } from 'lucide-react';
import { Button, Card, Title, SettingsModal } from '../components';
import { useStore } from '../store';

const StartPage = () => {
    const navigate = useNavigate();
    const [showSettings, setShowSettings] = useState(false);

    const settings = useStore((state) => state.settings);
    const loadSettings = useStore((state) => state.loadSettings);

    useEffect(() => {
        loadSettings();
    }, [loadSettings]);

    const handleStartGame = () => {
        navigate('/game');
    };

    const difficultyLabels = {
        easy: 'Легка',
        medium: 'Середня',
        hard: 'Складна'
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
            <Card className="max-w-md w-full text-center">
                <div className="mb-6">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mx-auto flex items-center justify-center mb-4 shadow-xl">
                        <span className="text-5xl">🎮</span>
                    </div>
                    <Title>Maze Runner</Title>
                    {settings.playerName && (
                        <p className="text-blue-600 font-semibold mb-2">
                            Привіт, {settings.playerName}! 👋
                        </p>
                    )}
                    <p className="text-gray-600 text-lg">
                        Знайди вихід з лабіринту!
                    </p>
                </div>

                <div className="space-y-4">
                    <div className="bg-gray-50 rounded-lg p-4 text-left">
                        <h3 className="font-semibold text-gray-800 mb-2">Правила гри:</h3>
                        <ul className="text-gray-600 space-y-1 text-sm">
                            <li>• Дійди від старту (зелений) до виходу (жовтий)</li>
                            <li>• Уникай стін (чорні клітинки)</li>
                            <li>• Намагайся пройти якомога швидше</li>
                        </ul>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-3 text-sm">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-700">Складність:</span>
                            <span className="font-semibold text-blue-700">
                {difficultyLabels[settings.difficulty]}
              </span>
                        </div>
                        <div className="flex justify-between items-center mt-1">
                            <span className="text-gray-700">Розмір:</span>
                            <span className="font-semibold text-blue-700">
                {settings.mazeSize}x{settings.mazeSize}
              </span>
                        </div>
                    </div>

                    <Button onClick={handleStartGame} variant="primary" className="w-full text-lg">
                        <Play size={24} />
                        Почати гру
                    </Button>

                    <Button onClick={() => setShowSettings(true)} variant="secondary" className="w-full">
                        <SettingsIcon size={20} />
                        Налаштування
                    </Button>
                </div>
            </Card>

            <SettingsModal
                isOpen={showSettings}
                onClose={() => setShowSettings(false)}
                onSave={() => {}}
            />
        </div>
    );
};

export default StartPage;