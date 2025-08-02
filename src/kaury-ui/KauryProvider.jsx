import React, { createContext, useContext } from 'react';
import { theme } from './theme';

const KauryContext = createContext();

export const useKaury = () => {
  const context = useContext(KauryContext);
  if (!context) {
    throw new Error('useKaury must be used within a KauryProvider');
  }
  return context;
};

export const KauryProvider = ({ children }) => {
  return (
    <KauryContext.Provider value={{ theme }}>
      {children}
    </KauryContext.Provider>
  );
};