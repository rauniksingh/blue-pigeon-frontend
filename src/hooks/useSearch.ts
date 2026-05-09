import { useState, useCallback } from 'react';
import client from '../api/client';
import { SearchResults } from '../types';

interface UseSearchReturn {
  results: SearchResults | null;
  isLoading: boolean;
  error: string | null;
  search: (query: string) => Promise<void>;
  clearResults: () => void;
}

export const useSearch = (): UseSearchReturn => {
  const [results, setResults] = useState<SearchResults | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const search = useCallback(async (query: string): Promise<void> => {
    if (!query.trim()) {
      setResults(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const { data } = await client.get<SearchResults>('/search', {
        params: { q: query },
      });
      setResults(data);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Something went wrong';
      setError(message);
      setResults(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearResults = useCallback((): void => {
    setResults(null);
    setError(null);
  }, []);

  return {
    results,
    isLoading,
    error,
    search,
    clearResults,
  };
};