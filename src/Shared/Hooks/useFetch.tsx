import { useState, useCallback, useRef } from 'react';
import { FetchRequest } from '../Types/FetchRequest';
import { useAppState } from './useAppState';

export const useFetch = () => {
  const { notifications } = useAppState();
  const { add } = notifications;

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<Response | null>(null);

  const abortController = useRef<AbortController>();

  const fetchData = useCallback(
    async (request: FetchRequest) => {
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
          throw Error(`Request to ${request.url} failed: ${json.message}`);
        }
        setData(json);
      } catch (error: any) {
        if (error.name === 'AbortError') return;
        add({
          key: `${Math.random() * 1000}`,
          message: error.message,
          duration: 5,
        });
      } finally {
        setLoading(false);
      }
    },
    [add]
  );

  return { data, loading, fetch: fetchData, response };
};
