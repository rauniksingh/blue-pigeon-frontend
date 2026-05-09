import { useNavigate, useParams } from 'react-router-dom';

interface Topic {
  id: string;
  name: string;
}

interface Channel {
  id: string;
  name: string;
  isPrivate: boolean;
  topics?: Topic[];
}

interface SidebarProps {
  channels: Channel[];
  isLoading: boolean;
}

const Sidebar = ({ channels, isLoading }: SidebarProps) => {
  const navigate = useNavigate();
  const { channelId, topicId } = useParams();

  return (
    <aside className="w-56 bg-indigo-800 h-full fixed left-0 top-14 bottom-0 overflow-y-auto flex flex-col">
      {/* Channels */}
      <div className="px-3 pt-4 pb-2">
        <p className="text-indigo-300 text-xs font-semibold uppercase tracking-widest mb-2 px-2">
          Channels
        </p>

        {isLoading ? (
          <div className="space-y-2 px-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-4 bg-indigo-700 rounded animate-pulse"
              />
            ))}
          </div>
        ) : (
          <ul className="space-y-0.5">
            {channels.map((channel) => (
              <li key={channel.id}>
                {/* Channel row */}
                <button
                  onClick={() => navigate(`/channels/${channel.id}`)}
                  className={`w-full text-left flex items-center gap-2 px-2 py-1.5 rounded text-sm transition ${
                    channelId === channel.id
                      ? 'bg-indigo-600 text-white'
                      : 'text-indigo-200 hover:bg-indigo-700 hover:text-white'
                  }`}
                >
                  <span className="text-indigo-400">
                    {channel.isPrivate ? '🔒' : '#'}
                  </span>
                  <span className="truncate">{channel.name}</span>
                </button>

                {/* Topics under active channel */}
                {channelId === channel.id && channel.topics && (
                  <ul className="ml-4 mt-0.5 space-y-0.5">
                    {channel.topics.map((topic) => (
                      <li key={topic.id}>
                        <button
                          onClick={() => navigate(`/topics/${topic.id}`)}
                          className={`w-full text-left flex items-center gap-2 px-2 py-1 rounded text-xs transition ${
                            topicId === topic.id
                              ? 'bg-indigo-500 text-white'
                              : 'text-indigo-300 hover:bg-indigo-700 hover:text-white'
                          }`}
                        >
                          <span>›</span>
                          <span className="truncate">{topic.name}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;