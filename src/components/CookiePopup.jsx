import React, { useState, useEffect } from 'react';

export default function CookiePopup() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('gdpr-cookie-consent');
        if (!consent) {
            setIsVisible(true);
        }
    }, []);

    const acceptAll = () => {
        localStorage.setItem('gdpr-cookie-consent', 'all');
        setIsVisible(false);
    };

    const acceptRequired = () => {
        localStorage.setItem('gdpr-cookie-consent', 'required');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-slate-955 text-white p-4 z-50 flex flex-col md:flex-row justify-between items-center border-t border-slate-800 shadow-2xl">
            <div className="mb-4 md:mb-0 md:mr-6 text-sm text-slate-300">
                Цей проєкт використовує файли cookie для збереження ігрових сесій Connect Four згідно з регламентом GDPR. Ви можете погодитися на використання всіх файлів або вибрати тільки обов'язкові.
            </div>
            <div className="flex space-x-3 shrink-0">
                <button onClick={acceptRequired} className="px-4 py-2 text-xs font-semibold bg-slate-800 hover:bg-slate-700 rounded transition-colors">
                    Тільки необхідні
                </button>
                <button onClick={acceptAll} className="px-4 py-2 text-xs font-semibold bg-blue-600 hover:bg-blue-500 rounded transition-colors">
                    Дозволити всі
                </button>
            </div>
        </div>
    );
}