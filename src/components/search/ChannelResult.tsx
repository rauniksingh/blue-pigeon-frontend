import { useNavigate } from 'react-router-dom';
import { Channel } from '../../types';

interface ChannelResultProps {
  channel: Channel;
}

const ChannelResult = ({ channel }: ChannelResultProps) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(`/channels/${channel.id}`)}
      className="w-full text-left px-4 py-3 hover:bg-gray-50 transition border-b border-gray-100 last:border-0"
    >
      {/* Channel name */}
      <div className="flex items-center gap-2">
        <span className="text-gray-400 font-medium">
          {channel.isPrivate ? '🔒' : '#'}
        </span>
        <span className="text-sm font-medium text-gray-800">
          {channel.name}
        </span>
        {channel.isPrivate && (
          <span className="text-xs bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">
            Private
          </span>
        )}
      </div>

      {/* Description */}
      {channel.description && (
        <p className="text-xs text-gray-400 mt-1 ml-6 line-clamp-1">
          {channel.description}
        </p>
      )}

      {/* Member count */}
      <div className="flex items-center gap-1 mt-1 ml-6">
        <span className="text-xs text-gray-400">
          👥 {channel.memberCount} members
        </span>
      </div>
    </button>
  );
};

export default ChannelResult;