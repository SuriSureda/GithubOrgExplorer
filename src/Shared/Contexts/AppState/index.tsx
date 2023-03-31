import { ReactNode, createContext, useCallback, useState } from 'react';
import { Notification } from '../../Types/Notification';

type AppStateContextValue = {
  github: {
    token?: string;
    updateToken: (newToken: string) => void;
    clearToken: () => void;
  };
  notifications: {
    notifications: Notification[];
    add: (notification: Notification) => void;
    close: (key: string) => void;
  };
};

type ProviderProps = {
  children: ReactNode;
};

const defaultContextValue: AppStateContextValue = {
  github: {
    token: undefined,
    updateToken: () => {},
    clearToken: () => {},
  },
  notifications: {
    notifications: [],
    add: () => {},
    close: () => {},
  },
};

export const AppStateContext = createContext<AppStateContextValue>(defaultContextValue);

const { Provider } = AppStateContext;

export const AppStateProvider: React.FC<ProviderProps> = ({ children }) => {
  const [githubToken, setGithubToken] = useState<string>();
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const githubValue = {
    token: githubToken,
    updateToken: (newToken: string) => {
      setGithubToken(newToken);
    },
    clearToken: () => {
      setGithubToken(undefined);
    },
  };

  const notificationsValue = {
    notifications: notifications,
    add: useCallback((notification: Notification) => {
      setNotifications((prev) => [...prev, notification]);
    }, []),
    close: useCallback((key: string) => {
      setNotifications((prev) => prev?.filter((notification) => notification.key !== key));
    }, []),
  };

  const value = {
    github: githubValue,
    notifications: notificationsValue,
  };

  return <Provider value={value}>{children}</Provider>;
};
