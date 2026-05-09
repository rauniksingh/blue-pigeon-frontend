import { useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import client from './api/client';
import { useSearch } from './hooks/useSearch';
import { ChannelDetail, SearchResults as SearchResultsType } from './types';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MainPage from './pages/MainPage';
import ChannelPage from './pages/ChannelPage';
import TopicPage from './pages/TopicPage';
import Spinner from './components/common/Spinner';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import SearchResults from './components/search/SearchResults';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) return <Spinner />;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) return <Spinner />;
  if (isAuthenticated) return <Navigate to="/" replace />;
  return <>{children}</>;
};

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const { search, clearResults, results, isLoading, error } = useSearch();
  const [query, setQuery] = useState('');
  const [channels, setChannels] = useState<ChannelDetail[]>([]);
  const [channelsLoading, setChannelsLoading] = useState(true);

  useEffect(() => {
    const fetchChannels = async () => {
      try {
        const { data } = await client.get<ChannelDetail[]>('/channels');
        setChannels(data);
      } catch {
        // sidebar failing shouldn't break the page
      } finally {
        setChannelsLoading(false);
      }
    };
    fetchChannels();
  }, []);

  const handleSearch = useCallback((searchQuery: string) => {
    setQuery(searchQuery);
    if (searchQuery.trim()) {
      search(searchQuery);
    } else {
      clearResults();
    }
  }, [search, clearResults]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar onSearch={handleSearch} isSearching={isLoading} />
      <Sidebar channels={channels} isLoading={channelsLoading} />
      <main className="ml-56 pt-14 min-h-screen">
        {results ? (
          <div className="max-w-3xl mx-auto bg-white min-h-screen shadow-sm">
            <SearchResults
              results={results}
              isLoading={isLoading}
              error={error}
              query={query}
            />
          </div>
        ) : (
          children
        )}
      </main>
    </div>
  );
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
      <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />

      <Route path="/" element={
        <ProtectedRoute>
          <AppLayout>
            <MainPage />
          </AppLayout>
        </ProtectedRoute>
      } />

      <Route path="/channels/:channelId" element={
        <ProtectedRoute>
          <AppLayout>
            <ChannelPage />
          </AppLayout>
        </ProtectedRoute>
      } />

      <Route path="/topics/:topicId" element={
        <ProtectedRoute>
          <AppLayout>
            <TopicPage />
          </AppLayout>
        </ProtectedRoute>
      } />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;