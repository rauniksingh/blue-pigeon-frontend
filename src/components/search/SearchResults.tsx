import { SearchResults as SearchResultsType } from '../../types';
import MessageResult from './MessageResult';
import ChannelResult from './ChannelResult';
import TopicResult from './TopicResult';
import UserResult from './UserResult';
import EmptyState from '../common/EmptyState';
import Spinner from '../common/Spinner';

interface SearchResultsProps {
  results: SearchResultsType | null;
  isLoading: boolean;
  error: string | null;
  query: string;
}

interface SectionProps {
  title: string;
  count: number;
  children: React.ReactNode;
}

const Section = ({ title, count, children }: SectionProps) => (
  <div className="mb-4">
    {/* Section header */}
    <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 border-b border-gray-200">
      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
        {title}
      </h3>
      <span className="text-xs bg-indigo-100 text-indigo-600 px-1.5 py-0.5 rounded-full font-medium">
        {count}
      </span>
    </div>
    {children}
  </div>
);

const SearchResults = ({
  results,
  isLoading,
  error,
  query,
}: SearchResultsProps) => {
  // loading state
  if (isLoading) {
    return <Spinner />;
  }

  // error state
  if (error) {
    return (
      <EmptyState
        title="Something went wrong"
        description={error}
      />
    );
  }

  // no search yet
  if (!results) {
    return (
      <EmptyState
        title="Search Blue Pigeon"
        description="Search across messages, channels, topics and users"
      />
    );
  }

  // no results found
  if (results.meta.total === 0) {
    return (
      <EmptyState
        title={`No results for "${query}"`}
        description="Try searching with different keywords"
      />
    );
  }

  return (
    <div className="overflow-y-auto">
      {/* Summary */}
      <div className="px-4 py-3 border-b border-gray-200">
        <p className="text-sm text-gray-500">
          <span className="font-semibold text-gray-800">
            {results.meta.total}
          </span>{' '}
          results for{' '}
          <span className="font-semibold text-indigo-600">
            "{results.query}"
          </span>
        </p>
      </div>

      {/* Messages */}
      {results.messages.length > 0 && (
        <Section title="Messages" count={results.messages.length}>
          {results.messages.map((message) => (
            <MessageResult key={message.id} message={message} />
          ))}
        </Section>
      )}

      {/* Channels */}
      {results.channels.length > 0 && (
        <Section title="Channels" count={results.channels.length}>
          {results.channels.map((channel) => (
            <ChannelResult key={channel.id} channel={channel} />
          ))}
        </Section>
      )}

      {/* Topics */}
      {results.topics.length > 0 && (
        <Section title="Topics" count={results.topics.length}>
          {results.topics.map((topic) => (
            <TopicResult key={topic.id} topic={topic} />
          ))}
        </Section>
      )}

      {/* Users */}
      {results.users.length > 0 && (
        <Section title="Users" count={results.users.length}>
          {results.users.map((user) => (
            <UserResult key={user.id} user={user} />
          ))}
        </Section>
      )}
    </div>
  );
};

export default SearchResults;