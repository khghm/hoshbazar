import { Product } from '../types';
import { formatPrice } from '../data/store';
import { Star, Store, ChevronLeft } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
}

export default function ProductCard({ product, onSelect }: ProductCardProps) {
  const discount = Math.round(((product.maxPrice - product.minPrice) / product.maxPrice) * 100);

  return (
    <button
      onClick={() => onSelect(product)}
      className="torob-card bg-white rounded-xl border border-gray-100 overflow-hidden text-right group w-full"
    >
      {/* Image */}
      <div className="relative aspect-square bg-gray-50 overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        {discount > 5 && (
          <div className="absolute top-2 left-2 bg-[#e84a4a] text-white text-xs font-bold px-2 py-0.5 rounded-md">
            {discount}%
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3">
        <h3 className="text-sm font-medium text-gray-800 line-clamp-2 leading-6 mb-2 min-h-[48px]">
          {product.title}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span className="text-xs text-gray-600">{product.rating.toLocaleString('fa-IR')}</span>
          <span className="text-xs text-gray-400">({product.reviewCount.toLocaleString('fa-IR')})</span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-gray-400">
            <Store className="w-3.5 h-3.5" />
            <span className="text-xs">{product.sellerCount.toLocaleString('fa-IR')} فروشگاه</span>
          </div>
          <div className="text-left">
            <div className="text-xs text-gray-400 line-through">
              {formatPrice(product.maxPrice)}
            </div>
            <div className="text-sm font-bold text-gray-800">
              {formatPrice(product.minPrice)}
              <span className="text-xs font-normal text-gray-500 mr-0.5">تومان</span>
            </div>
          </div>
        </div>

        {/* View link */}
        <div className="mt-2 flex items-center gap-1 text-[#e84a4a] text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
          <span>مشاهده قیمت‌ها</span>
          <ChevronLeft className="w-3 h-3" />
        </div>
      </div>
    </button>
  );
}
