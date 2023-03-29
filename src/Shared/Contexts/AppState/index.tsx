import { ReactNode, createContext, useState } from 'react';

type AppStateContextValue = {
  githubToken?: string;
  updateToken: (newToken: string) => void;
  clearToken: () => void;
};

type ProviderProps = {
  children: ReactNode;
};

const defaultContextValue: AppStateContextValue = {
  githubToken: undefined,
  updateToken: () => {},
  clearToken: () => {},
};

export const AppStateContext = createContext<AppStateContextValue>(defaultContextValue);

const { Provider } = AppStateContext;

export const AppStateProvider: React.FC<ProviderProps> = ({ children }) => {
  const [githubToken, setGithubToken] = useState<string>();

  const updateToken = (newToken: string) => {
    setGithubToken(newToken);
  };

  const clearToken = () => {
    setGithubToken(undefined);
  };

  const value = {
    githubToken,
    updateToken,
    clearToken,
  };

  return <Provider value={value}>{children}</Provider>;
};
