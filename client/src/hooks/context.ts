import { createContext } from 'react';

type historyContextType = {
  curLocation: string;
  history?: History;
};

export const HistoryContext = createContext<historyContextType>({ curLocation: '/' });

type ProductContextType = {
  info?: Info;
  handleClickLikeButton?: () => void;
  handleClickReviewRegisterBtn?: () => void;
  handleClickQnARegisterBtn?: () => void;
};

export const ProductContext = createContext<ProductContextType>({});
