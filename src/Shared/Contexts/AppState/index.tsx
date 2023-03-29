import { ReactNode, createContext, useState } from 'react';

type AppStateContextValue = {
  github: {
    token?: string;
    updateToken: (newToken: string) => void;
    clearToken: () => void;
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
};

export const AppStateContext = createContext<AppStateContextValue>(defaultContextValue);

const { Provider } = AppStateContext;

export const AppStateProvider: React.FC<ProviderProps> = ({ children }) => {
  const [githubToken, setGithubToken] = useState<string>();

  const githubValue = {
    token: githubToken,
    updateToken: (newToken: string) => {
      setGithubToken(newToken);
    },
    clearToken: () => {
      setGithubToken(undefined);
    },
  };

  const value = {
    github: githubValue,
  };

  return <Provider value={value}>{children}</Provider>;
};
