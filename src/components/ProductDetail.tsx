import { Product } from '../types';
import { formatPrice } from '../data/store';
import { ArrowRight, Star, Store, Truck, Shield, Check, ExternalLink, Tag } from 'lucide-react';

interface ProductDetailProps {
  product: Product;
  onClose: () => void;
}

export default function ProductDetail({ product, onClose }: ProductDetailProps) {
  const sortedSellers = [...product.sellers].sort((a, b) => a.price - b.price);

  return (
    <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-6 animate-fade-in">
      {/* Back */}
      <button
        onClick={onClose}
        className="flex items-center gap-1 text-sm text-gray-500 hover:text-[#e84a4a] mb-4 transition-colors"
      >
        <ArrowRight className="w-4 h-4" />
        بازگشت
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Product Info */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-gray-100 p-4 sticky top-20">
            <img
              src={product.images[0]}
              alt={product.title}
              className="w-full aspect-square object-cover rounded-lg mb-4"
            />
            <h1 className="text-lg font-bold text-gray-800 mb-2">{product.title}</h1>
            <p className="text-sm text-gray-500 mb-4">{product.description}</p>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="text-sm font-medium">{product.rating.toLocaleString('fa-IR')}</span>
              </div>
              <span className="text-sm text-gray-400">({product.reviewCount.toLocaleString('fa-IR')} نظر)</span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {product.tags.map((tag) => (
                <span key={tag} className="inline-flex items-center gap-1 px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded-md">
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>

            {/* Specs */}
            <div className="border-t border-gray-100 pt-4">
              <h3 className="text-sm font-bold text-gray-800 mb-3">مشخصات فنی</h3>
              <div className="space-y-2">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="flex items-start gap-2 text-sm">
                    <span className="text-gray-500 min-w-[100px]">{key}:</span>
                    <span className="text-gray-800 font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sellers List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-base font-bold text-gray-800 flex items-center gap-2">
                <Store className="w-5 h-5 text-[#e84a4a]" />
                لیست فروشندگان
              </h2>
              <span className="text-sm text-gray-500">
                {product.sellerCount.toLocaleString('fa-IR')} فروشگاه
              </span>
            </div>

            <div className="divide-y divide-gray-50">
              {sortedSellers.map((seller, index) => (
                <div key={seller.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-bold text-gray-800">{seller.name}</span>
                        {index === 0 && (
                          <span className="text-xs bg-[#e84a4a]/10 text-[#e84a4a] px-2 py-0.5 rounded-md font-medium">
                            بهترین قیمت
                          </span>
                        )}
                        {!seller.inStock && (
                          <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-md">
                            ناموجود
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-xs text-gray-500 mb-2">
                        <span className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          {seller.rating.toLocaleString('fa-IR')}
                        </span>
                        <span className="flex items-center gap-1">
                          <Truck className="w-3 h-3" />
                          {seller.deliveryDays.toLocaleString('fa-IR')} روز کاری
                        </span>
                        <span className="flex items-center gap-1">
                          <Shield className="w-3 h-3" />
                          {seller.warranty}
                        </span>
                      </div>
                      {seller.shippingCost > 0 && (
                        <span className="text-xs text-gray-400">
                          هزینه ارسال: {formatPrice(seller.shippingCost)} تومان
                        </span>
                      )}
                      {seller.shippingCost === 0 && (
                        <span className="text-xs text-[#00a049] flex items-center gap-1">
                          <Check className="w-3 h-3" />
                          ارسال رایگان
                        </span>
                      )}
                    </div>

                    <div className="text-left flex-shrink-0">
                      <div className="text-lg font-bold text-gray-800 mb-2">
                        {formatPrice(seller.price)}
                        <span className="text-xs font-normal text-gray-500 mr-1">تومان</span>
                      </div>
                      <a
                        href={seller.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          seller.inStock
                            ? 'bg-[#e84a4a] text-white hover:bg-[#d63636]'
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        مشاهده در فروشگاه
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
