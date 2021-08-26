import { createContext } from 'react';

type historyContextType = {
  curLocation: string;
  history?: History;
};

export const HistoryContext = createContext<historyContextType>({ curLocation: '/' });

type ProductContextType = {
  info?: Info;
};

export const ProductContext = createContext<ProductContextType>({});

export const FormContext = createContext(null);
