import { useState, useCallback, useRef } from 'react';
import { FetchRequest } from '../Types/FetchRequest';

export const useFetch = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<Response | null>(null);
  const [error, setError] = useState<any>(null);

  const abortController = useRef<AbortController>();

  const fetchData = useCallback(async (request: FetchRequest) => {
    setError(null);
    setLoading(true);
    if (abortController.current) {
      abortController.current.abort();
    }
    const newAbortController = new AbortController();
    abortController.current = newAbortController;
    try {
      const response = await fetch(request.url, {
        method: request.method ?? 'GET',
        body: request.body,
        headers: request.headers,
        signal: newAbortController.signal,
      });
      setResponse(response);

      const contentType = response.headers.get('Content-Type');

      if (!contentType || !contentType.includes('application/json')) {
        return;
      }

      const json = await response.json();
      if (!response.ok) {
        setError(json);
      }
      setData(json);
    } catch (error: any) {
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, fetch: fetchData, response, error };
};
