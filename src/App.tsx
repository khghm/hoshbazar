import { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, ArrowUpDown, Grid3X3, List, ChevronLeft, Smartphone, Laptop, Home, Shirt, Heart, Dumbbell, BookOpen, Wrench, TrendingUp, Star, Shield, ArrowLeft } from 'lucide-react';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import ProductDetail from './components/ProductDetail';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import { products, categories, formatPrice } from './data/store';
import { Product, Page } from './types';

const categoryIcons: Record<string, React.ReactNode> = {
  smartphone: <Smartphone className="w-5 h-5" />,
  laptop: <Laptop className="w-5 h-5" />,
  home: <Home className="w-5 h-5" />,
  shirt: <Shirt className="w-5 h-5" />,
  heart: <Heart className="w-5 h-5" />,
  dumbbell: <Dumbbell className="w-5 h-5" />,
  'book-open': <BookOpen className="w-5 h-5" />,
  wrench: <Wrench className="w-5 h-5" />,
};

export default function App() {
  const [page, setPage] = useState<Page>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'rating' | 'popular'>('popular');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200000000]);
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    // Category filter
    if (selectedCategory) {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Price filter
    result = result.filter(p => p.minPrice >= priceRange[0] && p.minPrice <= priceRange[1]);

    // Sort
    switch (sortBy) {
      case 'price-asc': result.sort((a, b) => a.minPrice - b.minPrice); break;
      case 'price-desc': result.sort((a, b) => b.minPrice - a.minPrice); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      default: result.sort((a, b) => b.reviewCount - a.reviewCount);
    }

    return result;
  }, [searchQuery, selectedCategory, sortBy, priceRange]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query && page === 'home') {
      setPage('search');
    }
    if (!query && page === 'search') {
      setPage('home');
    }
  };

  const handleNavigate = (target: string) => {
    if (target === 'admin') {
      setPage('admin');
    } else if (target === 'home') {
      setPage('home');
      setSearchQuery('');
      setSelectedCategory(null);
      setSelectedProduct(null);
    }
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setPage('product');
  };

  const handleCategoryClick = (catId: string) => {
    setSelectedCategory(catId);
    setPage('search');
  };

  // Admin Panel
  if (page === 'admin') {
    return <AdminPanel onBack={() => setPage('home')} />;
  }

  // Product Detail
  if (page === 'product' && selectedProduct) {
    return (
      <div className="min-h-screen bg-surface-secondary">
        <Header onSearch={handleSearch} onNavigate={handleNavigate} searchQuery={searchQuery} />
        <ProductDetail product={selectedProduct} onBack={() => setPage(selectedCategory ? 'search' : 'home')} />
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-secondary">
      <Header onSearch={handleSearch} onNavigate={handleNavigate} searchQuery={searchQuery} />

      {/* Hero Section - Only on Home */}
      {page === 'home' && !searchQuery && !selectedCategory && (
        <section className="relative overflow-hidden bg-gradient-to-bl from-primary-600 via-primary-700 to-accent-600">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 right-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 left-10 w-96 h-96 bg-accent-500 rounded-full blur-3xl"></div>
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-4">
                بهترین قیمت را
                <br />
                <span className="text-primary-200">هوشمندانه</span> پیدا کنید
              </h2>
              <p className="text-base md:text-lg text-primary-100 leading-8 mb-8">
                مقایسه قیمت از بیش از ۲۸,۰۰۰ محصول در هزاران فروشگاه معتبر. صرفه‌جویی در زمان و هزینه با هوش‌بازار.
              </p>
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2 text-sm text-primary-100">
                  <Shield className="w-4 h-4" />
                  تضمین اصالت
                </div>
                <div className="flex items-center gap-2 text-sm text-primary-100">
                  <TrendingUp className="w-4 h-4" />
                  به‌روزرسانی لحظه‌ای
                </div>
                <div className="flex items-center gap-2 text-sm text-primary-100">
                  <Star className="w-4 h-4" />
                  ۲۸,۰۰۰+ محصول
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Category Navigation - Only on Home */}
      {page === 'home' && !searchQuery && !selectedCategory && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 -mt-8 relative z-10">
          <div className="bg-white rounded-2xl border border-border-light shadow-lg shadow-black/5 p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-sm font-bold text-text-primary">دسته‌بندی‌ها</h3>
              <button className="text-xs text-primary-600 font-medium flex items-center gap-1 hover:gap-2 transition-all">
                مشاهده همه
                <ChevronLeft className="w-3 h-3" />
              </button>
            </div>
            <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.id)}
                  className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-primary-50 transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-surface-tertiary group-hover:bg-primary-100 flex items-center justify-center text-text-muted group-hover:text-primary-600 transition-all">
                    {categoryIcons[cat.icon]}
                  </div>
                  <span className="text-[11px] font-medium text-text-secondary text-center leading-tight">{cat.name}</span>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Search/Category Results */}
      {(page === 'search' || selectedCategory) && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          {/* Category Header */}
          {selectedCategory && (
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => { setSelectedCategory(null); setPage('home'); }}
                  className="p-2 hover:bg-surface-tertiary rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 text-text-secondary" />
                </button>
                <div>
                  <h2 className="text-lg font-bold text-text-primary">
                    {categories.find(c => c.id === selectedCategory)?.name}
                  </h2>
                  <p className="text-xs text-text-muted">{filteredProducts.length} محصول</p>
                </div>
              </div>
            </div>
          )}

          {/* Search Header */}
          {searchQuery && (
            <div className="mb-6">
              <h2 className="text-lg font-bold text-text-primary">
                نتایج جستجو برای «{searchQuery}»
              </h2>
              <p className="text-xs text-text-muted mt-1">{filteredProducts.length} محصول یافت شد</p>
            </div>
          )}

          {/* Toolbar */}
          <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium border transition-all ${
                  showFilters ? 'bg-primary-50 border-primary-200 text-primary-700' : 'bg-white border-border text-text-secondary hover:border-primary-400'
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                فیلترها
              </button>
              <button
                onClick={() => setShowFilters(false)}
                className="md:hidden flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium bg-white border border-border text-text-secondary"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                فیلتر
              </button>
            </div>
            <div className="flex items-center gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="px-3 py-2 bg-white border border-border rounded-lg text-xs text-text-secondary focus:outline-none focus:border-primary-400"
              >
                <option value="popular">محبوب‌ترین</option>
                <option value="price-asc">ارزان‌ترین</option>
                <option value="price-desc">گران‌ترین</option>
                <option value="rating">بالاترین امتیاز</option>
              </select>
            </div>
          </div>

          <div className="flex gap-6">
            {/* Filters Sidebar */}
            {showFilters && (
              <aside className="hidden md:block w-60 shrink-0 animate-fadeIn">
                <div className="bg-white rounded-2xl border border-border-light p-5 sticky top-24 space-y-6">
                  <div>
                    <h4 className="text-xs font-bold text-text-primary mb-3">محدوده قیمت</h4>
                    <div className="space-y-2">
                      <input
                        type="range"
                        min={0}
                        max={200000000}
                        step={1000000}
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                        className="w-full accent-primary-600"
                      />
                      <div className="flex items-center justify-between text-[11px] text-text-muted">
                        <span>۰</span>
                        <span>{formatPrice(priceRange[1])}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-text-primary mb-3">دسته‌بندی</h4>
                    <div className="space-y-2">
                      {categories.map((cat) => (
                        <label key={cat.id} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedCategory === cat.id}
                            onChange={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
                            className="w-3.5 h-3.5 rounded accent-primary-600"
                          />
                          <span className="text-xs text-text-secondary">{cat.name}</span>
                          <span className="text-[10px] text-text-muted mr-auto">{cat.productCount.toLocaleString('fa-IR')}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-text-primary mb-3">برند</h4>
                    <div className="space-y-2">
                      {['Samsung', 'Apple', 'Sony', 'LG', 'Canon'].map((brand) => (
                        <label key={brand} className="flex items-center gap-2 cursor-pointer">
                          <input type="checkbox" className="w-3.5 h-3.5 rounded accent-primary-600" />
                          <span className="text-xs text-text-secondary">{brand}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <button className="w-full py-2.5 bg-primary-600 text-white text-xs font-medium rounded-xl hover:bg-primary-700 transition-all">
                    اعمال فیلتر
                  </button>
                </div>
              </aside>
            )}

            {/* Products Grid */}
            <div className="flex-1">
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} onClick={handleProductClick} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <Search className="w-12 h-12 text-text-muted mx-auto mb-4" />
                  <p className="text-sm text-text-muted">محصولی با این مشخصات یافت نشد</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Home - Trending Products */}
      {page === 'home' && !searchQuery && !selectedCategory && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-text-primary">پربازدیدترین محصولات</h3>
              <p className="text-xs text-text-muted mt-1">محبوب‌ترین‌ها بر اساس تعداد بازدید</p>
            </div>
            <button
              onClick={() => setPage('search')}
              className="text-xs text-primary-600 font-medium flex items-center gap-1 hover:gap-2 transition-all"
            >
              مشاهده همه
              <ChevronLeft className="w-3 h-3" />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} onClick={handleProductClick} />
            ))}
          </div>
        </section>
      )}

      {/* Home - Features */}
      {page === 'home' && !searchQuery && !selectedCategory && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl border border-border-light p-6 text-center card-hover">
              <div className="w-14 h-14 rounded-2xl bg-primary-50 text-primary-600 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-text-primary mb-2">مقایسه هوشمند</h4>
              <p className="text-xs text-text-secondary leading-6">قیمت یک محصول را از صدها فروشگاه معتبر مقایسه کنید و بهترین پیشنهاد را انتخاب نمایید.</p>
            </div>
            <div className="bg-white rounded-2xl border border-border-light p-6 text-center card-hover">
              <div className="w-14 h-14 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-text-primary mb-2">تضمین اصالت</h4>
              <p className="text-xs text-text-secondary leading-6">تمامی فروشگاه‌ها توسط تیم هوش‌بازار بررسی و تأیید شده‌اند. خرید امن و مطمئن.</p>
            </div>
            <div className="bg-white rounded-2xl border border-border-light p-6 text-center card-hover">
              <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-4">
                <Star className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-text-primary mb-2">هشدار قیمت</h4>
              <p className="text-xs text-text-secondary leading-6">روی محصول مورد نظر خود هشدار قیمت تنظیم کنید و از کاهش قیمت مطلع شوید.</p>
            </div>
          </div>
        </section>
      )}

      <Footer />

      {/* Floating Admin Button */}
      <button
        onClick={() => setPage('admin')}
        className="fixed bottom-6 left-6 z-50 flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-primary-700 to-accent-600 text-white text-sm font-medium rounded-2xl shadow-xl shadow-primary-700/30 hover:shadow-2xl hover:shadow-primary-700/40 hover:-translate-y-0.5 transition-all group"
        title="پنل مدیریت"
      >
        <SlidersHorizontal className="w-4 h-4" />
        <span className="hidden sm:inline">پنل مدیریت</span>
      </button>
    </div>
  );
}
