import React, { useState, createContext } from 'react';

// this is the default value
export const IsLogged = createContext(localStorage.isLogged);
export const Name = createContext('Emerson');

function Store({ children }) {
  const [isLogged, setIsLogged] = useState(localStorage.isLogged);
  const [name, setName] = useState('emerson');

  return (
    <IsLogged.Provider value={[isLogged, setIsLogged]}>
      <Name.Provider value={[name, setName]}>{children}</Name.Provider>
    </IsLogged.Provider>
  );
}

export default Store;
