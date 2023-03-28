import { useState, useCallback } from 'react';
import { FetchRequest } from '../Types/FetchRequest';

export const useFetch = (request: FetchRequest) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(request.url, {
        method: request.method ?? 'GET',
        body: request.body,
        headers: request.headers,
      });
      const json = await response.json();
      setData(json);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }, [request.url, request.method, request.body, request.headers]);

  return { data, loading, fetch: fetchData };
};

export default useFetch;
