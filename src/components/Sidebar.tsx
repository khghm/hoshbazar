interface SidebarProps {
  sortBy: string;
  onSortChange: (sort: string) => void;
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
  inStockOnly: boolean;
  onInStockChange: (val: boolean) => void;
}

export default function Sidebar({
  sortBy,
  onSortChange,
  priceRange,
  onPriceRangeChange,
  inStockOnly,
  onInStockChange,
}: SidebarProps) {
  const sortOptions = [
    { value: 'relevance', label: 'مرتبط‌ترین', icon: 'fa-sort' },
    { value: 'price-asc', label: 'ارزان‌ترین', icon: 'fa-arrow-up' },
    { value: 'price-desc', label: 'گران‌ترین', icon: 'fa-arrow-down' },
    { value: 'rating', label: 'محبوب‌ترین', icon: 'fa-star' },
    { value: 'offers', label: 'بیشترین پیشنهاد', icon: 'fa-store' },
    { value: 'discount', label: 'بیشترین تخفیف', icon: 'fa-percent' },
  ];

  return (
    <aside className="hidden lg:block w-64 shrink-0">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sticky top-24">
        {/* Sort */}
        <div className="mb-6">
          <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
            <i className="fas fa-sort-amount-down text-pink-500"></i>
            مرتب‌سازی
          </h3>
          <div className="space-y-1">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => onSortChange(option.value)}
                className={`w-full text-right px-3 py-2 rounded-lg text-sm flex items-center gap-2 transition-all duration-200 ${
                  sortBy === option.value
                    ? 'bg-pink-50 text-pink-600 font-medium'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <i className={`fas ${option.icon} text-xs ${
                  sortBy === option.value ? 'text-pink-500' : 'text-gray-400'
                }`}></i>
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="mb-6">
          <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
            <i className="fas fa-sliders-h text-blue-500"></i>
            محدوده قیمت
          </h3>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={priceRange[0] > 0 ? priceRange[0] : ''}
                onChange={(e) => onPriceRangeChange([Number(e.target.value) || 0, priceRange[1]])}
                placeholder="از"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs focus:border-pink-400 focus:outline-none"
              />
              <span className="text-gray-400 text-xs">تا</span>
              <input
                type="number"
                value={priceRange[1] > 0 ? priceRange[1] : ''}
                onChange={(e) => onPriceRangeChange([priceRange[0], Number(e.target.value) || 0])}
                placeholder="تا"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs focus:border-pink-400 focus:outline-none"
              />
            </div>
            <p className="text-xs text-gray-400">قیمت‌ها به تومان</p>
          </div>
        </div>

        {/* Availability */}
        <div className="mb-6">
          <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
            <i className="fas fa-box text-green-500"></i>
            وضعیت موجودی
          </h3>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => onInStockChange(e.target.checked)}
              className="w-4 h-4 text-pink-500 rounded focus:ring-pink-400"
            />
            <span className="text-sm text-gray-600">فقط کالاهای موجود</span>
          </label>
        </div>

        {/* Quick Links */}
        <div className="border-t border-gray-100 pt-4">
          <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
            <i className="fas fa-fire text-orange-500"></i>
            دسترسی سریع
          </h3>
          <div className="space-y-2">
            <button className="w-full text-right px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-orange-50 hover:text-orange-600 transition-colors duration-200 flex items-center gap-2">
              <span>🔥</span> تخفیف‌های ویژه
            </button>
            <button className="w-full text-right px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-orange-50 hover:text-orange-600 transition-colors duration-200 flex items-center gap-2">
              <span>⚡</span> جدیدترین‌ها
            </button>
            <button className="w-full text-right px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-orange-50 hover:text-orange-600 transition-colors duration-200 flex items-center gap-2">
              <span>🏆</span> پرفروش‌ترین‌ها
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
