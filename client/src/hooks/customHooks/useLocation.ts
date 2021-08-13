import { useContext } from 'react';
import { HistoryContext } from '../context';

const useLocation = () => {
  const { curLocation } = useContext(HistoryContext);
  return curLocation;
};

export default useLocation;
