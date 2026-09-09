import { trendingSearches } from '../data/products';

interface HeroBannerProps {
  onSearchChange: (query: string) => void;
  onSearch: () => void;
}

export default function HeroBanner({ onSearchChange, onSearch }: HeroBannerProps) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-bl from-pink-500 via-rose-500 to-purple-600 rounded-3xl p-8 mb-8">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-4 right-8 text-6xl">🛍️</div>
        <div className="absolute bottom-4 left-8 text-5xl">💰</div>
        <div className="absolute top-8 left-1/3 text-4xl">📊</div>
        <div className="absolute bottom-8 right-1/4 text-5xl">🏷️</div>
      </div>

      <div className="relative z-10 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
          هوشمندانه خرید کنید
        </h2>
        <p className="text-pink-100 text-base md:text-lg mb-6 max-w-lg mx-auto">
          مقایسه قیمت از بیش از <span className="font-bold text-white">۱۰,۰۰۰ فروشگاه</span> آنلاین در یک نگاه
        </p>

        {/* Stats */}
        <div className="flex items-center justify-center gap-6 mb-6 flex-wrap">
          <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
            <p className="text-white font-bold text-lg">۲M+</p>
            <p className="text-pink-100 text-xs">محصول</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
            <p className="text-white font-bold text-lg">۱۰K+</p>
            <p className="text-pink-100 text-xs">فروشگاه</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
            <p className="text-white font-bold text-lg">۵M+</p>
            <p className="text-pink-100 text-xs">کاربر فعال</p>
          </div>
        </div>

        {/* Trending */}
        <div className="flex items-center justify-center gap-2 flex-wrap">
          <span className="text-pink-100 text-xs">جستجوهای پرطرفدار:</span>
          {trendingSearches.slice(0, 5).map((term, idx) => (
            <button
              key={idx}
              onClick={() => {
                onSearchChange(term);
                onSearch();
              }}
              className="bg-white/20 hover:bg-white/30 text-white text-xs px-3 py-1 rounded-full transition-colors duration-200 backdrop-blur-sm"
            >
              {term}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
