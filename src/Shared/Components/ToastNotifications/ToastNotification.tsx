import { useEffect } from 'react';
import { useAppState } from '../../Hooks/useAppState';
import { Notification } from '../../Types/Notification';
import './index.css';

type Props = {
  notification: Notification;
};

const icons = {
  ERROR: '🚨',
  INFO: 'ℹ️',
};

export const ToastNotification: React.FC<Props> = ({ notification }) => {
  const { notifications } = useAppState();
  const { close } = notifications;

  const { key, duration = 5 } = notification;

  useEffect(() => {
    if (duration === 0) return;
    const timeout = setTimeout(() => close(key), duration * 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [key, duration, close]);

  return (
    <div className='toast-notification'>
      <strong>
        {`${icons[notification.type]} ` ?? ''}
        {notification.title}
      </strong>
      <br />
      {notification.message}
    </div>
  );
};
