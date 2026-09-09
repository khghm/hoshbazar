import { categories } from '../data/products';

interface CategoryBarProps {
  selectedCategory: string | null;
  onCategorySelect: (category: string | null) => void;
}

export default function CategoryBar({ selectedCategory, onCategorySelect }: CategoryBarProps) {
  return (
    <div className="bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-1 overflow-x-auto py-3 scrollbar-hide">
          <button
            onClick={() => onCategorySelect(null)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
              selectedCategory === null
                ? 'bg-pink-500 text-white shadow-md'
                : 'bg-gray-100 text-gray-600 hover:bg-pink-50 hover:text-pink-600'
            }`}
          >
            <i className="fas fa-th-large text-xs"></i>
            همه دسته‌ها
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onCategorySelect(cat.name === selectedCategory ? null : cat.name)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                selectedCategory === cat.name
                  ? 'bg-pink-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-pink-50 hover:text-pink-600'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
