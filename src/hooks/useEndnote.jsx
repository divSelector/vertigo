import { useState } from "react";

const useEndnote = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleEndnote = () => {
        setIsVisible(prev => !prev);
    };

    return { isVisible, toggleEndnote };
};

export default useEndnote;