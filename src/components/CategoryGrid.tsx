import { categories } from '../data/products';

interface CategoryGridProps {
  onCategorySelect: (category: string) => void;
}

export default function CategoryGrid({ onCategorySelect }: CategoryGridProps) {
  return (
    <div className="mb-8">
      <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
        <i className="fas fa-th-large text-pink-500"></i>
        دسته‌بندی‌ها
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onCategorySelect(cat.name)}
            className="bg-white rounded-2xl border border-gray-100 p-4 hover:border-pink-200 hover:shadow-md transition-all duration-300 group text-center"
          >
            <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">
              {cat.icon}
            </div>
            <p className="text-sm font-medium text-gray-700 group-hover:text-pink-600 transition-colors duration-200">
              {cat.name}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              {new Intl.NumberFormat('fa-IR').format(cat.count)} کالا
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
