import { ArrowRight, Star, Shield, Truck, Clock, Store, ChevronLeft, ExternalLink, Tag } from 'lucide-react';
import { Product } from '../types';
import { formatPrice } from '../data/store';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
}

export default function ProductDetail({ product, onBack }: ProductDetailProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 animate-fadeIn">
      {/* Breadcrumb */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-text-secondary hover:text-primary-600 mb-6 transition-colors"
      >
        <ArrowRight className="w-4 h-4" />
        بازگشت به نتایج
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Image Section */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <div className="bg-white rounded-2xl border border-border-light overflow-hidden">
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-full aspect-square object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-2 mt-3">
                {product.images.map((img, i) => (
                  <div key={i} className="w-16 h-16 rounded-lg border border-border-light overflow-hidden cursor-pointer hover:border-primary-400 transition-colors">
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Info Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title & Brand */}
          <div className="bg-white rounded-2xl border border-border-light p-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-medium text-primary-600 bg-primary-50 px-2 py-0.5 rounded-md">{product.brand}</span>
              <span className="text-xs text-text-muted">{product.subcategory}</span>
            </div>
            <h1 className="text-xl font-bold text-text-primary leading-relaxed mb-3">{product.title}</h1>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="text-sm font-semibold">{product.rating}</span>
                <span className="text-xs text-text-muted">({product.reviewCount} نظر)</span>
              </div>
              <div className="flex items-center gap-1 text-text-muted">
                <Store className="w-4 h-4" />
                <span className="text-xs">{product.sellers.length} فروشنده</span>
              </div>
            </div>
            <p className="text-sm text-text-secondary leading-relaxed">{product.description}</p>
            <div className="flex flex-wrap gap-2 mt-4">
              {product.tags.map((tag) => (
                <span key={tag} className="flex items-center gap-1 text-xs text-text-secondary bg-surface-tertiary px-2.5 py-1 rounded-lg">
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Specs */}
          <div className="bg-white rounded-2xl border border-border-light p-6">
            <h2 className="text-base font-bold text-text-primary mb-4">مشخصات فنی</h2>
            <div className="space-y-3">
              {Object.entries(product.specs).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between py-2 border-b border-border-light last:border-0">
                  <span className="text-sm text-text-muted">{key}</span>
                  <span className="text-sm font-medium text-text-primary">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sellers */}
          <div className="bg-white rounded-2xl border border-border-light p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-text-primary">فروشندگان ({product.sellers.length})</h2>
              <span className="text-xs text-text-muted">مرتب‌سازی: ارزان‌ترین</span>
            </div>
            <div className="space-y-3">
              {product.sellers.map((seller) => (
                <div
                  key={seller.id}
                  className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                    seller.inStock
                      ? 'border-border-light hover:border-primary-200 hover:bg-primary-50/30'
                      : 'border-border-light opacity-50 bg-surface-secondary'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-surface-tertiary flex items-center justify-center">
                      <Store className="w-5 h-5 text-text-muted" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-text-primary">{seller.name}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          <span className="text-[11px] text-text-muted">{seller.rating}</span>
                        </div>
                        <span className="flex items-center gap-1 text-[11px] text-text-muted">
                          <Shield className="w-3 h-3 text-success" />
                          {seller.warranty}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-left">
                      <p className="text-sm font-bold text-primary-600">{formatPrice(seller.price)}</p>
                      <div className="flex items-center gap-2 mt-1">
                        {seller.shippingCost === 0 ? (
                          <span className="text-[11px] text-success font-medium">ارسال رایگان</span>
                        ) : (
                          <span className="text-[11px] text-text-muted">+{formatPrice(seller.shippingCost)}</span>
                        )}
                        <span className="flex items-center gap-0.5 text-[11px] text-text-muted">
                          <Clock className="w-3 h-3" />
                          {seller.deliveryDays} روز
                        </span>
                      </div>
                    </div>
                    {seller.inStock ? (
                      <button className="flex items-center gap-1.5 px-4 py-2 bg-primary-600 text-white text-xs font-medium rounded-lg hover:bg-primary-700 transition-all shadow-sm">
                        <ExternalLink className="w-3.5 h-3.5" />
                        مشاهده
                      </button>
                    ) : (
                      <span className="px-4 py-2 text-xs text-text-muted bg-surface-tertiary rounded-lg">ناموجود</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Price Chart Placeholder */}
          <div className="bg-white rounded-2xl border border-border-light p-6">
            <h2 className="text-base font-bold text-text-primary mb-4">نمودار تغییرات قیمت</h2>
            <div className="h-48 bg-surface-secondary rounded-xl flex items-center justify-center">
              <div className="text-center">
                <Truck className="w-8 h-8 text-text-muted mx-auto mb-2" />
                <p className="text-sm text-text-muted">نمودار قیمت در دسترس نیست</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
