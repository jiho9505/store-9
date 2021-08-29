import { createContext } from 'react';

type historyContextType = {
  curLocation: string;
  history?: History;
};

export const HistoryContext = createContext<historyContextType>({ curLocation: '/' });

export const FormContext = createContext(null);
