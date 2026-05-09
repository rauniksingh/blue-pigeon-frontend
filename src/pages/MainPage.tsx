import { useState, useCallback } from 'react';
import { useSearch } from '../hooks/useSearch';
import SearchResults from '../components/search/SearchResults';
import EmptyState from '../components/common/EmptyState';

const MainPage = () => {
  const { results, isLoading, error, search, clearResults } = useSearch();
  const [query, setQuery] = useState('');
  const [isSearchMode, setIsSearchMode] = useState(false);

  const handleSearch = useCallback((searchQuery: string) => {
    setQuery(searchQuery);
    if (searchQuery.trim()) {
      setIsSearchMode(true);
      search(searchQuery);
    } else {
      setIsSearchMode(false);
      clearResults();
    }
  }, [search, clearResults]);

  return (
    <div className="max-w-3xl mx-auto">
      {isSearchMode ? (
        <div className="bg-white min-h-screen shadow-sm">
          <SearchResults
            results={results}
            isLoading={isLoading}
            error={error}
            query={query}
          />
        </div>
      ) : (
        <div className="flex items-center justify-center h-[calc(100vh-56px)]">
          <EmptyState
            title="Search Blue Pigeon"
            description="Use the search bar above to find messages, channels, topics and users"
          />
        </div>
      )}
    </div>
  );
};

export default MainPage;