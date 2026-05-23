import React, { useState } from 'react';
import { X, Save } from 'lucide-react';
import Portal from '../common/Portal';
import Button from '../common/Button';
import Card from '../common/Card';
import { useStore } from '../../store';

const SettingsModal = ({ isOpen, onClose, onSave }) => {
    const settings = useStore((state) => state.settings);
    const updateSettings = useStore((state) => state.updateSettings);
    const loadPlayer = useStore((state) => state.loadPlayer);

    const [formData, setFormData] = useState(settings);
    const [errors, setErrors] = useState({});

    if (!isOpen) return null;

    const validate = () => {
        const newErrors = {};

        if (!formData.playerName || formData.playerName.trim().length < 2) {
            newErrors.playerName = "Ім'я має містити принаймні 2 символи";
        }

        if (formData.playerName && formData.playerName.length > 20) {
            newErrors.playerName = "Ім'я не може бути довшим за 20 символів";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validate()) {
            updateSettings(formData);
            loadPlayer();
            onSave(formData);
            onClose();
        }
    };

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: undefined }));
        }
    };

    return (
        <Portal>
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <Card className="max-w-lg w-full">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">Налаштування гри</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700 transition-colors"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Ім'я гравця <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={formData.playerName}
                                onChange={(e) => handleChange('playerName', e.target.value)}
                                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    errors.playerName ? 'border-red-500' : 'border-gray-300'
                                }`}
                                placeholder="Введіть ваше ім'я"
                            />
                            {errors.playerName && (
                                <p className="text-red-500 text-xs mt-1">{errors.playerName}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Рівень складності
                            </label>
                            <div className="grid grid-cols-3 gap-2">
                                {['easy', 'medium', 'hard'].map((diff) => (
                                    <button
                                        key={diff}
                                        type="button"
                                        onClick={() => handleChange('difficulty', diff)}
                                        className={`py-3 px-4 rounded-lg font-semibold transition-all ${
                                            formData.difficulty === diff
                                                ? 'bg-blue-600 text-white shadow-lg'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                    >
                                        {diff === 'easy' ? '😊 Легко' : diff === 'medium' ? '🎯 Середньо' : '🔥 Складно'}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Розмір лабіринту: <span className="text-blue-600 font-bold">{formData.mazeSize}x{formData.mazeSize}</span>
                            </label>
                            <input
                                type="range"
                                min="8"
                                max="15"
                                value={formData.mazeSize}
                                onChange={(e) => handleChange('mazeSize', parseInt(e.target.value))}
                                className="w-full"
                            />
                            <div className="flex justify-between text-xs text-gray-500 mt-1">
                                <span>8x8</span>
                                <span>15x15</span>
                            </div>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div>
                                <label className="text-sm font-semibold text-gray-700">
                                    Звукові ефекти
                                </label>
                                <p className="text-xs text-gray-500 mt-1">
                                    {formData.soundEnabled ? 'Увімкнено' : 'Вимкнено'}
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => handleChange('soundEnabled', !formData.soundEnabled)}
                                className={`relative w-14 h-7 rounded-full transition-colors ${
                                    formData.soundEnabled ? 'bg-blue-600' : 'bg-gray-300'
                                }`}
                            >
                <span
                    className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform shadow-md ${
                        formData.soundEnabled ? 'transform translate-x-7' : ''
                    }`}
                />
                            </button>
                        </div>

                        <div className="flex gap-3 pt-4 border-t">
                            <Button type="submit" variant="success" className="flex-1">
                                <Save size={20} />
                                Зберегти
                            </Button>
                            <Button type="button" onClick={onClose} variant="secondary" className="flex-1">
                                Скасувати
                            </Button>
                        </div>
                    </form>
                </Card>
            </div>
        </Portal>
    );
};

export default SettingsModal;