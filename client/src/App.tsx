import React, { useRef } from 'react';
import './i18n';

import '/node_modules/primeflex/primeflex.css'; //primeflex
import 'primereact/resources/themes/lara-light-blue/theme.css'; //theme
import 'primereact/resources/primereact.min.css'; //core css
import 'primeicons/primeicons.css'; //icons
import './App.sass';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SearchPage } from './pages/SearchPage';
import { CardPackPage } from './pages/CardPackPage';
import { LoginPage } from './pages/LoginPage';
import { useTranslation } from 'react-i18next';
import { Header } from './components/Header';
import { NavigationTree } from './components/NavigationTree';
import { Toast } from 'primereact/toast';
import { User } from './types/generated-types-d';
import { NotFoundPage } from './pages/NotFoundPage';
import { AppWrapper } from './wrappers/AppWrapper';

function App() {
    const { t } = useTranslation();

    const accountCreatedToast = useRef<null | any>(null);

    const showAccountCreatedToast = (user: User) => {
        accountCreatedToast.current.show({
            severity: 'success',
            summary: `${t('accountCreated')}!`,
            details: user.username,
            life: 8000,
        });
    };

    return (
        <div className="h-full w-full">
            <Toast ref={accountCreatedToast} position="top-right" />
            <Router>
                <Header />
                <NavigationTree />
                <AppWrapper>
                    <Routes>
                        <Route path="/cardpack/:cardpackID" element={<CardPackPage />} />
                        <Route
                            path="/login"
                            element={<LoginPage showAccountCreatedToast={showAccountCreatedToast} />}
                        />
                        <Route path="/" element={<SearchPage />} />
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </AppWrapper>
            </Router>
        </div>
    );
}

export default App;
