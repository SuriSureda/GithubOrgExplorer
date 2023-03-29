import { useEffect } from 'react';
import { useFetch } from '../../Shared/Hooks/useFetch';
import { useAppState } from '../../Shared/Hooks/useAppState';

const MS_INTERVAL = 60000;

export const useFetchOrganizationsCount = (secondsInterval?: number) => {
  const { github } = useAppState();
  const { loading, data, fetch } = useFetch();

  useEffect(() => {
    const fetchCount = () => {
      fetch({
        url: 'https://api.github.com/search/users?q=type:org',
        headers: {
          Authorization: github.token ? `Bearer ${github.token}` : '',
        },
      });
    };

    fetchCount();
    const interval = setInterval(fetchCount, secondsInterval ? secondsInterval * 1000 : MS_INTERVAL);
    return () => {
      clearInterval(interval);
    };
  }, [fetch, secondsInterval, github.token]);

  const fetchResult = {
    count: data?.total_count ?? -1,
    timestamp: new Date(),
  };

  return {
    loading,
    ...fetchResult,
  };
};
