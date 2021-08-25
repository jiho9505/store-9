import { createContext } from 'react';

type historyContextType = {
  curLocation: string;
  history?: History;
};

export const HistoryContext = createContext<historyContextType>({ curLocation: '/' });

type LikeModeType = 'notlogin' | 'add' | 'remove';

type ProductContextType = {
  info?: Info;
  handleClickLikeButton?: (mode: LikeModeType) => void;
  handleClickReviewRegisterBtn?: () => void;
  handleClickQnARegisterBtn?: () => void;
};

export const ProductContext = createContext<ProductContextType>({});
