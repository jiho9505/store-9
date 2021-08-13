import { useContext } from 'react';
import { HistoryContext } from '../context';

const useHistory = () => {
  const { history } = useContext(HistoryContext);
  return history;
};

export default useHistory;
