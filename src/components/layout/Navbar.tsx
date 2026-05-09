import { useAuth } from '../../context/AuthContext';
import SearchBar from '../search/SearchBar';

interface NavbarProps {
  onSearch: (query: string) => void;
  isSearching: boolean;
}

const Navbar = ({ onSearch, isSearching }: NavbarProps) => {
  const { user, logout } = useAuth();

  return (
    <header className="h-14 bg-indigo-700 flex items-center px-4 gap-4 fixed top-0 left-0 right-0 z-10">
      {/* Logo */}
      <div className="flex items-center gap-2 min-w-[220px]">
        <span className="text-2xl">🐦</span>
        <span className="text-white font-bold text-lg tracking-wide">
          Blue Pigeon
        </span>
      </div>

      {/* Search Bar */}
      <div className="flex-1 max-w-2xl mx-auto">
        <SearchBar onSearch={onSearch} isLoading={isSearching} />
      </div>

      {/* User */}
      <div className="flex items-center gap-3 min-w-[160px] justify-end">
        <span className="text-indigo-200 text-sm">@{user?.username}</span>
        <button
          onClick={logout}
          className="text-xs bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded transition"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;