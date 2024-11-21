import React, { createContext, useReducer, ReactNode } from 'react';

interface GlobalState {
  locationId: string;
  userName: string;
}

type GlobalStateAction =
  | { type: 'SET_LOCATION_ID'; payload: string }
  | { type: 'SET_USER_NAME'; payload: string };

const globalStateReducer = (state: GlobalState, action: GlobalStateAction): GlobalState => {
  switch (action.type) {
    case 'SET_LOCATION_ID':
      return { ...state, locationId: action.payload };
    case 'SET_USER_NAME':
      return { ...state, userName: action.payload };
    default:
      throw new Error('`Unknown action type');
  }
};

const initialState: GlobalState = {
  locationId: '',
  userName: '',
};

interface GlobalStateContextProps {
  state: GlobalState;
  dispatch: React.Dispatch<GlobalStateAction>;
}

export const GlobalStateContext = createContext<GlobalStateContextProps>({ state: initialState, dispatch: () => null });

interface GlobalStateProviderProps {
  children: ReactNode;
}

export const GlobalStateProvider = ({ children }: GlobalStateProviderProps) => {
  const [state, dispatch] = useReducer(globalStateReducer, initialState);

  return (
    <GlobalStateContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalStateContext.Provider>
  );
};
