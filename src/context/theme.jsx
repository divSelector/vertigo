import React, { createContext, useContext, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {

    const [hue, setHue] = useLocalStorage(
        'theme-current-hue',
        getRootSelectorValue('--hue')
    );

    const [bright, setBright] = useLocalStorage(
        'theme-current-bright',
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
    }, [hue, bright])

    const theme = { hue, bright, updateHue, updateBright }

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