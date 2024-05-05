import React, { createContext, useContext, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { useTheme } from './theme';

const PlayerContext = createContext();

export const usePlayer = () => useContext(PlayerContext);

export const PlayerProvider = ({ children }) => {

    const { hue, bright, updateHue, updateBright } = useTheme();
    
    const [activePlayerId, setActivePlayerId] = useLocalStorage('player-active-id');

    const [meat, setMeat] = useLocalStorage(`${activePlayerId}-meat`, 1);
    const [leet, setLeet] = useLocalStorage(`${activePlayerId}-leet`, 1);
    const [street, setStreet] = useLocalStorage(`${activePlayerId}-street`, 1);

    const [selectedContact, setSelectedContact] = useLocalStorage(`${activePlayerId}-selected-contact`, null);
    
    const [name, setName] = useLocalStorage(`${activePlayerId}-name`, "");

    const switchPlayer = (playerId) => {
        setActivePlayerId(playerId);
    };

    const getPlayerData = () => {
        return {
            meat, leet, street,
            setMeat, setLeet, setStreet,
            hue, bright,
            updateHue, updateBright,
            selectedContact, setSelectedContact,
            name, setName
        }
    };

    return (
        <PlayerContext.Provider value={{ activePlayerId, switchPlayer, getPlayerData }}>
            {children}
        </PlayerContext.Provider>
    );
};
