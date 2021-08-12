import { createContext } from 'react';

type historyContextType = {
  curLocation: string;
  onChangeLocation?: (path: string) => void;
  history?: History;
};

export const HistoryContext = createContext<historyContextType>({ curLocation: '/' });
