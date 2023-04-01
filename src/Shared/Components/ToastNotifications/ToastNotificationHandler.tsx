import { createPortal } from 'react-dom';
import { ToastNotification } from './ToastNotification';
import './index.css';
import { useNotifications } from '../../Hooks/useNotifications';

export const ToastNotificationHandler = () => {
  const { notifications } = useNotifications();

  return createPortal(
    <div className='toasts-wrapper'>
      {notifications.map((notification) => (
        <ToastNotification key={notification.key} notification={notification} />
      ))}
    </div>,
    document.body
  );
};
