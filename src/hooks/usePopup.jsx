import { useState, useEffect, useRef } from "react";
import useDrag from "./useDrag";

const usePopup = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
    const popupRef = useRef("");

    const { position, dragMouseDown } = useDrag();

    const handleClick = (e) => {
        const rect = e.target.getBoundingClientRect();
        const clickY = e.clientY - rect.top;
        setShowPopup(true);
        setPopupPosition({ top: clickY + rect.top, left: window.innerWidth / 2 });
    };

    const handleClickOutside = (e) => {
        if (popupRef.current && !popupRef.current.contains(e.target)) {
            setShowPopup(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return {
        showPopup,
        popupPosition,
        popupRef,
        handleClick,
        position,
        dragMouseDown
    };
};

export default usePopup;
