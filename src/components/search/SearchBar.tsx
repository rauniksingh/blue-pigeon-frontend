import { useState, useEffect, useRef } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

const SearchBar = ({ onSearch, isLoading }: SearchBarProps) => {
  const [query, setQuery] = useState<string>('');
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);
  const onSearchRef = useRef(onSearch);

  // keep ref in sync without triggering effect
  useEffect(() => {
    onSearchRef.current = onSearch;
  }, [onSearch]);

  useEffect(() => {
    if (!query.trim()) {
      onSearchRef.current('');
      return;
    }

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      onSearchRef.current(query.trim());
    }, 400);

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [query]); // only re-runs when query changes

  return (
    <div className="relative w-full">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-300 pointer-events-none">
        🔍
      </div>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search messages, channels, topics, users..."
        className="w-full bg-indigo-600 text-white placeholder-indigo-300 rounded-md pl-9 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-white transition"
      />

      {isLoading && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {query && !isLoading && (
        <button
          onClick={() => setQuery('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-indigo-300 hover:text-white text-lg leading-none"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default SearchBar;