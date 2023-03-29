import { useContext } from 'react';
import { AppStateContext } from '../Contexts/AppState';

export const useAppState = () => {
  const context = useContext(AppStateContext);
  return context;
};
