import React, { createContext, useContext, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { useTheme } from './theme';

const PlayerContext = createContext();

export const usePlayer = () => useContext(PlayerContext);

export const PlayerProvider = ({ children }) => {

    const [saveFiles, setSaveFiles] = useLocalStorage('save-files', []);

    const { activePlayerId, setActivePlayerId } = useTheme();

    const [meat, setMeat] = useLocalStorage(`${activePlayerId}-meat`, 1);
    const [leet, setLeet] = useLocalStorage(`${activePlayerId}-leet`, 1);
    const [street, setStreet] = useLocalStorage(`${activePlayerId}-street`, 1);

    const [selectedContact, setSelectedContact] = useLocalStorage(`${activePlayerId}-selected-contact`, null);

    const [name, setName] = useLocalStorage(`${activePlayerId}-name`, "");

    useEffect(() => {
        setMeat(1);
        setLeet(1);
        setStreet(1);
        setSelectedContact(null);
        setName("");
    }, [activePlayerId]);

    const switchPlayer = (playerId) => {
        setActivePlayerId(playerId);
    };

    const saveNewPlayer = (playerName) => {

        const keys = Object.keys(localStorage);

        const tempKeys = keys.filter(key => key.endsWith('*temp'));
        tempKeys.forEach(key => {
            localStorage.removeItem(key);
        });

        const creationKeys = keys.filter(key => key.startsWith('character-creation'));

        creationKeys.forEach(key => {
            const newKey = key.replace('character-creation', 'player-'+playerName);
            const value = localStorage.getItem(key);
            localStorage.setItem(newKey, value);
            localStorage.removeItem(key);
        });

        setSaveFiles([...saveFiles, playerName])
    };

    const getPlayerData = () => {
        return {
            meat, leet, street,
            setMeat, setLeet, setStreet,
            selectedContact, setSelectedContact,
            name, setName,
            saveFiles
        }
    };

    return (
        <PlayerContext.Provider value={{ activePlayerId, switchPlayer, getPlayerData, saveNewPlayer }}>
            {children}
        </PlayerContext.Provider>
    );
};
