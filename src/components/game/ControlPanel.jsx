import React from 'react';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';
import Button from '../common/Button';

const ControlPanel = ({ onMove }) => {
    return (
        <div className="flex flex-col items-center gap-2">
            <Button variant="secondary" className="w-12 h-12 p-0" onClick={() => onMove('UP')}>
                <ArrowUp size={24} />
            </Button>
            <div className="flex gap-2">
                <Button variant="secondary" className="w-12 h-12 p-0" onClick={() => onMove('LEFT')}>
                    <ArrowLeft size={24} />
                </Button>
                <Button variant="secondary" className="w-12 h-12 p-0" onClick={() => onMove('DOWN')}>
                    <ArrowDown size={24} />
                </Button>
                <Button variant="secondary" className="w-12 h-12 p-0" onClick={() => onMove('RIGHT')}>
                    <ArrowRight size={24} />
                </Button>
            </div>
        </div>
    );
};

export default ControlPanel;