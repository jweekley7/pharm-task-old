import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AuthProvider from './providers/auth-provider';
import App from './modules/main/App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
