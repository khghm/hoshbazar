import { useState, useMemo } from 'react';
import { Product } from './types';
import { products as initialProducts, categories, formatPrice } from './data/store';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import ProductDetail from './components/ProductDetail';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import {
  Search, SlidersHorizontal, ChevronDown, TrendingUp,
  Shield, Truck, Headphones, Smartphone, Laptop, Home,
  Shirt, Heart, Dumbbell, Book, Wrench, ArrowLeft
} from 'lucide-react';

type Page = 'home' | 'search' | 'product' | 'admin';

const categoryIcons: Record<string, React.ElementType> = {
  smartphone: Smartphone,
  laptop: Laptop,
  home: Home,
  shirt: Shirt,
  heart: Heart,
  dumbbell: Dumbbell,
  book: Book,
  wrench: Wrench,
};

export default function App() {
  const [page, setPage] = useState<Page>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [sortBy, setSortBy] = useState<'popular' | 'cheapest' | 'expensive' | 'rating'>('popular');
  const [allProducts, setAllProducts] = useState<Product[]>(initialProducts);

  const filteredProducts = useMemo(() => {
    let result = [...allProducts];
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
      );
    }
    if (selectedCategory) {
      result = result.filter(p => p.categoryId === selectedCategory);
    }
    switch (sortBy) {
      case 'cheapest': result.sort((a, b) => a.minPrice - b.minPrice); break;
      case 'expensive': result.sort((a, b) => b.minPrice - a.minPrice); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      default: result.sort((a, b) => b.reviewCount - a.reviewCount);
    }
    return result;
  }, [allProducts, searchQuery, selectedCategory, sortBy]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query) setPage('search');
    else setPage('home');
  };

  const handleCategoryClick = (catId: string) => {
    setSelectedCategory(catId);
    setPage('search');
  };

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setPage('product');
  };

  const goHome = () => {
    setPage('home');
    setSearchQuery('');
    setSelectedCategory(null);
    setSelectedProduct(null);
  };

  if (page === 'admin') {
    return <AdminPanel products={allProducts} setProducts={setAllProducts} onBack={() => setPage('home')} />;
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex flex-col">
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearch={handleSearch}
        onAdminClick={() => setPage('admin')}
        onLogoClick={goHome}
      />

      {page === 'home' && (
        <main className="flex-1">
          {/* Hero */}
          <section className="bg-white border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 py-8">
              <div className="text-center mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                  مقایسه قیمت میلیون‌ها محصول
                </h1>
                <p className="text-gray-500 text-sm">
                  بین هزاران فروشگاه معتبر، بهترین قیمت را پیدا کنید
                </p>
              </div>
              {/* Search Bar */}
              <div className="max-w-2xl mx-auto relative">
                <div className="relative">
                  <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="نام محصول، برند یا دسته‌بندی را جستجو کنید..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch(searchQuery)}
                    className="w-full pr-12 pl-4 py-4 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:border-[#e84a4a] focus:bg-white transition-all"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Categories */}
          <section className="max-w-7xl mx-auto px-4 py-8">
            <h2 className="text-lg font-bold text-gray-800 mb-5">دسته‌بندی‌ها</h2>
            <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
              {categories.map((cat) => {
                const Icon = categoryIcons[cat.icon] || Smartphone;
                return (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryClick(cat.id)}
                    className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white border border-gray-100 hover:border-[#e84a4a] hover:shadow-sm transition-all group"
                  >
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center transition-colors"
                      style={{ backgroundColor: cat.color + '15' }}
                    >
                      <Icon className="w-5 h-5" style={{ color: cat.color }} />
                    </div>
                    <span className="text-xs text-gray-700 font-medium text-center leading-tight group-hover:text-[#e84a4a] transition-colors">
                      {cat.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Trust Badges */}
          <section className="max-w-7xl mx-auto px-4 pb-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { icon: Shield, title: 'خرید امن', desc: 'تضمین اصالت کالا' },
                { icon: Truck, title: 'ارسال سریع', desc: 'تحویل اکسپرس' },
                { icon: TrendingUp, title: 'بهترین قیمت', desc: 'مقایسه هوشمند' },
                { icon: Headphones, title: 'پشتیبانی ۲۴/۷', desc: 'همیشه در کنار شما' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-100">
                  <div className="w-10 h-10 rounded-lg bg-[#e84a4a]/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-[#e84a4a]" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-800">{item.title}</p>
                    <p className="text-xs text-gray-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Popular Products */}
          <section className="max-w-7xl mx-auto px-4 pb-12">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-gray-800">محبوب‌ترین محصولات</h2>
              <button
                onClick={() => setPage('search')}
                className="text-sm text-[#e84a4a] font-medium flex items-center gap-1 hover:gap-2 transition-all"
              >
                مشاهده همه
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {allProducts.slice(0, 8).map((product) => (
                <ProductCard key={product.id} product={product} onSelect={handleProductSelect} />
              ))}
            </div>
          </section>
        </main>
      )}

      {page === 'search' && (
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <button onClick={goHome} className="hover:text-[#e84a4a] transition-colors">خانه</button>
            <span>/</span>
            {selectedCategory && (
              <>
                <span>{categories.find(c => c.id === selectedCategory)?.name}</span>
                <span>/</span>
              </>
            )}
            <span className="text-gray-800 font-medium">
              {searchQuery || 'همه محصولات'}
            </span>
          </div>

          {/* Sort & Filter Bar */}
          <div className="bg-white rounded-xl border border-gray-100 p-4 mb-4 flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">
                {filteredProducts.length.toLocaleString('fa-IR')} محصول
              </span>
            </div>
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600 ml-1">مرتب‌سازی:</span>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                  className="appearance-none bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 pr-3 pl-8 text-sm cursor-pointer focus:border-[#e84a4a] transition-colors"
                >
                  <option value="popular">محبوب‌ترین</option>
                  <option value="cheapest">ارزان‌ترین</option>
                  <option value="expensive">گران‌ترین</option>
                  <option value="rating">بیشترین امتیاز</option>
                </select>
                <ChevronDown className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} onSelect={handleProductSelect} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-700 mb-2">محصولی یافت نشد</h3>
              <p className="text-sm text-gray-500">عبارت جستجو یا فیلترها را تغییر دهید</p>
            </div>
          )}
        </main>
      )}

      {page === 'product' && selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onClose={() => setPage(selectedCategory ? 'search' : 'home')}
        />
      )}

      <Footer onAdminClick={() => setPage('admin')} />
    </div>
  );
}
