import { useEffect, useState } from 'react';
import { useFetch } from '../../Shared/Hooks/useFetch';

const MS_INTERVAL = 60000;

export const useFetchOrganizationsCount = (secondsInterval?: number) => {
  const { loading, data, fetch } = useFetch({ url: 'https://api.github.com/search/users?q=type:org' });

  const [state, setState] = useState({
    count: -1,
    timestamp: new Date(),
  });

  useEffect(() => {
    if (data) {
      setState({
        count: data.total_count,
        timestamp: new Date(),
      });
    }
  }, [data]);

  useEffect(() => {
    fetch();
    const interval = setInterval(fetch, secondsInterval ? secondsInterval * 1000 : MS_INTERVAL);
    return () => {
      clearInterval(interval);
    };
  }, [fetch, secondsInterval]);

  return {
    loading,
    ...state,
  };
};
