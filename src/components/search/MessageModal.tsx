import { useEffect } from 'react';

interface MessageModalProps {
  message: {
    id: string;
    transcript: string;
    snippet: string;
    audioUrl: string | null;
    duration: number | null;
    topicName: string;
    channelName: string;
    sender: {
      id: string;
      username: string;
    };
    createdAt: string;
  };
  onClose: () => void;
  onNavigate: () => void;
}

const MessageModal = ({ message, onClose, onNavigate }: MessageModalProps) => {
  // close on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleOpenInTopic = () => {
    onClose(); // close modal first
    setTimeout(() => {
      onNavigate(); // then navigate after modal closes
    }, 100);
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-xl w-full max-w-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="font-medium text-gray-700">
              # {message.channelName}
            </span>
            <span>›</span>
            <span>{message.topicName}</span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl leading-none"
          >
            ×
          </button>
        </div>

        {/* body */}
        <div className="px-5 py-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-semibold uppercase">
              {message.sender.username.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800">
                @{message.sender.username}
              </p>
              <p className="text-xs text-gray-400">
                {new Date(message.createdAt).toLocaleString()}
              </p>
            </div>
            {message.duration && (
              <span className="ml-auto text-xs text-gray-400">
                🎙 {message.duration}s
              </span>
            )}
          </div>

          <div className="bg-gray-50 rounded-lg px-4 py-3 mb-4">
            <p className="text-sm text-gray-700 leading-relaxed">
              {message.transcript}
            </p>
          </div>

          {message.audioUrl && (
            <div className="mb-4">
              <audio controls src={message.audioUrl} className="w-full" />
            </div>
          )}
        </div>

        {/* footer */}
        <div className="flex items-center justify-end gap-3 px-5 py-3 border-t border-gray-100">
          <button
            onClick={onClose}
            className="text-sm text-gray-500 hover:text-gray-700 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageModal;

// export default MessageModal;