import { ToastProvider } from '@heroui/react';
import { ThemeProvider } from 'next-themes';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ThemeProvider attribute="class" defaultTheme="dark" storageKey="triage-wheel-theme">
            <ToastProvider placement="bottom end" maxVisibleToasts={3} />
            <App />
        </ThemeProvider>
    </React.StrictMode>
);
