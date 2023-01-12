import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AuthProvider from './providers/auth-provider';
import App from './modules/main/App';
import UserProvider from './providers/user-provider';
import FacilityProvider from './providers/facility-provider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <FacilityProvider>
      <AuthProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </AuthProvider>
    </FacilityProvider>
  </React.StrictMode>
);
