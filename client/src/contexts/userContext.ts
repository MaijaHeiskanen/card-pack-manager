import { createContext, useContext } from 'react';
import { User } from '../types/generated-types-d';

const UserContext = createContext<{ user: User | null; setUser: (user: User | null) => void }>({
    user: null,
    setUser: () => {},
});

export const UserContextProvider = UserContext.Provider;

export function useUserContext() {
    return useContext(UserContext);
}

export function useIsLoggedIn() {
    return useUserContext() !== null;
}
