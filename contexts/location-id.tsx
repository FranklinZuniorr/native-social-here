import React from 'react';
import { createContext, useState, ReactNode } from 'react';

interface LocationIdContextProps {
  id: string;
  setId: (value: string) => void;
}

export const LocationIdContext = createContext<LocationIdContextProps>({ id: '', setId: () => null });

interface LocationIdProviderProps {
  children: ReactNode;
}

export const LocationIdProvider = ({ children }: LocationIdProviderProps) => {
  const [id, setId] = useState<string>('');

  return (
    <LocationIdContext.Provider value={{ id, setId }}>
      {children}
    </LocationIdContext.Provider>
  );
};

