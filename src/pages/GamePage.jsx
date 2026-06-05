import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Home } from 'lucide-react';
import { Button, Title, MazeGrid, ControlPanel, GameStats, Card } from '../components';

const GamePage = ({
                      maze,
                      playerPosition,
                      onMove,
                      time,
                      steps,
                      level,
                      onNewMaze
                  }) => {
    const navigate = useNavigate();
    const { gameId } = useParams();

    const handleBackToMenu = () => {
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 p-4">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <Title size="medium">
            <span className="text-white">
              Лабіринт {gameId ? `#${gameId}` : ''}
            </span>
                    </Title>
                    <div className="flex gap-2">
                        <Button onClick={onNewMaze} variant="success">
                            Новий лабіринт
                        </Button>
                        <Button onClick={handleBackToMenu} variant="secondary">
                            <Home size={20} />
                            Меню
                        </Button>
                    </div>
                </div>

                <GameStats time={time} steps={steps} level={level} />

                <div className="mt-6 flex flex-col lg:flex-row gap-6">
                    <div className="flex-1">
                        <MazeGrid maze={maze} playerPosition={playerPosition} />
                    </div>

                    <div className="lg:w-64 space-y-4">
                        <Card>
                            <h3 className="font-semibold text-gray-800 mb-4 text-center">Керування</h3>
                            <ControlPanel onMove={onMove} />
                            <div className="mt-4 text-center text-sm text-gray-600">
                                або стрілки на клавіатурі
                            </div>
                        </Card>

                        <Card className="text-center">
                            <div className="text-sm text-gray-600 mb-2">Легенда:</div>
                            <div className="space-y-2 text-xs">
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 bg-blue-500 rounded"></div>
                                    <span className="text-gray-700">Ви</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 bg-green-500 rounded"></div>
                                    <span className="text-gray-700">Старт</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                                    <span className="text-gray-700">Вихід</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 bg-gray-900 rounded"></div>
                                    <span className="text-gray-700">Стіна</span>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GamePage;