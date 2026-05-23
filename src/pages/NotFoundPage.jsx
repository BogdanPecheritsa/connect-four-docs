import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, AlertCircle } from 'lucide-react';
import { Card, Button } from '../components';

const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-500 via-pink-500 to-purple-500 flex items-center justify-center p-4">
            <Card className="max-w-md w-full text-center">
                <AlertCircle size={64} className="mx-auto mb-4 text-red-500" />
                <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
                <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                    Сторінка не знайдена
                </h2>
                <p className="text-gray-600 mb-6">
                    На жаль, сторінка, яку ви шукаєте, не існує або була переміщена.
                </p>
                <Button onClick={() => navigate('/')} variant="primary" className="w-full">
                    <Home size={20} />
                    Повернутися на головну
                </Button>
            </Card>
        </div>
    );
};

export default NotFoundPage;