import React from 'react';

const MazeGrid = ({ maze, playerPosition }) => {
    if (!maze || maze.length === 0 || !maze[0]) {
        return (
            <div className="bg-gray-800 rounded-lg p-4 shadow-inner flex items-center justify-center h-96">
                <div className="text-white text-lg">Завантаження лабіринту...</div>
            </div>
        );
    }

    const getCellColor = (cell, x, y) => {
        if (playerPosition.x === x && playerPosition.y === y) {
            return 'bg-blue-500 shadow-lg shadow-blue-500/50';
        }
        switch (cell.type) {
            case 'start':
                return 'bg-green-500';
            case 'finish':
                return 'bg-yellow-500';
            case 'wall':
                return 'bg-gray-900';
            case 'path':
                return 'bg-gray-700';
            default:
                return 'bg-gray-700';
        }
    };

    return (
        <div className="bg-gray-800 rounded-lg p-4 shadow-inner">
            <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${maze[0]?.length || 10}, minmax(0, 1fr))` }}>
                {maze.map((row, y) =>
                    row.map((cell, x) => (
                        <div
                            key={`${x}-${y}`}
                            className={`w-8 h-8 rounded transition-all duration-200 ${getCellColor(cell, x, y)}`}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default MazeGrid;