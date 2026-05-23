import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Trophy, User } from 'lucide-react';
import { useStore } from '../../store';

const Header = () => {
    const location = useLocation();
    const settings = useStore((state) => state.settings);

    const userId = settings.playerName
        ? settings.playerName.toLowerCase().replace(/\s+/g, '-')
        : 'guest';

    const isActive = (path) => location.pathname === path;

    if (location.pathname.includes('/game')) {
        return null;
    }

    return (
        <header className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 py-4">
                <div className="flex justify-between items-center">
                    <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-indigo-600 hover:text-indigo-700 transition-colors">
                        <Home size={28} />
                        <span>Maze Runner</span>
                    </Link>

                    <nav className="flex items-center gap-4">
                        <Link
                            to="/leaderboard"
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                                isActive('/leaderboard')
                                    ? 'bg-indigo-600 text-white shadow-lg'
                                    : 'text-gray-700 hover:bg-gray-100'
                            }`}
                        >
                            <Trophy size={20} />
                            <span className="hidden sm:inline">Лідери</span>
                        </Link>

                        {settings.playerName && (
                            <Link
                                to={`/profile/${userId}`}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                                    isActive(`/profile/${userId}`)
                                        ? 'bg-indigo-600 text-white shadow-lg'
                                        : 'text-gray-700 hover:bg-gray-100'
                                }`}
                            >
                                <User size={20} />
                                <span className="hidden sm:inline">{settings.playerName}</span>
                            </Link>
                        )}
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;