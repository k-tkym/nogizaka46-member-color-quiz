import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import MemberList from './MemberList.jsx';
import './index.css';
import { HashRouter, Routes, Route } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <HashRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/list" element={<MemberList />} />
            </Routes>
        </HashRouter>
    </React.StrictMode>
);