import { useCallback, useEffect } from 'react';
import { useAppState } from '../../Shared/Hooks/useAppState';
import { useFetch } from '../../Shared/Hooks/useFetch';
import { FetchRequest } from '../../Shared/Types/FetchRequest';
import { useNotifications } from '../../Shared/Hooks/useNotifications';

type FetchGithubRequest = Omit<FetchRequest, 'url'> & {
  path: string;
  params?: Record<string, any>;
};

export const useFetchGithub = () => {
  const { github } = useAppState();
  const { add } = useNotifications();
  const { data, fetch, response, loading, error } = useFetch();

  useEffect(() => {
    if (error) {
      add({
        key: `${Math.random()} ${Date.now()}`,
        title: 'Github API Error',
        message: error.message,
        type: 'ERROR',
      });
    }
  }, [error, add]);

  const fetchGithub = useCallback(
    (request: FetchGithubRequest) => {
      const { path, params, headers, ...restRequest } = request;

      const paramsString = new URLSearchParams(params).toString();

      const url = `https://api.github.com/${path}?${paramsString}`;

      fetch({
        url: url,
        headers: {
          ...headers,
          Authorization: github.token ? `Bearer ${github.token}` : '',
        },
        ...restRequest,
      });
    },
    [fetch, github.token]
  );

  return {
    fetch: fetchGithub,
    data,
    response,
    loading,
  };
};
