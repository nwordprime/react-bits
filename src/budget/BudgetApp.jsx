import React from 'react';
import { KauryProvider } from '../kaury-ui/KauryProvider';
import { Dashboard } from './components/Dashboard';

export const BudgetApp = () => {
  return (
    <KauryProvider>
      <Dashboard />
    </KauryProvider>
  );
};