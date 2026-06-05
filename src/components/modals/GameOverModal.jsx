import React from 'react';
import { Trophy, Play, Home, RotateCcw } from 'lucide-react';
import Portal from '../common/Portal';
import Button from '../common/Button';
import Card from '../common/Card';

const GameOverModal = ({
                           isOpen,
                           onClose,
                           onPlayAgain,
                           onNextLevel,
                           onBackToMenu,
                           time,
                           steps,
                           level,
                           efficiency
                       }) => {
    if (!isOpen) return null;

    return (
        <Portal>
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <Card className="max-w-md w-full text-center animate-fadeIn">
                    <div className="mb-6">
                        <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mx-auto flex items-center justify-center mb-4 shadow-xl">
                            <Trophy size={40} className="text-white" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">Рівень пройдено!</h2>
                        <p className="text-gray-600">Чудова робота! 🎉</p>
                    </div>

                    <div className="grid grid-cols-3 gap-3 mb-6">
                        <div className="bg-blue-50 rounded-lg p-3">
                            <div className="text-2xl font-bold text-blue-700">{time}</div>
                            <div className="text-xs text-gray-600">Час</div>
                        </div>
                        <div className="bg-purple-50 rounded-lg p-3">
                            <div className="text-2xl font-bold text-purple-700">{steps}</div>
                            <div className="text-xs text-gray-600">Кроки</div>
                        </div>
                        <div className="bg-green-50 rounded-lg p-3">
                            <div className="text-2xl font-bold text-green-700">{efficiency}%</div>
                            <div className="text-xs text-gray-600">Точність</div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Button onClick={onNextLevel} variant="success" className="w-full">
                            <Play size={20} />
                            Наступний рівень
                        </Button>
                        <Button onClick={onPlayAgain} variant="primary" className="w-full">
                            <RotateCcw size={20} />
                            Повторити рівень
                        </Button>
                        <Button onClick={onBackToMenu} variant="secondary" className="w-full">
                            <Home size={20} />
                            Головне меню
                        </Button>
                    </div>
                </Card>
            </div>
        </Portal>
    );
};

export default GameOverModal;