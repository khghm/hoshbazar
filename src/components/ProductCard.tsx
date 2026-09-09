import { Star, TrendingDown, Store, Shield } from 'lucide-react';
import { Product } from '../types';
import { formatPrice } from '../data/store';

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
}

export default function ProductCard({ product, onClick }: ProductCardProps) {
  const discount = Math.round(((product.maxPrice - product.minPrice) / product.maxPrice) * 100);

  return (
    <div
      onClick={() => onClick(product)}
      className="bg-white rounded-2xl border border-border-light overflow-hidden card-hover cursor-pointer group"
    >
      {/* Image */}
      <div className="relative aspect-square bg-surface-secondary overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {discount > 5 && (
          <div className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 bg-danger/90 text-white text-xs font-medium rounded-lg backdrop-blur-sm">
            <TrendingDown className="w-3 h-3" />
            {discount}%
          </div>
        )}
        <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2 py-1 bg-white/90 backdrop-blur-sm rounded-lg text-xs font-medium text-text-secondary">
          <Store className="w-3 h-3" />
          {product.sellers.length} فروشنده
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-center gap-1.5 mb-2">
          <span className="text-[11px] text-text-muted font-medium">{product.brand}</span>
          <span className="text-text-muted">·</span>
          <span className="text-[11px] text-text-muted">{product.subcategory}</span>
        </div>
        
        <h3 className="text-sm font-semibold text-text-primary leading-relaxed line-clamp-2 mb-3 group-hover:text-primary-600 transition-colors">
          {product.title}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex items-center gap-0.5">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="text-xs font-medium text-text-primary">{product.rating}</span>
          </div>
          <span className="text-[11px] text-text-muted">({product.reviewCount} نظر)</span>
        </div>

        {/* Price */}
        <div className="flex items-end justify-between pt-3 border-t border-border-light">
          <div>
            <p className="text-[11px] text-text-muted mb-0.5">از</p>
            <p className="text-base font-bold text-primary-600">{formatPrice(product.minPrice)}</p>
          </div>
          {product.maxPrice !== product.minPrice && (
            <p className="text-xs text-text-muted line-through">{formatPrice(product.maxPrice)}</p>
          )}
        </div>

        {/* Warranty badge */}
        <div className="flex items-center gap-1 mt-3">
          <Shield className="w-3 h-3 text-success" />
          <span className="text-[11px] text-success font-medium">گارانتی اصالت کالا</span>
        </div>
      </div>
    </div>
  );
}
