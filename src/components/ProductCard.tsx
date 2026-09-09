import { Product } from '../data/products';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat('fa-IR').format(price);
}

export default function ProductCard({ product, onSelect }: ProductCardProps) {
  const discount = product.offers.find(o => o.originalPrice);
  const discountPercent = discount?.originalPrice
    ? Math.round(((discount.originalPrice - discount.price) / discount.originalPrice) * 100)
    : 0;

  return (
    <div
      onClick={() => onSelect(product)}
      className="bg-white rounded-2xl border border-gray-100 hover:border-pink-200 hover:shadow-xl transition-all duration-300 cursor-pointer group overflow-hidden animate-fade-in"
    >
      {/* Image Section */}
      <div className="relative p-6 pb-2">
        {discountPercent > 0 && (
          <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg">
            {discountPercent}% تخفیف
          </div>
        )}
        {product.tags.includes('پرفروش') && (
          <div className="absolute top-3 right-3 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-lg">
            🔥 پرفروش
          </div>
        )}
        <div className="text-6xl text-center py-4 group-hover:scale-110 transition-transform duration-300">
          {product.image}
        </div>
      </div>

      {/* Info Section */}
      <div className="px-4 pb-4">
        <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 mb-2 group-hover:text-pink-600 transition-colors duration-200 leading-6">
          {product.title}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <i
                key={i}
                className={`fas fa-star text-xs ${
                  i < Math.floor(product.rating) ? 'text-amber-400' : 'text-gray-200'
                }`}
              ></i>
            ))}
          </div>
          <span className="text-xs text-gray-400">({formatPrice(product.reviewCount)})</span>
        </div>

        {/* Price Section */}
        <div className="border-t border-gray-100 pt-3">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs text-gray-400 mb-1">از</p>
              <p className="text-lg font-extrabold text-pink-600">
                {formatPrice(product.minPrice)}
              </p>
              <p className="text-xs text-gray-400">تومان</p>
            </div>
            <div className="flex items-center gap-1 bg-blue-50 text-blue-600 px-2 py-1 rounded-lg">
              <i className="fas fa-store text-xs"></i>
              <span className="text-xs font-medium">{product.offersCount} فروشگاه</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
