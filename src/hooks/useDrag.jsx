import { useState, useEffect } from 'react';

const useDrag = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

    const dragMouseDown = (e) => {
        setIsDragging(true);
        setDragOffset({
            x: e.clientX - position.x,
            y: e.clientY - position.y,
        });
    };

    const dragMouseUp = () => {
        setIsDragging(false);
    };

    const dragMouseMove = (e) => {
        if (!isDragging) return;
        setPosition({
            x: e.clientX - dragOffset.x,
            y: e.clientY - dragOffset.y,
        });
    };

    useEffect(() => {
        if (isDragging) {
            document.addEventListener('mousemove', dragMouseMove);
            document.addEventListener('mouseup', dragMouseUp);
        } else {
            document.removeEventListener('mousemove', dragMouseMove);
            document.removeEventListener('mouseup', dragMouseUp);
        }

        return () => {
            document.removeEventListener('mousemove', dragMouseMove);
            document.removeEventListener('mouseup', dragMouseUp);
        };
    }, [isDragging]);

    return { position, dragMouseDown };
};

export default useDrag;
