import { useAppState } from './useAppState';

export const useNotifications = () => {
  const { notifications } = useAppState();

  return notifications;
};
