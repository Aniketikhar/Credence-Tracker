import React, { createContext, useState } from 'react';

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  
  const [role , setRole] = useState();

  return (
    <GlobalContext.Provider value={{ role , setRole }}>
      {children}
    </GlobalContext.Provider>
  );
};