import { useEffect } from 'react';
import { useFetch } from '../../Shared/Hooks/useFetch';
import { useAppState } from '../../Shared/Hooks/useAppState';

const MS_INTERVAL = 60000;

export const useFetchOrganizationsCount = (secondsInterval?: number) => {
  const { githubToken } = useAppState();
  const { loading, data, fetch } = useFetch();

  useEffect(() => {
    const fetchCount = () => {
      fetch({
        url: 'https://api.github.com/search/users?q=type:org',
        headers: {
          Authorization: githubToken ? `Bearer ${githubToken}` : '',
        },
      });
    };

    fetchCount();
    const interval = setInterval(fetchCount, secondsInterval ? secondsInterval * 1000 : MS_INTERVAL);
    return () => {
      clearInterval(interval);
    };
  }, [fetch, secondsInterval, githubToken]);

  const fetchResult = {
    count: data?.total_count ?? -1,
    timestamp: new Date(),
  };

  return {
    loading,
    ...fetchResult,
  };
};
