import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {HashRouter} from 'react-router-dom';
import { Toaster } from 'sonner';
import App from './App.tsx';
import './index.css';

// Capture beforeinstallprompt globally as early as possible
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  (window as any).deferredPrompt = e;
});


// Suppress benign Vite HMR websocket connection errors in AI Studio preview
const originalConsoleError = console.error;
console.error = (...args: any[]) => {
  if (typeof args[0] === 'string' && args[0].includes('[vite]')) {
    return;
  }
  originalConsoleError.apply(console, args);
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <Toaster position="top-center" theme="dark" richColors />
      <App />
    </HashRouter>
  </StrictMode>,
);
