import { User } from '../../types';

interface UserResultProps {
  user: User;
}

const UserResult = ({ user }: UserResultProps) => {
  return (
    <div className="w-full text-left px-4 py-3 border-b border-gray-100 last:border-0">
      {/* Avatar and username */}
      <div className="flex items-center gap-3">
        {/* Avatar placeholder */}
        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-semibold text-sm uppercase">
          {user.username.charAt(0)}
        </div>

        <div>
          <p className="text-sm font-medium text-gray-800">
            @{user.username}
          </p>
          <p className="text-xs text-gray-400">{user.email}</p>
        </div>
      </div>
    </div>
  );
};

export default UserResult;