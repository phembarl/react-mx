import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import 'react-responsive-modal/styles.css';
import './index.css';
import App from './App.tsx';
import { StudentsProvider } from './contexts/studentsContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <StudentsProvider>
        <App />
      </StudentsProvider>
    </Router>
  </React.StrictMode>
);
