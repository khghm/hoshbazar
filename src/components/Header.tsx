import { Search, Settings, Menu, X } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSearch: (query: string) => void;
  onAdminClick: () => void;
  onLogoClick: () => void;
}

export default function Header({ searchQuery, onSearchChange, onSearch, onAdminClick, onLogoClick }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <button onClick={onLogoClick} className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 bg-[#e84a4a] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">هـ</span>
            </div>
            <span className="text-lg font-bold text-gray-800 hidden sm:block">هوش‌بازار</span>
          </button>

          {/* Search */}
          <div className="flex-1 max-w-xl">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="جستجو در میلیون‌ها محصول..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && onSearch(searchQuery)}
                className="w-full pr-10 pl-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:border-[#e84a4a] focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={onAdminClick}
              className="flex items-center gap-1.5 px-3 py-2 text-sm text-gray-600 hover:text-[#e84a4a] hover:bg-gray-50 rounded-lg transition-all"
              title="پنل مدیریت"
            >
              <Settings className="w-4 h-4" />
              <span className="hidden md:inline">پنل مدیریت</span>
            </button>
            <button
              className="md:hidden p-2 text-gray-600 hover:bg-gray-50 rounded-lg"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 py-3 animate-fade-in">
            <button
              onClick={() => { onAdminClick(); setMobileMenuOpen(false); }}
              className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg"
            >
              <Settings className="w-4 h-4" />
              پنل مدیریت
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
