import { useState, useMemo } from 'react';
import Header from './components/Header';
import CategoryBar from './components/CategoryBar';
import HeroBanner from './components/HeroBanner';
import CategoryGrid from './components/CategoryGrid';
import Sidebar from './components/Sidebar';
import ProductCard from './components/ProductCard';
import ProductDetail from './components/ProductDetail';
import Footer from './components/Footer';
import { products, Product } from './data/products';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [sortBy, setSortBy] = useState('relevance');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 0]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.brand.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          p.subcategory.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.tags.some((t) => t.toLowerCase().includes(query))
      );
    }

    // Category filter
    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Price range filter
    if (priceRange[0] > 0) {
      result = result.filter((p) => p.minPrice >= priceRange[0]);
    }
    if (priceRange[1] > 0) {
      result = result.filter((p) => p.maxPrice <= priceRange[1]);
    }

    // In stock filter
    if (inStockOnly) {
      result = result.filter((p) => p.offers.some((o) => o.inStock));
    }

    // Sort
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.minPrice - b.minPrice);
        break;
      case 'price-desc':
        result.sort((a, b) => b.minPrice - a.minPrice);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'offers':
        result.sort((a, b) => b.offersCount - a.offersCount);
        break;
      case 'discount':
        result.sort((a, b) => {
          const discA = a.offers.find((o) => o.originalPrice);
          const discB = b.offers.find((o) => o.originalPrice);
          const pctA = discA?.originalPrice
            ? (discA.originalPrice - discA.price) / discA.originalPrice
            : 0;
          const pctB = discB?.originalPrice
            ? (discB.originalPrice - discB.price) / discB.originalPrice
            : 0;
          return pctB - pctA;
        });
        break;
    }

    return result;
  }, [searchQuery, selectedCategory, sortBy, priceRange, inStockOnly]);

  const handleSearch = () => {
    setIsSearching(true);
    setTimeout(() => setIsSearching(false), 300);
  };

  const handleCategorySelect = (category: string | null) => {
    setSelectedCategory(category);
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearch={handleSearch}
      />

      <CategoryBar
        selectedCategory={selectedCategory}
        onCategorySelect={handleCategorySelect}
      />

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Hero Banner - only show when not searching */}
        {!searchQuery && !selectedCategory && (
          <HeroBanner onSearchChange={setSearchQuery} onSearch={handleSearch} />
        )}

        {/* Category Grid - only show when not searching */}
        {!searchQuery && !selectedCategory && (
          <CategoryGrid onCategorySelect={(cat) => handleCategorySelect(cat)} />
        )}

        {/* Search Results Header */}
        {(searchQuery || selectedCategory) && (
          <div className="mb-6 animate-fade-in">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  {searchQuery ? (
                    <>نتایج جستجو برای «<span className="text-pink-600">{searchQuery}</span>»</>
                  ) : (
                    <>دسته‌بندی: <span className="text-pink-600">{selectedCategory}</span></>
                  )}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  {new Intl.NumberFormat('fa-IR').format(filteredProducts.length)} محصول یافت شد
                </p>
              </div>

              {/* Mobile Sort */}
              <div className="lg:hidden">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-200 rounded-xl text-sm bg-white focus:border-pink-400 focus:outline-none"
                >
                  <option value="relevance">مرتبط‌ترین</option>
                  <option value="price-asc">ارزان‌ترین</option>
                  <option value="price-desc">گران‌ترین</option>
                  <option value="rating">محبوب‌ترین</option>
                  <option value="offers">بیشترین پیشنهاد</option>
                  <option value="discount">بیشترین تخفیف</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="flex gap-6">
          <Sidebar
            sortBy={sortBy}
            onSortChange={setSortBy}
            priceRange={priceRange}
            onPriceRangeChange={setPriceRange}
            inStockOnly={inStockOnly}
            onInStockChange={setInStockOnly}
          />

          <div className="flex-1">
            {isSearching ? (
              <div className="flex items-center justify-center py-20">
                <div className="animate-spin w-10 h-10 border-4 border-pink-200 border-t-pink-500 rounded-full"></div>
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className={`grid gap-4 ${
                searchQuery || selectedCategory
                  ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'
                  : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'
              }`}>
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onSelect={setSelectedProduct}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 animate-fade-in">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-lg font-bold text-gray-700 mb-2">محصولی یافت نشد</h3>
                <p className="text-sm text-gray-500">
                  لطفاً عبارت دیگری را جستجو کنید یا فیلترها را تغییر دهید
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory(null);
                  }}
                  className="mt-4 bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-xl text-sm transition-colors duration-200"
                >
                  مشاهده همه محصولات
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Features Section */}
        {!searchQuery && !selectedCategory && (
          <div className="mt-12 mb-8">
            <h2 className="text-lg font-bold text-gray-800 mb-6 text-center">
              چرا هوش‌بازار؟
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white rounded-2xl p-6 text-center border border-gray-100 hover:border-pink-200 hover:shadow-md transition-all duration-300">
                <div className="w-14 h-14 bg-pink-50 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <i className="fas fa-search-dollar text-2xl text-pink-500"></i>
                </div>
                <h3 className="font-bold text-gray-800 mb-1">بهترین قیمت</h3>
                <p className="text-xs text-gray-500">مقایسه قیمت از هزاران فروشگاه</p>
              </div>
              <div className="bg-white rounded-2xl p-6 text-center border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all duration-300">
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <i className="fas fa-bell text-2xl text-blue-500"></i>
                </div>
                <h3 className="font-bold text-gray-800 mb-1">هشدار قیمت</h3>
                <p className="text-xs text-gray-500">اطلاع‌رسانی کاهش قیمت محصولات</p>
              </div>
              <div className="bg-white rounded-2xl p-6 text-center border border-gray-100 hover:border-green-200 hover:shadow-md transition-all duration-300">
                <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <i className="fas fa-shield-alt text-2xl text-green-500"></i>
                </div>
                <h3 className="font-bold text-gray-800 mb-1">فروشگاه‌های معتبر</h3>
                <p className="text-xs text-gray-500">تنها فروشگاه‌های تأیید شده</p>
              </div>
              <div className="bg-white rounded-2xl p-6 text-center border border-gray-100 hover:border-amber-200 hover:shadow-md transition-all duration-300">
                <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <i className="fas fa-chart-line text-2xl text-amber-500"></i>
                </div>
                <h3 className="font-bold text-gray-800 mb-1">نمودار قیمت</h3>
                <p className="text-xs text-gray-500">بررسی روند تغییرات قیمت</p>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}

export default App;
