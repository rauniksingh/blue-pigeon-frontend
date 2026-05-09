import { useNavigate } from 'react-router-dom';
import { Topic } from '../../types';

interface TopicResultProps {
  topic: Topic;
}

const TopicResult = ({ topic }: TopicResultProps) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(`/topics/${topic.id}`)}
      className="w-full text-left px-4 py-3 hover:bg-gray-50 transition border-b border-gray-100 last:border-0"
    >
      <div className="flex items-center gap-1 text-xs text-gray-400 mb-1">
        <span># {topic.channelName}</span>
        <span>›</span>
        <span>{topic.name}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-gray-400">›</span>
        <span className="text-sm font-medium text-gray-800">{topic.name}</span>
      </div>
      {topic.description && (
        <p className="text-xs text-gray-400 mt-1 ml-4 line-clamp-1">
          {topic.description}
        </p>
      )}
    </button>
  );
};

export default TopicResult;