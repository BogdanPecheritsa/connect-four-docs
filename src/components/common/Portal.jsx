import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const Portal = ({ children, containerId = 'portal-root' }) => {
    const [container] = useState(() => {
        let element = document.getElementById(containerId);
        if (!element) {
            element = document.createElement('div');
            element.id = containerId;
            document.body.appendChild(element);
        }
        return element;
    });

    return createPortal(children, container);
};

export default Portal;