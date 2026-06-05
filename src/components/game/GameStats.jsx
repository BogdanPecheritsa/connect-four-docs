import React from 'react';
import Card from '../common/Card';

const GameStats = ({ time, steps, level }) => {
    return (
        <div className="grid grid-cols-3 gap-4">
            <Card className="text-center p-4">
                <div className="text-3xl font-bold text-blue-600">{time}</div>
                <div className="text-sm text-gray-600">Час</div>
            </Card>
            <Card className="text-center p-4">
                <div className="text-3xl font-bold text-purple-600">{steps}</div>
                <div className="text-sm text-gray-600">Кроки</div>
            </Card>
            <Card className="text-center p-4">
                <div className="text-3xl font-bold text-green-600">{level}</div>
                <div className="text-sm text-gray-600">Рівень</div>
            </Card>
        </div>
    );
};

export default GameStats;