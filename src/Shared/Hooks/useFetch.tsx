import { useState, useCallback } from 'react';
import { FetchRequest } from '../Types/FetchRequest';

export const useFetch = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<Response | null>(null);

  const fetchData = useCallback(async (request: FetchRequest) => {
    setLoading(true);
    try {
      const response = await fetch(request.url, {
        method: request.method ?? 'GET',
        body: request.body,
        headers: request.headers,
      });
      setResponse(response);
      const json = await response.json();
      setData(json);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, fetch: fetchData, response };
};

export default useFetch;
