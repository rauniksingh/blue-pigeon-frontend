import { useParams, useNavigate } from 'react-router-dom';
import { useChannel } from '../hooks/useChannel';
import Spinner from '../components/common/Spinner';
import EmptyState from '../components/common/EmptyState';

const ChannelPage = () => {
  const { channelId } = useParams<{ channelId: string }>();
  const navigate = useNavigate();
  const { channel, isLoading, error } = useChannel(channelId ?? '');

  if (isLoading) return <Spinner />;

  if (error || !channel) {
    return (
      <EmptyState
        title="Channel not found"
        description="This channel does not exist or you do not have access to it"
      />
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {/* Channel header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-2xl text-gray-400">
            {channel.isPrivate ? '🔒' : '#'}
          </span>
          <h1 className="text-2xl font-bold text-gray-800">{channel.name}</h1>
          {channel.isPrivate && (
            <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded">
              Private
            </span>
          )}
        </div>
        {channel.description && (
          <p className="text-sm text-gray-500 ml-8">{channel.description}</p>
        )}
        <p className="text-xs text-gray-400 ml-8 mt-1">
          👥 {channel.memberCount} members
        </p>
      </div>

      {/* Topics list */}
      <div>
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
          Topics
        </h2>

        {channel.topics.length === 0 ? (
          <EmptyState
            title="No topics yet"
            description="This channel has no topics"
          />
        ) : (
          <ul className="space-y-2">
            {channel.topics.map((topic) => (
              <li key={topic.id}>
                <button
                  onClick={() => navigate(`/topics/${topic.id}`)}
                  className="w-full text-left bg-white border border-gray-200 rounded-lg px-4 py-3 hover:border-indigo-300 hover:shadow-sm transition"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400">›</span>
                    <span className="text-sm font-medium text-gray-800">
                      {topic.name}
                    </span>
                  </div>
                  {topic.description && (
                    <p className="text-xs text-gray-400 mt-1 ml-4">
                      {topic.description}
                    </p>
                  )}
                  <p className="text-xs text-gray-300 mt-1 ml-4">
                    {new Date(topic.createdAt).toLocaleDateString()}
                  </p>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ChannelPage;