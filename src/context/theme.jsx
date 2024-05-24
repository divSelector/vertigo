import React, { createContext, useContext, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {

    const [activePlayerId, setActivePlayerId] = useLocalStorage('player-active-id', 'character-creation');

    const [hue, setHue] = useLocalStorage(
        `${activePlayerId}-theme-hue`,
        getRootSelectorValue('--hue')
    );

    const [bright, setBright] = useLocalStorage(
        `${activePlayerId}-theme-bright`,
        getRootSelectorValue('--bright')
    );

    const updateHue = (value) => {
        const newHue = parseInt(value);
        setHue(newHue)
        document.documentElement.style.setProperty('--hue', newHue);
    }

    const updateBright = (value) => {
        const newBright = parseInt(value);
        setBright(newBright)
        document.documentElement.style.setProperty('--bright', newBright + "%");
    }

    useEffect(() => {
        updateHue(hue);
        updateBright(bright);
    }, [hue, bright]);

    useEffect(() => {
        if (activePlayerId != 'character-creation') {
            const storedHue = parseInt(localStorage.getItem(`player-${activePlayerId}-theme-hue`));
            const storedBright = parseInt(localStorage.getItem(`player-${activePlayerId}-theme-bright`));
            console.log(storedHue, storedBright)
            setHue(storedHue);
            setBright(storedBright);
        }
    }, [activePlayerId]);

    const theme = { hue, bright, updateHue, updateBright, activePlayerId, setActivePlayerId }

    return (
        <ThemeContext.Provider value={theme}>
            {children}
        </ThemeContext.Provider>
    );
};

export const getRootSelectorValue = (key) => {
    const computedStyle = getComputedStyle(document.documentElement)
    return parseInt(computedStyle.getPropertyValue(key))
}