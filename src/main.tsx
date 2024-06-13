import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { QueryProvider } from './lib/react-query/QueryProvider';

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);


root.render(
  <React.StrictMode>
    <BrowserRouter>
    <QueryProvider>

    <AuthProvider>

     <App />
    </AuthProvider>
    </QueryProvider>
    </BrowserRouter>
  </React.StrictMode>
);
