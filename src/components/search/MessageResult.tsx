import { useNavigate } from 'react-router-dom';
import { SearchMessage } from '../../types';

interface MessageResultProps {
  message: SearchMessage;
}

const MessageResult = ({ message }: MessageResultProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/topics/${message.topicId}?messageId=${message.id}`);
  };

  return (
    <button
      onClick={handleClick}
      className="w-full text-left px-4 py-3 hover:bg-gray-50 transition border-b border-gray-100 last:border-0"
    >
      {/* Channel and topic breadcrumb */}
      <div className="flex items-center gap-1 text-xs text-gray-400 mb-1">
        <span># {message.channelName}</span>
        <span>›</span>
        <span>{message.topicName}</span>
      </div>

      {/* Snippet */}
      <p className="text-sm text-gray-700 line-clamp-2">{message.snippet}</p>

      {/* Sender and time */}
      <div className="flex items-center gap-2 mt-1.5">
        <span className="text-xs font-medium text-indigo-600">
          @{message.sender.username}
        </span>
        <span className="text-xs text-gray-400">
          {new Date(message.createdAt).toLocaleDateString()}
        </span>
        {message.duration && (
          <span className="text-xs text-gray-400">
            🎙 {message.duration}s
          </span>
        )}
      </div>
    </button>
  );
};

export default MessageResult;