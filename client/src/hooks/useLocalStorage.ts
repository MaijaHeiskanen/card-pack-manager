import { useState } from 'react';
import { getFromLocalStorage, LOCAL_STORAGE_FIELD, setInLocalStorage } from '../auth/localstoragehelpers';

export default function useLocalStorage<T extends object | string | null>(
    key: LOCAL_STORAGE_FIELD,
    initialValue: T
): [T | null, (newValue: T) => void] {
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            const item = getFromLocalStorage(key);

            console.log({ item });

            return item || initialValue;
        } catch (error) {
            console.error('useLocalStorage', error);

            return initialValue;
        }
    });

    const setValue = (value: T) => {
        try {
            setStoredValue(value);

            setInLocalStorage(key, value);
        } catch (error) {
            console.error('useLocalStorage', error);
        }
    };

    return [storedValue, setValue];
}
