import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from 'components/App';
import PhonebookProvider from 'components/context/PhonebookContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PhonebookProvider>
      <App />
    </PhonebookProvider>
  </React.StrictMode>
);
