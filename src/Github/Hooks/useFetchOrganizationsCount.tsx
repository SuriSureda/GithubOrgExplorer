import { useEffect, useState } from 'react';
import { useFetch } from '../../Shared/Hooks/useFetch';

const MS_INTERVAL = 60000;

export const useFetchOrganizationsCount = (secondsInterval?: number) => {
  const { loading, data, fetch } = useFetch();

  useEffect(() => {
    const fetchCount = () => {
      fetch({ url: 'https://api.github.com/search/users?q=type:org' });
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
