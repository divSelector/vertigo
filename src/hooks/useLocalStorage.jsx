import { useState } from 'react';

const useLocalStorage = (key, initialValue) => {
    const storedValue = localStorage.getItem(key);
    const initialParsedValue = initialValue ? JSON.parse(JSON.stringify(initialValue)) : initialValue;

    const [value, setValue] = useState(storedValue ? JSON.parse(storedValue) : initialParsedValue);

    const updateValue = (newValue) => {
        const newValueString = JSON.stringify(newValue);
        setValue(newValue);
        localStorage.setItem(key, newValueString);
    };

    return [value, updateValue];
};

export default useLocalStorage;
