import React, { useEffect, useRef, useState } from 'react';
import './i18n';

import '/node_modules/primeflex/primeflex.css'; //primeflex
import 'primereact/resources/themes/lara-light-blue/theme.css'; //theme
import 'primereact/resources/primereact.min.css'; //core css
import 'primeicons/primeicons.css'; //icons
import './App.sass';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SearchPage } from './pages/SearchPage';
import { CardpackPage } from './pages/CardpackPage';
import { LoginPage } from './pages/LoginPage';
import { useTranslation } from 'react-i18next';
import { Header } from './components/Header';
import { NavigationTree } from './components/NavigationTree';
import { Toast } from 'primereact/toast';
import { Cardpack, User } from './types/generated-types-d';
import { NotFoundPage } from './pages/NotFoundPage';
import { AppWrapper } from './wrappers/AppWrapper';
import { AxiosResponse } from 'axios';
import { UserContextProvider } from './contexts/userContext';
import { LOCAL_STORAGE_FIELD } from './auth/localstoragehelpers';
import useLocalStorage from './hooks/useLocalStorage';
import { UserPage } from './pages/UserPage';
import useService from './hooks/useService';
import { CardpackService } from './services/CardpackService';

function App() {
    const { t } = useTranslation();
    const cardpackService = useService(new CardpackService());

    const accountCreatedToast = useRef<null | any>(null);

    // User that has been logged in.
    const [user, setUser] = useLocalStorage<User | null>(LOCAL_STORAGE_FIELD.USER, null);

    // Keep global state for cardpacks, no need to reload everytime and now they are usable in all components.
    const [cardpacks, setCardpacks] = useState<Cardpack[] | undefined>();

    const setCardpacksSuccess = (response: AxiosResponse<Cardpack[]>) => {
        setCardpacks(response.data);
    };

    const setCardpacksError = (error: any) => {
        console.error(error);
    };

    useEffect(() => {
        cardpackService.get([], setCardpacksSuccess, setCardpacksError);
    }, [cardpackService]);

    const showAccountCreatedToast = (user: User) => {
        accountCreatedToast.current.show({
            severity: 'success',
            summary: `${t('accountCreated')}!`,
            details: user.username,
            life: 8000,
        });
    };

    return (
        <div className="h-full w-full flex flex-column">
            <UserContextProvider value={{ user, setUser }}>
                <Toast ref={accountCreatedToast} position="top-right" className="mt-6" />
                <Router>
                    <Header />
                    <NavigationTree cardpacks={cardpacks} />
                    <AppWrapper>
                        <Routes>
                            <Route path="/cardpacks/:cardpackId" element={<CardpackPage />} />
                            <Route
                                path="/login"
                                element={<LoginPage showAccountCreatedToast={showAccountCreatedToast} />}
                            />
                            <Route path="/" element={<SearchPage cardpacks={cardpacks} />} />
                            <Route path="/users/:userId" element={<UserPage />} />
                            <Route path="/users/:userId/cardpacks" element={<SearchPage cardpacks={cardpacks} />} />
                            <Route path="/users/:userId/cardpacks/:cardpackId" element={<CardpackPage />} />
                            <Route path="*" element={<NotFoundPage />} />
                        </Routes>
                    </AppWrapper>
                </Router>
            </UserContextProvider>
        </div>
    );
}

export default App;
