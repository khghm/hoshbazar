import { Search, ShoppingCart, User, Bell, Settings, ChevronDown, Menu, X } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  onSearch: (query: string) => void;
  onNavigate: (page: string) => void;
  searchQuery: string;
}

export default function Header({ onSearch, onNavigate, searchQuery }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass-effect border-b border-border-light shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('home')}>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-600 to-accent-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">HB</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-text-primary leading-tight">هوش‌بازار</h1>
              <p className="text-[10px] text-text-muted -mt-0.5">مقایسه هوشمند قیمت</p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearch(e.target.value)}
                placeholder="جستجوی محصول، برند یا دسته‌بندی..."
                className="w-full pr-10 pl-4 py-2.5 bg-surface-tertiary border border-transparent rounded-xl text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary-400 focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => onNavigate('admin')}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-sm text-text-secondary hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all"
            >
              <Settings className="w-4 h-4" />
              <span className="hidden lg:inline">پنل مدیریت</span>
            </button>
            <button className="relative p-2.5 text-text-secondary hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 left-1.5 w-2 h-2 bg-danger rounded-full"></span>
            </button>
            <button className="relative p-2.5 text-text-secondary hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-0 -right-0 w-4 h-4 bg-primary-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">3</span>
            </button>
            <button className="hidden sm:flex items-center gap-2 mr-2 px-3 py-2 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition-all shadow-sm shadow-primary-600/20">
              <User className="w-4 h-4" />
              <span>ورود</span>
            </button>
            <button
              className="md:hidden p-2 text-text-secondary"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 animate-fadeIn">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearch(e.target.value)}
                placeholder="جستجوی محصول..."
                className="w-full pr-10 pl-4 py-2.5 bg-surface-tertiary border border-transparent rounded-xl text-sm focus:outline-none focus:border-primary-400 focus:bg-white transition-all"
              />
            </div>
            <div className="flex items-center gap-2 mt-3">
              <button
                onClick={() => { onNavigate('admin'); setMobileMenuOpen(false); }}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 text-sm text-text-secondary bg-surface-tertiary rounded-lg"
              >
                <Settings className="w-4 h-4" />
                پنل مدیریت
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 text-sm text-white bg-primary-600 rounded-lg">
                <User className="w-4 h-4" />
                ورود / ثبت‌نام
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
