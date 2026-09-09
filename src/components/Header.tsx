import { useState } from 'react';
import { trendingSearches } from '../data/products';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSearch: () => void;
}

export default function Header({ searchQuery, onSearchChange, onSearch }: HeaderProps) {
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredSuggestions = trendingSearches.filter(s =>
    s.includes(searchQuery) && searchQuery.length > 0
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch();
      setShowSuggestions(false);
    }
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">هـ</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-extrabold text-gray-800">هوش‌بازار</h1>
              <p className="text-[10px] text-gray-400 -mt-1">مقایسه هوشمند قیمت‌ها</p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl relative">
            <div className="relative flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  onSearchChange(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                onKeyDown={handleKeyDown}
                placeholder="نام کالا، برند یا دسته‌بندی را جستجو کنید..."
                className="w-full py-3 px-4 pr-12 rounded-xl border-2 border-gray-200 focus:border-pink-400 focus:outline-none text-sm transition-all duration-200 bg-gray-50 focus:bg-white"
              />
              <button
                onClick={onSearch}
                className="absolute right-2 bg-pink-500 hover:bg-pink-600 text-white p-2 rounded-lg transition-colors duration-200"
              >
                <i className="fas fa-search text-sm"></i>
              </button>
            </div>

            {/* Suggestions Dropdown */}
            {showSuggestions && filteredSuggestions.length > 0 && (
              <div className="absolute top-full mt-2 w-full bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden animate-slide-down z-50">
                {filteredSuggestions.map((suggestion, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      onSearchChange(suggestion);
                      setShowSuggestions(false);
                      onSearch();
                    }}
                    className="w-full text-right px-4 py-3 hover:bg-pink-50 flex items-center gap-3 transition-colors duration-150 border-b border-gray-50 last:border-0"
                  >
                    <i className="fas fa-search text-gray-300 text-xs"></i>
                    <span className="text-sm text-gray-700">{suggestion}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 shrink-0">
            <button className="hidden md:flex items-center gap-2 text-gray-600 hover:text-pink-500 transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-pink-50">
              <i className="fas fa-heart text-lg"></i>
              <span className="text-sm hidden lg:inline">علاقه‌مندی‌ها</span>
            </button>
            <button className="hidden md:flex items-center gap-2 text-gray-600 hover:text-pink-500 transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-pink-50">
              <i className="fas fa-bell text-lg"></i>
              <span className="text-sm hidden lg:inline">هشدار قیمت</span>
            </button>
            <button className="flex items-center gap-2 bg-gradient-to-l from-pink-500 to-rose-500 text-white px-4 py-2 rounded-xl hover:shadow-lg transition-all duration-200 text-sm font-medium">
              <i className="fas fa-user"></i>
              <span className="hidden lg:inline">ورود | ثبت‌نام</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
