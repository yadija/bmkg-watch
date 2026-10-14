import './index.css';
import 'leaflet/dist/leaflet.css';

import { ThemeProvider as MaterialThemeProvider } from '@material-tailwind/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './app.tsx';
import { ThemeProvider } from './context';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <MaterialThemeProvider>
          <App />
        </MaterialThemeProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
