import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.tsx';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './queryClient.ts';
import { ProfileProvider } from './state/profileProvider.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <ProfileProvider>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </ProfileProvider>
        </QueryClientProvider>
    </StrictMode>,
);
