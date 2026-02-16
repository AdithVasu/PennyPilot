import React, { useState, useEffect } from 'react';
import AuthPage from './pages/AuthPage';
import BudgetDashboard from './pages/Dashboard';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('access_token'));

  return (
    <>
      {!isAuthenticated ? (
        <AuthPage onAuthSuccess={() => setIsAuthenticated(true)} />
      ) : (
        <BudgetDashboard />
      )}
    </>
  );
}