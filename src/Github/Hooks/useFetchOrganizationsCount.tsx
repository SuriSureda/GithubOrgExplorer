import { useEffect } from 'react';
import { useFetchGithub } from './useFetchGithub';

const MS_INTERVAL = 60000;

export const useFetchOrganizationsCount = (secondsInterval?: number) => {
  const { loading, data, fetch } = useFetchGithub();

  useEffect(() => {
    const fetchCount = () => {
      fetch({
        path: 'search/users',
        params: {
          q: 'type:org',
        },
      });
    };

    fetchCount();
    const interval = setInterval(fetchCount, secondsInterval ? secondsInterval * 1000 : MS_INTERVAL);
    return () => {
      clearInterval(interval);
    };
  }, [fetch, secondsInterval]);

  const fetchResult = {
    count: data?.total_count ?? -1,
    timestamp: new Date(),
  };

  return {
    loading,
    ...fetchResult,
  };
};
