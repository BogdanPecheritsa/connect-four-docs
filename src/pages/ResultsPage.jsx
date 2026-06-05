import React from 'react';
import { Trophy, Play, Home } from 'lucide-react';
import { Button, Card, Title } from '../components';

const ResultsPage = ({
                         onPlayAgain,
                         onBackToStart,
                         time,
                         steps,
                         level,
                         efficiency,
                         bestTime
                     }) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-green-500 via-teal-500 to-blue-500 flex items-center justify-center p-4">
            <Card className="max-w-lg w-full text-center">
                <div className="mb-6">
                    <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mx-auto flex items-center justify-center mb-4 shadow-xl">
                        <Trophy size={48} className="text-white" />
                    </div>
                    <Title>Вітаємо!</Title>
                    <p className="text-gray-600 text-lg">
                        Ви успішно пройшли лабіринт!
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                    <Card className="bg-gradient-to-br from-blue-50 to-blue-100 shadow-none">
                        <div className="text-3xl font-bold text-blue-700">{time}</div>
                        <div className="text-sm text-gray-700">Ваш час</div>
                    </Card>
                    <Card className="bg-gradient-to-br from-purple-50 to-purple-100 shadow-none">
                        <div className="text-3xl font-bold text-purple-700">{steps}</div>
                        <div className="text-sm text-gray-700">Кроків</div>
                    </Card>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <h3 className="font-semibold text-gray-800 mb-3">Статистика</h3>
                    <div className="space-y-2 text-sm text-left">
                        <div className="flex justify-between">
                            <span className="text-gray-600">Рівень:</span>
                            <span className="font-semibold text-gray-800">{level}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Ефективність:</span>
                            <span className="font-semibold text-gray-800">{efficiency}%</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Кращий результат:</span>
                            <span className="font-semibold text-gray-800">
                {bestTime !== null ? bestTime : time}
              </span>
                        </div>
                    </div>
                </div>

                <div className="space-y-3">
                    <Button onClick={onPlayAgain} variant="success" className="w-full">
                        <Play size={20} />
                        Грати знову
                    </Button>
                    <Button onClick={onBackToStart} variant="secondary" className="w-full">
                        <Home size={20} />
                        Головне меню
                    </Button>
                </div>
            </Card>
        </div>
    );
};

export default ResultsPage;