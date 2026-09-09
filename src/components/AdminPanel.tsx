import { useState } from 'react';
import {
  LayoutDashboard, Package, Grid3X3, ShoppingCart, Users, Store,
  Percent, Settings, BarChart3, ArrowRight, Plus, Edit, Trash2,
  Search, Filter, Eye, MoreVertical, TrendingUp, TrendingDown,
  DollarSign, UserPlus, CheckCircle, XCircle, AlertCircle,
  ChevronDown, Download, Upload, Save, X, Bell, LogOut,
  Smartphone, Laptop, Home, Shirt, Heart, Dumbbell, BookOpen, Wrench
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { products as initialProducts, categories, orders, users, dashboardStats, formatPrice, formatNumber } from '../data/store';
import { Product, AdminPage } from '../types';

interface AdminPanelProps {
  onBack: () => void;
}

const revenueData = [
  { month: 'فروردین', revenue: 180, orders: 3200 },
  { month: 'اردیبهشت', revenue: 220, orders: 3800 },
  { month: 'خرداد', revenue: 195, orders: 3500 },
  { month: 'تیر', revenue: 280, orders: 4200 },
  { month: 'مرداد', revenue: 310, orders: 4800 },
  { month: 'شهریور', revenue: 350, orders: 5100 },
  { month: 'مهر', revenue: 290, orders: 4500 },
  { month: 'آبان', revenue: 380, orders: 5600 },
  { month: 'آذر', revenue: 420, orders: 6200 },
  { month: 'دی', revenue: 390, orders: 5800 },
  { month: 'بهمن', revenue: 450, orders: 6800 },
  { month: 'اسفند', revenue: 520, orders: 7500 },
];

const categoryDistribution = [
  { name: 'موبایل', value: 24, color: '#3b82f6' },
  { name: 'لپ‌تاپ', value: 18, color: '#8b5cf6' },
  { name: 'لوازم خانگی', value: 22, color: '#10b981' },
  { name: 'پوشاک', value: 15, color: '#f59e0b' },
  { name: 'زیبایی', value: 12, color: '#ef4444' },
  { name: 'سایر', value: 9, color: '#6b7280' },
];

const weeklyVisits = [
  { day: 'شنبه', visits: 12400 },
  { day: 'یکشنبه', visits: 15200 },
  { day: 'دوشنبه', visits: 14100 },
  { day: 'سه‌شنبه', visits: 16800 },
  { day: 'چهارشنبه', visits: 18200 },
  { day: 'پنجشنبه', visits: 21000 },
  { day: 'جمعه', visits: 19500 },
];

const navItems: { id: AdminPage; label: string; icon: React.ReactNode }[] = [
  { id: 'dashboard', label: 'داشبورد', icon: <LayoutDashboard className="w-4.5 h-4.5" /> },
  { id: 'products', label: 'محصولات', icon: <Package className="w-4.5 h-4.5" /> },
  { id: 'categories', label: 'دسته‌بندی‌ها', icon: <Grid3X3 className="w-4.5 h-4.5" /> },
  { id: 'orders', label: 'سفارشات', icon: <ShoppingCart className="w-4.5 h-4.5" /> },
  { id: 'users', label: 'کاربران', icon: <Users className="w-4.5 h-4.5" /> },
  { id: 'sellers', label: 'فروشندگان', icon: <Store className="w-4.5 h-4.5" /> },
  { id: 'discounts', label: 'تخفیف‌ها', icon: <Percent className="w-4.5 h-4.5" /> },
  { id: 'reports', label: 'گزارش‌ها', icon: <BarChart3 className="w-4.5 h-4.5" /> },
  { id: 'settings', label: 'تنظیمات', icon: <Settings className="w-4.5 h-4.5" /> },
];

export default function AdminPanel({ onBack }: AdminPanelProps) {
  const [activePage, setActivePage] = useState<AdminPage>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [productList, setProductList] = useState<Product[]>(initialProducts);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [notification, setNotification] = useState<string | null>(null);

  const showNotif = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const deleteProduct = (id: string) => {
    setProductList(prev => prev.filter(p => p.id !== id));
    showNotif('محصول با موفقیت حذف شد');
  };

  const toggleProductStatus = (id: string) => {
    setProductList(prev => prev.map(p => p.id === id ? { ...p, isActive: !p.isActive } : p));
    showNotif('وضعیت محصول تغییر کرد');
  };

  const filteredProducts = productList.filter(p =>
    p.title.includes(searchTerm) || p.brand.includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-surface-secondary flex" dir="rtl">
      {/* Notification */}
      {notification && (
        <div className="fixed top-4 left-4 z-[100] animate-scaleIn">
          <div className="flex items-center gap-2 px-4 py-3 bg-success text-white text-sm font-medium rounded-xl shadow-lg">
            <CheckCircle className="w-4 h-4" />
            {notification}
          </div>
        </div>
      )}

      {/* Sidebar */}
      <aside className={`${sidebarCollapsed ? 'w-16' : 'w-60'} bg-white border-l border-border-light flex flex-col transition-all duration-300 fixed h-full z-40`}>
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-border-light">
          {!sidebarCollapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-600 to-accent-600 flex items-center justify-center">
                <span className="text-white font-bold text-xs">HB</span>
              </div>
              <span className="text-sm font-bold text-text-primary">پنل مدیریت</span>
            </div>
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-1.5 hover:bg-surface-tertiary rounded-lg transition-colors"
          >
            <ArrowRight className={`w-4 h-4 text-text-muted transition-transform ${sidebarCollapsed ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activePage === item.id
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-text-secondary hover:bg-surface-tertiary hover:text-text-primary'
              }`}
            >
              <span className={activePage === item.id ? 'text-primary-600' : 'text-text-muted'}>{item.icon}</span>
              {!sidebarCollapsed && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-border-light">
          <button
            onClick={onBack}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-text-secondary hover:bg-surface-tertiary transition-all"
          >
            <ArrowRight className="w-4 h-4 text-text-muted" />
            {!sidebarCollapsed && <span>بازگشت به سایت</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 ${sidebarCollapsed ? 'mr-16' : 'mr-60'} transition-all duration-300`}>
        {/* Top Bar */}
        <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-lg border-b border-border-light h-16 flex items-center justify-between px-6">
          <div>
            <h1 className="text-lg font-bold text-text-primary">
              {navItems.find(n => n.id === activePage)?.label}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 hover:bg-surface-tertiary rounded-lg transition-colors">
              <Bell className="w-5 h-5 text-text-secondary" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-danger rounded-full"></span>
            </button>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-surface-tertiary rounded-lg">
              <div className="w-7 h-7 rounded-full bg-primary-600 flex items-center justify-center">
                <span className="text-white text-xs font-bold">م</span>
              </div>
              <span className="text-sm font-medium text-text-primary">مدیر سیستم</span>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-6">
          {activePage === 'dashboard' && <DashboardPage />}
          {activePage === 'products' && (
            <ProductsPage
              products={filteredProducts}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              onAdd={() => setShowAddProduct(true)}
              onEdit={(p) => setEditingProduct(p)}
              onDelete={deleteProduct}
              onToggleStatus={toggleProductStatus}
            />
          )}
          {activePage === 'categories' && <CategoriesPage />}
          {activePage === 'orders' && <OrdersPage />}
          {activePage === 'users' && <UsersPage />}
          {activePage === 'sellers' && <SellersPage />}
          {activePage === 'discounts' && <DiscountsPage />}
          {activePage === 'reports' && <ReportsPage />}
          {activePage === 'settings' && <SettingsPage onNotify={showNotif} />}
        </div>
      </main>

      {/* Add/Edit Product Modal */}
      {(showAddProduct || editingProduct) && (
        <ProductModal
          product={editingProduct}
          onClose={() => { setShowAddProduct(false); setEditingProduct(null); }}
          onSave={(product) => {
            if (editingProduct) {
              setProductList(prev => prev.map(p => p.id === product.id ? product : p));
              showNotif('محصول با موفقیت ویرایش شد');
            } else {
              setProductList(prev => [product, ...prev]);
              showNotif('محصول جدید با موفقیت اضافه شد');
            }
            setShowAddProduct(false);
            setEditingProduct(null);
          }}
        />
      )}
    </div>
  );
}

// =================== Dashboard Page ===================
function DashboardPage() {
  const stats = [
    { label: 'کل محصولات', value: formatNumber(dashboardStats.totalProducts), growth: dashboardStats.productsGrowth, icon: <Package className="w-5 h-5" />, color: 'bg-blue-50 text-blue-600' },
    { label: 'کاربران فعال', value: formatNumber(dashboardStats.totalUsers), growth: dashboardStats.usersGrowth, icon: <Users className="w-5 h-5" />, color: 'bg-purple-50 text-purple-600' },
    { label: 'سفارشات', value: formatNumber(dashboardStats.totalOrders), growth: dashboardStats.ordersGrowth, icon: <ShoppingCart className="w-5 h-5" />, color: 'bg-green-50 text-green-600' },
    { label: 'درآمد ماهانه', value: formatNumber(dashboardStats.totalRevenue) + ' ت', growth: dashboardStats.revenueGrowth, icon: <DollarSign className="w-5 h-5" />, color: 'bg-amber-50 text-amber-600' },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white rounded-2xl border border-border-light p-5 card-hover">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center`}>
                {stat.icon}
              </div>
              <div className={`flex items-center gap-1 text-xs font-medium ${stat.growth > 0 ? 'text-success' : 'text-danger'}`}>
                {stat.growth > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {stat.growth}%
              </div>
            </div>
            <p className="text-2xl font-bold text-text-primary">{stat.value}</p>
            <p className="text-xs text-text-muted mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-border-light p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-bold text-text-primary">درآمد ماهانه (میلیارد تومان)</h3>
            <select className="text-xs border border-border rounded-lg px-3 py-1.5 text-text-secondary focus:outline-none focus:border-primary-400">
              <option>۱۴۰۳</option>
              <option>۱۴۰۲</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} />
              <Tooltip
                contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '12px' }}
              />
              <Area type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} fill="url(#colorRevenue)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Category Distribution */}
        <div className="bg-white rounded-2xl border border-border-light p-6">
          <h3 className="text-sm font-bold text-text-primary mb-6">توزیع دسته‌بندی‌ها</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={categoryDistribution} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={3} dataKey="value">
                {categoryDistribution.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '12px' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {categoryDistribution.map((cat, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }}></div>
                <span className="text-[11px] text-text-secondary">{cat.name} ({cat.value}%)</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Visits */}
        <div className="bg-white rounded-2xl border border-border-light p-6">
          <h3 className="text-sm font-bold text-text-primary mb-6">بازدید هفتگی</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={weeklyVisits}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#94a3b8' }} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '12px' }} />
              <Bar dataKey="visits" fill="#8b5cf6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-2xl border border-border-light p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-text-primary">سفارشات اخیر</h3>
            <button className="text-xs text-primary-600 font-medium">مشاهده همه</button>
          </div>
          <div className="space-y-3">
            {orders.slice(0, 5).map((order) => (
              <div key={order.id} className="flex items-center justify-between py-2 border-b border-border-light last:border-0">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    order.status === 'delivered' ? 'bg-green-50 text-green-600' :
                    order.status === 'shipped' ? 'bg-blue-50 text-blue-600' :
                    order.status === 'processing' ? 'bg-amber-50 text-amber-600' :
                    order.status === 'cancelled' ? 'bg-red-50 text-red-600' :
                    'bg-gray-50 text-gray-600'
                  }`}>
                    {order.status === 'delivered' ? <CheckCircle className="w-4 h-4" /> :
                     order.status === 'shipped' ? <ShoppingCart className="w-4 h-4" /> :
                     order.status === 'processing' ? <Package className="w-4 h-4" /> :
                     order.status === 'cancelled' ? <XCircle className="w-4 h-4" /> :
                     <AlertCircle className="w-4 h-4" />}
                  </div>
                  <div>
                    <p className="text-xs font-medium text-text-primary">{order.productTitle}</p>
                    <p className="text-[11px] text-text-muted">{order.customerName}</p>
                  </div>
                </div>
                <span className="text-xs font-medium text-text-primary">{formatPrice(order.price)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// =================== Products Page ===================
function ProductsPage({ products, searchTerm, setSearchTerm, onAdd, onEdit, onDelete, onToggleStatus }: {
  products: Product[];
  searchTerm: string;
  setSearchTerm: (s: string) => void;
  onAdd: () => void;
  onEdit: (p: Product) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string) => void;
}) {
  return (
    <div className="space-y-4 animate-fadeIn">
      {/* Actions Bar */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3 flex-1">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="جستجوی محصول..."
              className="w-full pr-10 pl-4 py-2.5 bg-white border border-border rounded-xl text-sm focus:outline-none focus:border-primary-400"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-border rounded-xl text-sm text-text-secondary hover:border-primary-400 transition-colors">
            <Filter className="w-4 h-4" />
            فیلتر
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-border rounded-xl text-sm text-text-secondary hover:border-primary-400 transition-colors">
            <Download className="w-4 h-4" />
            خروجی
          </button>
          <button
            onClick={onAdd}
            className="flex items-center gap-2 px-4 py-2.5 bg-primary-600 text-white text-sm font-medium rounded-xl hover:bg-primary-700 transition-all shadow-sm"
          >
            <Plus className="w-4 h-4" />
            محصول جدید
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-border-light overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-surface-secondary border-b border-border-light">
                <th className="text-right text-xs font-semibold text-text-muted py-3 px-4">محصول</th>
                <th className="text-right text-xs font-semibold text-text-muted py-3 px-4">دسته‌بندی</th>
                <th className="text-right text-xs font-semibold text-text-muted py-3 px-4">قیمت</th>
                <th className="text-right text-xs font-semibold text-text-muted py-3 px-4">فروشندگان</th>
                <th className="text-right text-xs font-semibold text-text-muted py-3 px-4">وضعیت</th>
                <th className="text-right text-xs font-semibold text-text-muted py-3 px-4">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-border-light last:border-0 hover:bg-surface-secondary/50 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img src={product.image} alt="" className="w-10 h-10 rounded-lg object-cover" />
                      <div>
                        <p className="text-sm font-medium text-text-primary line-clamp-1">{product.title}</p>
                        <p className="text-[11px] text-text-muted">{product.brand}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-xs text-text-secondary bg-surface-tertiary px-2 py-1 rounded-md">{product.subcategory}</span>
                  </td>
                  <td className="py-3 px-4">
                    <p className="text-sm font-medium text-text-primary">{formatPrice(product.minPrice)}</p>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-sm text-text-secondary">{product.sellers.length}</span>
                  </td>
                  <td className="py-3 px-4">
                    <button onClick={() => onToggleStatus(product.id)}>
                      <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-md ${
                        product.isActive ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                      }`}>
                        {product.isActive ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                        {product.isActive ? 'فعال' : 'غیرفعال'}
                      </span>
                    </button>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1">
                      <button onClick={() => onEdit(product)} className="p-1.5 hover:bg-primary-50 rounded-lg transition-colors text-text-muted hover:text-primary-600">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button onClick={() => onDelete(product.id)} className="p-1.5 hover:bg-red-50 rounded-lg transition-colors text-text-muted hover:text-danger">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {products.length === 0 && (
          <div className="py-12 text-center">
            <Package className="w-10 h-10 text-text-muted mx-auto mb-3" />
            <p className="text-sm text-text-muted">محصولی یافت نشد</p>
          </div>
        )}
      </div>
    </div>
  );
}

// =================== Categories Page ===================
function CategoriesPage() {
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

  return (
    <div className="space-y-4 animate-fadeIn">
      <div className="flex items-center justify-between">
        <p className="text-sm text-text-muted">{categories.length} دسته‌بندی فعال</p>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-primary-600 text-white text-sm font-medium rounded-xl hover:bg-primary-700 transition-all">
          <Plus className="w-4 h-4" />
          دسته‌بندی جدید
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => (
          <div key={cat.id} className="bg-white rounded-2xl border border-border-light p-5 card-hover">
            <div className="flex items-start justify-between mb-4">
              <div className="w-11 h-11 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center">
                {categoryIcons[cat.icon] || <Grid3X3 className="w-5 h-5" />}
              </div>
              <div className="flex items-center gap-1">
                <button className="p-1.5 hover:bg-surface-tertiary rounded-lg text-text-muted hover:text-primary-600 transition-colors">
                  <Edit className="w-3.5 h-3.5" />
                </button>
                <button className="p-1.5 hover:bg-surface-tertiary rounded-lg text-text-muted hover:text-danger transition-colors">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
            <h3 className="text-sm font-bold text-text-primary mb-1">{cat.name}</h3>
            <p className="text-xs text-text-muted mb-3">{cat.productCount.toLocaleString('fa-IR')} محصول</p>
            <div className="flex flex-wrap gap-1.5">
              {cat.subcategories.slice(0, 3).map((sub) => (
                <span key={sub} className="text-[11px] text-text-secondary bg-surface-tertiary px-2 py-0.5 rounded-md">{sub}</span>
              ))}
              {cat.subcategories.length > 3 && (
                <span className="text-[11px] text-primary-600 font-medium">+{cat.subcategories.length - 3}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// =================== Orders Page ===================
function OrdersPage() {
  const [filter, setFilter] = useState<string>('all');
  const statusLabels: Record<string, { label: string; color: string }> = {
    pending: { label: 'در انتظار', color: 'bg-gray-100 text-gray-700' },
    processing: { label: 'در حال پردازش', color: 'bg-amber-100 text-amber-700' },
    shipped: { label: 'ارسال شده', color: 'bg-blue-100 text-blue-700' },
    delivered: { label: 'تحویل شده', color: 'bg-green-100 text-green-700' },
    cancelled: { label: 'لغو شده', color: 'bg-red-100 text-red-700' },
  };

  const filtered = filter === 'all' ? orders : orders.filter(o => o.status === filter);

  return (
    <div className="space-y-4 animate-fadeIn">
      <div className="flex items-center gap-2 flex-wrap">
        {[
          { id: 'all', label: 'همه' },
          { id: 'pending', label: 'در انتظار' },
          { id: 'processing', label: 'در حال پردازش' },
          { id: 'shipped', label: 'ارسال شده' },
          { id: 'delivered', label: 'تحویل شده' },
          { id: 'cancelled', label: 'لغو شده' },
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
              filter === f.id ? 'bg-primary-600 text-white' : 'bg-white border border-border text-text-secondary hover:border-primary-400'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>
      <div className="bg-white rounded-2xl border border-border-light overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-surface-secondary border-b border-border-light">
                <th className="text-right text-xs font-semibold text-text-muted py-3 px-4">شناسه</th>
                <th className="text-right text-xs font-semibold text-text-muted py-3 px-4">محصول</th>
                <th className="text-right text-xs font-semibold text-text-muted py-3 px-4">مشتری</th>
                <th className="text-right text-xs font-semibold text-text-muted py-3 px-4">فروشنده</th>
                <th className="text-right text-xs font-semibold text-text-muted py-3 px-4">مبلغ</th>
                <th className="text-right text-xs font-semibold text-text-muted py-3 px-4">وضعیت</th>
                <th className="text-right text-xs font-semibold text-text-muted py-3 px-4">تاریخ</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((order) => (
                <tr key={order.id} className="border-b border-border-light last:border-0 hover:bg-surface-secondary/50">
                  <td className="py-3 px-4 text-xs font-mono text-text-secondary">{order.id}</td>
                  <td className="py-3 px-4 text-sm font-medium text-text-primary">{order.productTitle}</td>
                  <td className="py-3 px-4 text-sm text-text-secondary">{order.customerName}</td>
                  <td className="py-3 px-4 text-sm text-text-secondary">{order.sellerName}</td>
                  <td className="py-3 px-4 text-sm font-medium text-text-primary">{formatPrice(order.price)}</td>
                  <td className="py-3 px-4">
                    <span className={`text-xs font-medium px-2 py-1 rounded-md ${statusLabels[order.status].color}`}>
                      {statusLabels[order.status].label}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-xs text-text-muted">{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// =================== Users Page ===================
function UsersPage() {
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const filtered = roleFilter === 'all' ? users : users.filter(u => u.role === roleFilter);
  const roleLabels: Record<string, { label: string; color: string }> = {
    admin: { label: 'مدیر', color: 'bg-purple-100 text-purple-700' },
    seller: { label: 'فروشنده', color: 'bg-blue-100 text-blue-700' },
    user: { label: 'کاربر', color: 'bg-gray-100 text-gray-700' },
  };

  return (
    <div className="space-y-4 animate-fadeIn">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2">
          {[
            { id: 'all', label: 'همه' },
            { id: 'admin', label: 'مدیران' },
            { id: 'seller', label: 'فروشندگان' },
            { id: 'user', label: 'کاربران' },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setRoleFilter(f.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                roleFilter === f.id ? 'bg-primary-600 text-white' : 'bg-white border border-border text-text-secondary hover:border-primary-400'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-primary-600 text-white text-sm font-medium rounded-xl hover:bg-primary-700">
          <UserPlus className="w-4 h-4" />
          کاربر جدید
        </button>
      </div>
      <div className="bg-white rounded-2xl border border-border-light overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-surface-secondary border-b border-border-light">
                <th className="text-right text-xs font-semibold text-text-muted py-3 px-4">کاربر</th>
                <th className="text-right text-xs font-semibold text-text-muted py-3 px-4">ایمیل</th>
                <th className="text-right text-xs font-semibold text-text-muted py-3 px-4">نقش</th>
                <th className="text-right text-xs font-semibold text-text-muted py-3 px-4">تاریخ عضویت</th>
                <th className="text-right text-xs font-semibold text-text-muted py-3 px-4">آخرین فعالیت</th>
                <th className="text-right text-xs font-semibold text-text-muted py-3 px-4">وضعیت</th>
                <th className="text-right text-xs font-semibold text-text-muted py-3 px-4">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((user) => (
                <tr key={user.id} className="border-b border-border-light last:border-0 hover:bg-surface-secondary/50">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-xs font-bold">
                        {user.name.charAt(0)}
                      </div>
                      <span className="text-sm font-medium text-text-primary">{user.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-text-secondary">{user.email}</td>
                  <td className="py-3 px-4">
                    <span className={`text-xs font-medium px-2 py-1 rounded-md ${roleLabels[user.role].color}`}>
                      {roleLabels[user.role].label}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-xs text-text-muted">{user.joinDate}</td>
                  <td className="py-3 px-4 text-xs text-text-muted">{user.lastActive}</td>
                  <td className="py-3 px-4">
                    <span className={`text-xs font-medium px-2 py-1 rounded-md ${
                      user.status === 'active' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                    }`}>
                      {user.status === 'active' ? 'فعال' : 'غیرفعال'}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1">
                      <button className="p-1.5 hover:bg-primary-50 rounded-lg text-text-muted hover:text-primary-600 transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 hover:bg-surface-tertiary rounded-lg text-text-muted hover:text-primary-600 transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// =================== Sellers Page ===================
function SellersPage() {
  const sellers = [
    { id: 1, name: 'دیجی‌کالا', products: 12500, orders: 8900, rating: 4.8, status: 'active', commission: 5 },
    { id: 2, name: 'تکنولایف', products: 8200, orders: 5400, rating: 4.5, status: 'active', commission: 4.5 },
    { id: 3, name: 'موبایل‌کالا', products: 3400, orders: 2100, rating: 4.3, status: 'active', commission: 5 },
    { id: 4, name: 'اپل‌استور', products: 1800, orders: 1200, rating: 4.7, status: 'active', commission: 6 },
    { id: 5, name: 'سونی‌استور', products: 950, orders: 680, rating: 4.6, status: 'inactive', commission: 5.5 },
    { id: 6, name: 'ال‌جی‌شاپ', products: 2200, orders: 1500, rating: 4.5, status: 'active', commission: 4 },
  ];

  return (
    <div className="space-y-4 animate-fadeIn">
      <div className="flex items-center justify-between">
        <p className="text-sm text-text-muted">{sellers.length} فروشنده ثبت‌شده</p>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-primary-600 text-white text-sm font-medium rounded-xl hover:bg-primary-700">
          <Plus className="w-4 h-4" />
          فروشنده جدید
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sellers.map((seller) => (
          <div key={seller.id} className="bg-white rounded-2xl border border-border-light p-5 card-hover">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-surface-tertiary flex items-center justify-center">
                  <Store className="w-5 h-5 text-text-muted" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-text-primary">{seller.name}</h3>
                  <span className={`text-[11px] font-medium ${seller.status === 'active' ? 'text-success' : 'text-danger'}`}>
                    {seller.status === 'active' ? 'فعال' : 'غیرفعال'}
                  </span>
                </div>
              </div>
              <button className="p-1.5 hover:bg-surface-tertiary rounded-lg text-text-muted">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center p-2 bg-surface-secondary rounded-lg">
                <p className="text-sm font-bold text-text-primary">{seller.products.toLocaleString('fa-IR')}</p>
                <p className="text-[10px] text-text-muted">محصول</p>
              </div>
              <div className="text-center p-2 bg-surface-secondary rounded-lg">
                <p className="text-sm font-bold text-text-primary">{seller.orders.toLocaleString('fa-IR')}</p>
                <p className="text-[10px] text-text-muted">سفارش</p>
              </div>
              <div className="text-center p-2 bg-surface-secondary rounded-lg">
                <p className="text-sm font-bold text-text-primary">{seller.commission}%</p>
                <p className="text-[10px] text-text-muted">کمیسیون</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// =================== Discounts Page ===================
function DiscountsPage() {
  const discounts = [
    { id: 1, code: 'WELCOME10', type: 'percent', value: 10, minOrder: 500000, maxDiscount: 100000, usage: 245, maxUsage: 1000, expires: '1403/04/01', status: 'active' },
    { id: 2, code: 'SUMMER20', type: 'percent', value: 20, minOrder: 1000000, maxDiscount: 500000, usage: 89, maxUsage: 500, expires: '1403/05/31', status: 'active' },
    { id: 3, code: 'FIXED50', type: 'fixed', value: 50000, minOrder: 300000, maxDiscount: 50000, usage: 500, maxUsage: 500, expires: '1403/03/15', status: 'expired' },
    { id: 4, code: 'VIP30', type: 'percent', value: 30, minOrder: 2000000, maxDiscount: 1000000, usage: 12, maxUsage: 100, expires: '1403/06/30', status: 'active' },
  ];

  return (
    <div className="space-y-4 animate-fadeIn">
      <div className="flex items-center justify-between">
        <p className="text-sm text-text-muted">{discounts.filter(d => d.status === 'active').length} کد تخفیف فعال</p>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-primary-600 text-white text-sm font-medium rounded-xl hover:bg-primary-700">
          <Plus className="w-4 h-4" />
          کد تخفیف جدید
        </button>
      </div>
      <div className="bg-white rounded-2xl border border-border-light overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-surface-secondary border-b border-border-light">
                <th className="text-right text-xs font-semibold text-text-muted py-3 px-4">کد</th>
                <th className="text-right text-xs font-semibold text-text-muted py-3 px-4">نوع</th>
                <th className="text-right text-xs font-semibold text-text-muted py-3 px-4">مقدار</th>
                <th className="text-right text-xs font-semibold text-text-muted py-3 px-4">استفاده</th>
                <th className="text-right text-xs font-semibold text-text-muted py-3 px-4">انقضا</th>
                <th className="text-right text-xs font-semibold text-text-muted py-3 px-4">وضعیت</th>
                <th className="text-right text-xs font-semibold text-text-muted py-3 px-4">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {discounts.map((d) => (
                <tr key={d.id} className="border-b border-border-light last:border-0 hover:bg-surface-secondary/50">
                  <td className="py-3 px-4">
                    <span className="text-xs font-mono bg-primary-50 text-primary-700 px-2 py-1 rounded-md font-medium">{d.code}</span>
                  </td>
                  <td className="py-3 px-4 text-xs text-text-secondary">{d.type === 'percent' ? 'درصدی' : 'مبلغ ثابت'}</td>
                  <td className="py-3 px-4 text-sm font-medium text-text-primary">
                    {d.type === 'percent' ? `${d.value}%` : formatPrice(d.value)}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-surface-tertiary rounded-full overflow-hidden">
                        <div className="h-full bg-primary-500 rounded-full" style={{ width: `${(d.usage / d.maxUsage) * 100}%` }}></div>
                      </div>
                      <span className="text-[11px] text-text-muted">{d.usage}/{d.maxUsage}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-xs text-text-muted">{d.expires}</td>
                  <td className="py-3 px-4">
                    <span className={`text-xs font-medium px-2 py-1 rounded-md ${
                      d.status === 'active' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                    }`}>
                      {d.status === 'active' ? 'فعال' : 'منقضی'}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1">
                      <button className="p-1.5 hover:bg-primary-50 rounded-lg text-text-muted hover:text-primary-600 transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 hover:bg-red-50 rounded-lg text-text-muted hover:text-danger transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// =================== Reports Page ===================
function ReportsPage() {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-border-light p-5">
          <p className="text-xs text-text-muted mb-1">میانگین سبد خرید</p>
          <p className="text-xl font-bold text-text-primary">۲,۸۵۰,۰۰۰ تومان</p>
          <p className="text-xs text-success mt-1">+۱۲% نسبت به ماه قبل</p>
        </div>
        <div className="bg-white rounded-2xl border border-border-light p-5">
          <p className="text-xs text-text-muted mb-1">نرخ تبدیل</p>
          <p className="text-xl font-bold text-text-primary">۳.۸%</p>
          <p className="text-xs text-success mt-1">+۰.۵% نسبت به ماه قبل</p>
        </div>
        <div className="bg-white rounded-2xl border border-border-light p-5">
          <p className="text-xs text-text-muted mb-1">رضایت مشتریان</p>
          <p className="text-xl font-bold text-text-primary">۹۲%</p>
          <p className="text-xs text-success mt-1">+۳% نسبت به ماه قبل</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-border-light p-6">
        <h3 className="text-sm font-bold text-text-primary mb-6">روند سفارشات ماهانه</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} />
            <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} />
            <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '12px' }} />
            <Legend />
            <Line type="monotone" dataKey="orders" stroke="#3b82f6" strokeWidth={2} name="سفارشات" dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center gap-3">
        <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-border rounded-xl text-sm text-text-secondary hover:border-primary-400 transition-colors">
          <Download className="w-4 h-4" />
          دانلود گزارش PDF
        </button>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-border rounded-xl text-sm text-text-secondary hover:border-primary-400 transition-colors">
          <Download className="w-4 h-4" />
          خروجی Excel
        </button>
      </div>
    </div>
  );
}

// =================== Settings Page ===================
function SettingsPage({ onNotify }: { onNotify: (msg: string) => void }) {
  const [siteName, setSiteName] = useState('هوش‌بازار');
  const [siteDesc, setSiteDesc] = useState('مقایسه هوشمند قیمت از هزاران فروشگاه معتبر');
  const [supportEmail, setSupportEmail] = useState('info@hooshbazar.ir');
  const [commission, setCommission] = useState('5');
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [emailNotif, setEmailNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(true);

  return (
    <div className="space-y-6 animate-fadeIn max-w-3xl">
      {/* General */}
      <div className="bg-white rounded-2xl border border-border-light p-6">
        <h3 className="text-sm font-bold text-text-primary mb-4">تنظیمات عمومی</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-text-secondary mb-1.5">نام سایت</label>
            <input type="text" value={siteName} onChange={(e) => setSiteName(e.target.value)} className="w-full px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:border-primary-400" />
          </div>
          <div>
            <label className="block text-xs font-medium text-text-secondary mb-1.5">توضیحات سایت</label>
            <textarea value={siteDesc} onChange={(e) => setSiteDesc(e.target.value)} rows={3} className="w-full px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:border-primary-400 resize-none" />
          </div>
          <div>
            <label className="block text-xs font-medium text-text-secondary mb-1.5">ایمیل پشتیبانی</label>
            <input type="email" value={supportEmail} onChange={(e) => setSupportEmail(e.target.value)} className="w-full px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:border-primary-400" />
          </div>
        </div>
      </div>

      {/* Financial */}
      <div className="bg-white rounded-2xl border border-border-light p-6">
        <h3 className="text-sm font-bold text-text-primary mb-4">تنظیمات مالی</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-text-secondary mb-1.5">کمیسیون پیش‌فرض (%)</label>
            <input type="number" value={commission} onChange={(e) => setCommission(e.target.value)} className="w-full px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:border-primary-400" />
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-2xl border border-border-light p-6">
        <h3 className="text-sm font-bold text-text-primary mb-4">اعلان‌ها</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text-primary">اعلان‌های ایمیلی</p>
              <p className="text-xs text-text-muted">دریافت اعلان از طریق ایمیل</p>
            </div>
            <button onClick={() => setEmailNotif(!emailNotif)} className={`w-11 h-6 rounded-full transition-all ${emailNotif ? 'bg-primary-600' : 'bg-gray-300'}`}>
              <div className={`w-4 h-4 bg-white rounded-full shadow transition-transform mx-1 ${emailNotif ? '-translate-x-5' : 'translate-x-0'}`}></div>
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text-primary">اعلان‌های پیامکی</p>
              <p className="text-xs text-text-muted">دریافت اعلان از طریق پیامک</p>
            </div>
            <button onClick={() => setSmsNotif(!smsNotif)} className={`w-11 h-6 rounded-full transition-all ${smsNotif ? 'bg-primary-600' : 'bg-gray-300'}`}>
              <div className={`w-4 h-4 bg-white rounded-full shadow transition-transform mx-1 ${smsNotif ? '-translate-x-5' : 'translate-x-0'}`}></div>
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text-primary">حالت تعمیر و نگهداری</p>
              <p className="text-xs text-text-muted">غیرفعال‌سازی موقت سایت</p>
            </div>
            <button onClick={() => setMaintenanceMode(!maintenanceMode)} className={`w-11 h-6 rounded-full transition-all ${maintenanceMode ? 'bg-danger' : 'bg-gray-300'}`}>
              <div className={`w-4 h-4 bg-white rounded-full shadow transition-transform mx-1 ${maintenanceMode ? '-translate-x-5' : 'translate-x-0'}`}></div>
            </button>
          </div>
        </div>
      </div>

      <button
        onClick={() => onNotify('تنظیمات با موفقیت ذخیره شد')}
        className="flex items-center gap-2 px-6 py-2.5 bg-primary-600 text-white text-sm font-medium rounded-xl hover:bg-primary-700 transition-all shadow-sm"
      >
        <Save className="w-4 h-4" />
        ذخیره تنظیمات
      </button>
    </div>
  );
}

// =================== Product Modal ===================
function ProductModal({ product, onClose, onSave }: { product: Product | null; onClose: () => void; onSave: (p: Product) => void }) {
  const [title, setTitle] = useState(product?.title || '');
  const [brand, setBrand] = useState(product?.brand || '');
  const [category, setCategory] = useState(product?.category || 'mobile');
  const [price, setPrice] = useState(product?.minPrice?.toString() || '');
  const [description, setDescription] = useState(product?.description || '');
  const [imageUrl, setImageUrl] = useState(product?.image || '');

  const handleSave = () => {
    const newProduct: Product = {
      id: product?.id || `p${Date.now()}`,
      title,
      brand,
      category,
      subcategory: categories.find(c => c.id === category)?.subcategories[0] || '',
      image: imageUrl || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
      images: [imageUrl || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop'],
      minPrice: parseInt(price) || 0,
      maxPrice: parseInt(price) || 0,
      avgPrice: parseInt(price) || 0,
      sellers: product?.sellers || [],
      rating: product?.rating || 0,
      reviewCount: product?.reviewCount || 0,
      specs: product?.specs || {},
      description,
      tags: product?.tags || [],
      createdAt: product?.createdAt || new Date().toISOString().split('T')[0],
      isActive: product?.isActive ?? true,
    };
    onSave(newProduct);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl animate-scaleIn">
        <div className="sticky top-0 bg-white border-b border-border-light px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-base font-bold text-text-primary">{product ? 'ویرایش محصول' : 'افزودن محصول جدید'}</h2>
          <button onClick={onClose} className="p-1.5 hover:bg-surface-tertiary rounded-lg text-text-muted">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-medium text-text-secondary mb-1.5">عنوان محصول</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:border-primary-400" placeholder="نام محصول را وارد کنید" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-text-secondary mb-1.5">برند</label>
              <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} className="w-full px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:border-primary-400" placeholder="برند" />
            </div>
            <div>
              <label className="block text-xs font-medium text-text-secondary mb-1.5">دسته‌بندی</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:border-primary-400">
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-text-secondary mb-1.5">قیمت (تومان)</label>
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:border-primary-400" placeholder="قیمت" />
          </div>
          <div>
            <label className="block text-xs font-medium text-text-secondary mb-1.5">آدرس تصویر</label>
            <input type="url" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="w-full px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:border-primary-400" placeholder="https://..." />
          </div>
          <div>
            <label className="block text-xs font-medium text-text-secondary mb-1.5">توضیحات</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="w-full px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:border-primary-400 resize-none" placeholder="توضیحات محصول..." />
          </div>
        </div>
        <div className="sticky bottom-0 bg-white border-t border-border-light px-6 py-4 flex items-center justify-end gap-3 rounded-b-2xl">
          <button onClick={onClose} className="px-4 py-2.5 text-sm text-text-secondary border border-border rounded-xl hover:bg-surface-tertiary transition-colors">انصراف</button>
          <button onClick={handleSave} className="flex items-center gap-2 px-5 py-2.5 bg-primary-600 text-white text-sm font-medium rounded-xl hover:bg-primary-700 transition-all">
            <Save className="w-4 h-4" />
            {product ? 'ذخیره تغییرات' : 'افزودن محصول'}
          </button>
        </div>
      </div>
    </div>
  );
}
