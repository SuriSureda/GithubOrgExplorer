import { createPortal } from 'react-dom';
import { useAppState } from '../../Hooks/useAppState';
import { ToastNotification } from './ToastNotification';
import './index.css';

export const ToastNotificationHandler = () => {
  const { notifications: notificationsState } = useAppState();
  const { notifications } = notificationsState;

  return createPortal(
    <div className='toasts-wrapper'>
      {notifications.map((notification) => (
        <ToastNotification key={notification.key} notification={notification} />
      ))}
    </div>,
    document.body
  );
};
