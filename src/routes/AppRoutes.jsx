import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import {
    StartPage,
    ProfilePage,
    LeaderboardPage,
    NotFoundPage
} from '../pages';
import GameContainer from '../components/game/GameContainer';
import Layout from '../components/layout/Layout';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<StartPage />} />
                <Route path="profile/:userId" element={<ProfilePage />} />
                <Route path="leaderboard" element={<LeaderboardPage />} />
                <Route path="404" element={<NotFoundPage />} />
                <Route path="*" element={<Navigate to="/404" replace />} />
            </Route>

            <Route path="game" element={<GameContainer />} />
            <Route path="game/:gameId" element={<GameContainer />} />
        </Routes>
    );
};

export default AppRoutes;