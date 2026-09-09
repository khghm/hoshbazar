import { Product } from '../data/products';

interface ProductDetailProps {
  product: Product;
  onClose: () => void;
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat('fa-IR').format(price);
}

export default function ProductDetail({ product, onClose }: ProductDetailProps) {
  const sortedOffers = [...product.offers].sort((a, b) => a.price - b.price);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

      {/* Modal */}
      <div
        className="relative bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 z-10 w-10 h-10 bg-gray-100 hover:bg-red-100 rounded-full flex items-center justify-center transition-colors duration-200"
        >
          <i className="fas fa-times text-gray-500 hover:text-red-500"></i>
        </button>

        {/* Header */}
        <div className="bg-gradient-to-l from-pink-50 to-white p-6 border-b border-gray-100">
          <div className="flex items-start gap-6">
            <div className="text-7xl bg-white rounded-2xl p-4 shadow-sm">
              {product.image}
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-800 mb-2">{product.title}</h2>
              <p className="text-sm text-gray-500 mb-3">{product.description}</p>
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-1">
                  <i className="fas fa-star text-amber-400"></i>
                  <span className="text-sm font-medium text-gray-700">{product.rating}</span>
                  <span className="text-xs text-gray-400">({formatPrice(product.reviewCount)} نظر)</span>
                </div>
                <div className="flex items-center gap-1">
                  <i className="fas fa-store text-blue-500"></i>
                  <span className="text-sm text-gray-600">{product.offersCount} فروشگاه</span>
                </div>
                <div className="flex items-center gap-1">
                  <i className="fas fa-tag text-pink-500"></i>
                  <span className="text-sm text-gray-600">برند: {product.brand}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Price Range */}
          <div className="bg-gradient-to-l from-green-50 to-emerald-50 rounded-2xl p-5 mb-6 border border-green-100">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">ارزان‌ترین قیمت</p>
                <p className="text-2xl font-extrabold text-green-600">
                  {formatPrice(product.minPrice)}
                  <span className="text-sm font-normal text-gray-400 mr-1">تومان</span>
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-1">میانگین قیمت</p>
                <p className="text-lg font-bold text-gray-700">
                  {formatPrice(product.avgPrice)}
                  <span className="text-sm font-normal text-gray-400 mr-1">تومان</span>
                </p>
              </div>
              <div className="text-left">
                <p className="text-sm text-gray-500 mb-1">گران‌ترین قیمت</p>
                <p className="text-lg font-bold text-red-500">
                  {formatPrice(product.maxPrice)}
                  <span className="text-sm font-normal text-gray-400 mr-1">تومان</span>
                </p>
              </div>
            </div>
          </div>

          {/* Specs */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
              <i className="fas fa-list-ul text-pink-500"></i>
              مشخصات فنی
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {Object.entries(product.specs).map(([key, value]) => (
                <div key={key} className="flex items-center gap-3 bg-gray-50 rounded-xl p-3">
                  <span className="text-sm text-gray-500 min-w-[80px]">{key}:</span>
                  <span className="text-sm font-medium text-gray-800">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Offers List */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
              <i className="fas fa-store text-blue-500"></i>
              قیمت‌ها و فروشندگان
            </h3>
            <div className="space-y-3">
              {sortedOffers.map((offer, idx) => {
                const discount = offer.originalPrice
                  ? Math.round(((offer.originalPrice - offer.price) / offer.originalPrice) * 100)
                  : 0;

                return (
                  <div
                    key={idx}
                    className={`border rounded-2xl p-4 transition-all duration-200 hover:shadow-md ${
                      offer.isSpecial
                        ? 'border-green-300 bg-green-50/50'
                        : 'border-gray-100 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between flex-wrap gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-2xl">
                          {offer.shopName.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800 text-sm">{offer.shopName}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`text-xs px-2 py-0.5 rounded-full ${
                              offer.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                            }`}>
                              {offer.inStock ? '✓ موجود' : '✗ ناموجود'}
                            </span>
                            <span className="text-xs text-gray-400">
                              <i className="fas fa-truck ml-1"></i>
                              {offer.deliveryDays > 0 ? `${offer.deliveryDays} روز ارسال` : 'ناموجود'}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="text-left">
                        {offer.originalPrice && (
                          <p className="text-xs text-gray-400 line-through">
                            {formatPrice(offer.originalPrice)} تومان
                          </p>
                        )}
                        <p className="text-lg font-extrabold text-pink-600">
                          {formatPrice(offer.price)}
                          <span className="text-xs font-normal text-gray-400 mr-1">تومان</span>
                        </p>
                        {discount > 0 && (
                          <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">
                            {discount}% تخفیف
                          </span>
                        )}
                      </div>

                      <div className="flex flex-col items-end gap-1">
                        <span className="text-xs text-gray-500">
                          <i className="fas fa-shield-alt ml-1 text-blue-400"></i>
                          {offer.warranty}
                        </span>
                        {offer.inStock && (
                          <button className="bg-pink-500 hover:bg-pink-600 text-white text-xs font-medium px-4 py-2 rounded-lg transition-colors duration-200 mt-1">
                            <i className="fas fa-external-link-alt ml-1"></i>
                            رفتن به فروشگاه
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
