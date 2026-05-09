import { useEffect, useRef } from 'react';
import { useParams, useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { useTopic } from '../../hooks/useTopic';
import Spinner from '../../components/common/Spinner';
import EmptyState from '../../components/common/EmptyState';
import { MessageItem } from '../../types';

const MessageBubble = ({
  message,
  isHighlighted,
}: {
  message: MessageItem;
  isHighlighted: boolean;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isHighlighted && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [isHighlighted]);

  return (
    <div
      ref={ref}
      className={`px-4 py-3 rounded-lg border transition-all ${
        isHighlighted
          ? 'border-indigo-400 bg-indigo-50 shadow-md'
          : 'border-gray-100 bg-white'
      }`}
    >
      <div className="flex items-center gap-2 mb-1">
        <div className="w-7 h-7 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-semibold text-xs uppercase">
          {message.sender.username.charAt(0)}
        </div>
        <span className="text-sm font-semibold text-gray-800">
          @{message.sender.username}
        </span>
        <span className="text-xs text-gray-400">
          {new Date(message.createdAt).toLocaleString()}
        </span>
        {message.duration && (
          <span className="text-xs text-gray-400 ml-auto">
            🎙 {message.duration}s
          </span>
        )}
      </div>
      <p className="text-sm text-gray-700 ml-9 leading-relaxed">
        {message.transcript}
      </p>
      {message.audioUrl && (
        <div className="ml-9 mt-2">
          <audio controls src={message.audioUrl} className="w-full h-8" />
        </div>
      )}
    </div>
  );
};

const TopicPage = () => {
  const { topicId } = useParams<{ topicId: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { topic, isLoading, error } = useTopic(topicId ?? '');

  const targetMessageId = searchParams.get('messageId');

  // channel info passed from navigation state
  const state = location.state as {
    channelId?: string;
    channelName?: string;
    topicName?: string;
  } | null;

  const channelId = state?.channelId ?? topic?.channelId;
  const channelName = state?.channelName ?? topic?.channelName;

  if (isLoading) return <Spinner />;

  if (error || !topic) {
    return (
      <EmptyState
        title="Topic not found"
        description="This topic does not exist or you do not have access"
      />
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {/* Breadcrumb — channel → topic */}
      <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
        <button
          onClick={() => navigate(`/channels/${channelId}`)}
          className="hover:text-indigo-600 transition font-medium"
        >
          # {channelName}
        </button>
        <span>›</span>
        <span className="text-gray-600 font-medium">{topic.name}</span>
      </div>

      {/* Topic header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">{topic.name}</h1>
        {topic.description && (
          <p className="text-sm text-gray-500 mt-1">{topic.description}</p>
        )}
      </div>

      {/* Messages */}
      <div className="space-y-3">
        {topic.messages.length === 0 ? (
          <EmptyState
            title="No messages yet"
            description="This topic has no messages"
          />
        ) : (
          topic.messages.map((message) => (
            <MessageBubble
              key={message.id}
              message={message}
              isHighlighted={message.id === targetMessageId}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TopicPage;