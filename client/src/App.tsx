import React from 'react';
import './App.css';

import 'primereact/resources/themes/lara-light-indigo/theme.css'; //theme
import 'primereact/resources/primereact.min.css'; //core css
import 'primeicons/primeicons.css'; //icons

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { SearchPage } from './pages/SearchPage';
import { CardPackPage } from './pages/CardPackPage';
import { LoginPage } from './pages/LoginPage';

function App() {
    return (
        <div className="App">
            <Router>
                <div>
                    <Link to={'login'}>Login</Link>
                    <br />
                    <Link to={'cardpack/random-id-234'}>
                        Card pack random-id-234
                    </Link>
                    <br />
                    <Link to={'cardpack/random-id-666'}>
                        Card pack random-id-666
                    </Link>
                    <br />
                    <Link to={'/'}>Search page</Link>
                    <br />
                </div>
                <br />
                <Routes>
                    <Route
                        path="/cardpack/:cardpackID"
                        element={<CardPackPage />}
                    />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/" element={<SearchPage />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
