import React from 'react';
import './App.sass';
import './i18n';

import '/node_modules/primeflex/primeflex.css'; //primeflex
import 'primereact/resources/themes/lara-light-blue/theme.css'; //theme
import 'primereact/resources/primereact.min.css'; //core css
import 'primeicons/primeicons.css'; //icons

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SearchPage } from './pages/SearchPage';
import { CardPackPage } from './pages/CardPackPage';
import { LoginPage } from './pages/LoginPage';
import { useTranslation } from 'react-i18next';
import { Header } from './components/Header';

function App() {
    const { t } = useTranslation();

    return (
        <div className="App">
            <Router>
                <Header />
                <Routes>
                    <Route path="/cardpack/:cardpackID" element={<CardPackPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/" element={<SearchPage />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
