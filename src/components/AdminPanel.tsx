import { useState, useMemo } from 'react';
import { Product, Category, Order, User, AdminTab } from '../types';
import { categories as initialCategories, orders as initialOrders, users as initialUsers, dashboardStats, formatPrice } from '../data/store';
import {
  ArrowRight, LayoutDashboard, Package, FolderTree, ShoppingCart, Users, Store,
  Percent, BarChart3, Settings, X, Plus, Edit2, Trash2, Search, Filter,
  ChevronDown, ChevronRight, Eye, Check, AlertCircle, TrendingUp, TrendingDown, DollarSign,
  Activity, ArrowUpRight, MoreVertical, Save, Download, RefreshCw, Bell,
  LogOut, Menu, ChevronLeft, Calendar, Tag, Star, Shield, Zap
} from 'lucide-react';

interface AdminPanelProps {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  onBack: () => void;
}

export default function AdminPanel({ products, setProducts, onBack }: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [allUsers, setAllUsers] = useState<User[]>(initialUsers);
  const [notifications, setNotifications] = useState([
    { id: '1', text: 'سفارش جدید ORD-1009 ثبت شد', time: '2 دقیقه پیش', read: false },
    { id: '2', text: 'کاربر جدید ثبت‌نام کرد', time: '15 دقیقه پیش', read: false },
    { id: '3', text: 'موجودی Galaxy S24 Ultra کم شده', time: '1 ساعت پیش', read: true },
  ]);
  const [showNotifications, setShowNotifications] = useState(false);

  // Modals
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [showUserForm, setShowUserForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{ type: string; id: string } | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const tabs: { id: AdminTab; label: string; icon: React.ElementType }[] = [
    { id: 'dashboard', label: 'داشبورد', icon: LayoutDashboard },
    { id: 'products', label: 'محصولات', icon: Package },
    { id: 'categories', label: 'دسته‌بندی‌ها', icon: FolderTree },
    { id: 'orders', label: 'سفارشات', icon: ShoppingCart },
    { id: 'users', label: 'کاربران', icon: Users },
    { id: 'sellers', label: 'فروشندگان', icon: Store },
    { id: 'discounts', label: 'تخفیف‌ها', icon: Percent },
    { id: 'reports', label: 'گزارشات', icon: BarChart3 },
    { id: 'settings', label: 'تنظیمات', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#f0f2f5] flex" dir="rtl">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-[#1a1d23] text-white flex flex-col transition-all duration-300 fixed h-full z-40`}>
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-white/10">
          {sidebarOpen && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#e84a4a] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">هـ</span>
              </div>
              <span className="font-bold text-sm">پنل مدیریت</span>
            </div>
          )}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1 hover:bg-white/10 rounded">
            {sidebarOpen ? <ChevronRight className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 overflow-y-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-all ${
                activeTab === tab.id
                  ? 'bg-[#e84a4a] text-white border-l-4 border-white'
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <tab.icon className="w-5 h-5 flex-shrink-0" />
              {sidebarOpen && <span>{tab.label}</span>}
            </button>
          ))}
        </nav>

        {/* Bottom */}
        <div className="border-t border-white/10 p-4">
          <button
            onClick={onBack}
            className="w-full flex items-center gap-3 px-2 py-2 text-sm text-gray-400 hover:text-white transition-colors"
          >
            <ArrowRight className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && <span>بازگشت به سایت</span>}
          </button>
          <button className="w-full flex items-center gap-3 px-2 py-2 text-sm text-gray-400 hover:text-red-400 transition-colors mt-1">
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && <span>خروج</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`flex-1 ${sidebarOpen ? 'mr-64' : 'mr-16'} transition-all duration-300`}>
        {/* Top Bar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-30">
          <div>
            <h1 className="text-lg font-bold text-gray-800">
              {tabs.find(t => t.id === activeTab)?.label}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Bell className="w-5 h-5" />
                {notifications.filter(n => !n.read).length > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-[#e84a4a] text-white text-[10px] rounded-full flex items-center justify-center">
                    {notifications.filter(n => !n.read).length}
                  </span>
                )}
              </button>
              {showNotifications && (
                <div className="absolute left-0 top-full mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-200 animate-fade-in">
                  <div className="p-3 border-b border-gray-100 flex items-center justify-between">
                    <span className="text-sm font-bold">اعلان‌ها</span>
                    <button
                      onClick={() => setNotifications(notifications.map(n => ({ ...n, read: true })))}
                      className="text-xs text-[#e84a4a] hover:underline"
                    >
                      خواندن همه
                    </button>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.map(n => (
                      <div key={n.id} className={`p-3 border-b border-gray-50 ${!n.read ? 'bg-blue-50/50' : ''}`}>
                        <p className="text-sm text-gray-700">{n.text}</p>
                        <p className="text-xs text-gray-400 mt-1">{n.time}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {/* Profile */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#e84a4a] rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">م</span>
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium text-gray-800">مدیر سیستم</p>
                <p className="text-xs text-gray-400">admin@hooshbazar.ir</p>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-6">
          {activeTab === 'dashboard' && <DashboardTab />}
          {activeTab === 'products' && (
            <ProductsTab
              products={products}
              setProducts={setProducts}
              onEdit={(p) => { setEditingProduct(p); setShowProductForm(true); }}
              onDelete={(id) => setDeleteConfirm({ type: 'product', id })}
              onAdd={() => { setEditingProduct(null); setShowProductForm(true); }}
            />
          )}
          {activeTab === 'categories' && (
            <CategoriesTab
              categories={categories}
              setCategories={setCategories}
              products={products}
              onEdit={(c) => { setEditingCategory(c); setShowCategoryForm(true); }}
              onDelete={(id) => setDeleteConfirm({ type: 'category', id })}
              onAdd={() => { setEditingCategory(null); setShowCategoryForm(true); }}
            />
          )}
          {activeTab === 'orders' && (
            <OrdersTab
              orders={orders}
              setOrders={setOrders}
              onView={(o) => setSelectedOrder(o)}
              onStatusChange={(id, status) => {
                setOrders(orders.map(o => o.id === id ? { ...o, status } : o));
                showToast('وضعیت سفارش بروزرسانی شد');
              }}
            />
          )}
          {activeTab === 'users' && (
            <UsersTab
              users={allUsers}
              setUsers={setAllUsers}
              onEdit={(u) => { setEditingUser(u); setShowUserForm(true); }}
              onDelete={(id) => setDeleteConfirm({ type: 'user', id })}
              onAdd={() => { setEditingUser(null); setShowUserForm(true); }}
              onToggleStatus={(id) => {
                setAllUsers(allUsers.map(u => u.id === id ? { ...u, status: u.status === 'active' ? 'inactive' : 'active' } : u));
                showToast('وضعیت کاربر تغییر کرد');
              }}
            />
          )}
          {activeTab === 'sellers' && <SellersTab products={products} />}
          {activeTab === 'discounts' && <DiscountsTab products={products} setProducts={setProducts} showToast={showToast} />}
          {activeTab === 'reports' && <ReportsTab />}
          {activeTab === 'settings' && <SettingsTab showToast={showToast} />}
        </main>
      </div>

      {/* Modals */}
      {showProductForm && (
        <ProductFormModal
          product={editingProduct}
          categories={categories}
          onSave={(p) => {
            if (editingProduct) {
              setProducts(products.map(x => x.id === p.id ? p : x));
              showToast('محصول با موفقیت ویرایش شد');
            } else {
              setProducts([...products, { ...p, id: 'p' + Date.now() }]);
              showToast('محصول جدید اضافه شد');
            }
            setShowProductForm(false);
          }}
          onClose={() => setShowProductForm(false)}
        />
      )}
      {showCategoryForm && (
        <CategoryFormModal
          category={editingCategory}
          onSave={(c) => {
            if (editingCategory) {
              setCategories(categories.map(x => x.id === c.id ? c : x));
              showToast('دسته‌بندی ویرایش شد');
            } else {
              setCategories([...categories, { ...c, id: 'cat' + Date.now() }]);
              showToast('دسته‌بندی جدید اضافه شد');
            }
            setShowCategoryForm(false);
          }}
          onClose={() => setShowCategoryForm(false)}
        />
      )}
      {showUserForm && (
        <UserFormModal
          user={editingUser}
          onSave={(u) => {
            if (editingUser) {
              setAllUsers(allUsers.map(x => x.id === u.id ? u : x));
              showToast('کاربر ویرایش شد');
            } else {
              setAllUsers([...allUsers, { ...u, id: 'u' + Date.now() }]);
              showToast('کاربر جدید اضافه شد');
            }
            setShowUserForm(false);
          }}
          onClose={() => setShowUserForm(false)}
        />
      )}
      {selectedOrder && (
        <OrderDetailModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />
      )}
      {deleteConfirm && (
        <DeleteConfirmModal
          message={`آیا از حذف این ${deleteConfirm.type === 'product' ? 'محصول' : deleteConfirm.type === 'category' ? 'دسته‌بندی' : 'کاربر'} اطمینان دارید؟`}
          onConfirm={() => {
            if (deleteConfirm.type === 'product') {
              setProducts(products.filter(p => p.id !== deleteConfirm.id));
              showToast('محصول حذف شد');
            } else if (deleteConfirm.type === 'category') {
              setCategories(categories.filter(c => c.id !== deleteConfirm.id));
              showToast('دسته‌بندی حذف شد');
            } else {
              setAllUsers(allUsers.filter(u => u.id !== deleteConfirm.id));
              showToast('کاربر حذف شد');
            }
            setDeleteConfirm(null);
          }}
          onCancel={() => setDeleteConfirm(null)}
        />
      )}

      {/* Toast */}
      {toast && (
        <div className={`fixed bottom-6 left-6 z-50 px-4 py-3 rounded-lg shadow-lg animate-slide-up flex items-center gap-2 ${
          toast.type === 'success' ? 'bg-[#00a049] text-white' : 'bg-[#e84a4a] text-white'
        }`}>
          {toast.type === 'success' ? <Check className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          <span className="text-sm font-medium">{toast.message}</span>
        </div>
      )}
    </div>
  );
}

// ==================== DASHBOARD TAB ====================
function DashboardTab() {
  const stats = dashboardStats;
  const recentOrders = initialOrders.slice(0, 5);

  const statCards = [
    { label: 'کل محصولات', value: stats.totalProducts.toLocaleString('fa-IR'), growth: stats.productsGrowth, icon: Package, color: '#3b82f6' },
    { label: 'کل کاربران', value: stats.totalUsers.toLocaleString('fa-IR'), growth: stats.usersGrowth, icon: Users, color: '#8b5cf6' },
    { label: 'کل سفارشات', value: stats.totalOrders.toLocaleString('fa-IR'), growth: stats.ordersGrowth, icon: ShoppingCart, color: '#10b981' },
    { label: 'درآمد کل', value: (stats.totalRevenue / 1000000000).toFixed(1).replace(/\d/g, d => '۰۱۲۳۴۵۶۷۸۹'[+d]) + ' میلیارد', growth: stats.revenueGrowth, icon: DollarSign, color: '#f59e0b' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: card.color + '15' }}>
                <card.icon className="w-5 h-5" style={{ color: card.color }} />
              </div>
              <div className={`flex items-center gap-0.5 text-xs font-medium ${card.growth >= 0 ? 'text-[#00a049]' : 'text-[#e84a4a]'}`}>
                {card.growth >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {Math.abs(card.growth).toLocaleString('fa-IR')}%
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-800">{card.value}</p>
            <p className="text-xs text-gray-500 mt-1">{card.label}</p>
          </div>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
            <Activity className="w-5 h-5 text-blue-500" />
          </div>
          <div>
            <p className="text-lg font-bold text-gray-800">{stats.todayOrders.toLocaleString('fa-IR')}</p>
            <p className="text-xs text-gray-500">سفارش امروز</p>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
            <DollarSign className="w-5 h-5 text-green-500" />
          </div>
          <div>
            <p className="text-lg font-bold text-gray-800">{(stats.todayRevenue / 1000000).toLocaleString('fa-IR')} م</p>
            <p className="text-xs text-gray-500">درآمد امروز (تومان)</p>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center">
            <AlertCircle className="w-5 h-5 text-orange-500" />
          </div>
          <div>
            <p className="text-lg font-bold text-gray-800">{stats.pendingOrders.toLocaleString('fa-IR')}</p>
            <p className="text-xs text-gray-500">سفارش در انتظار</p>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
            <Store className="w-5 h-5 text-purple-500" />
          </div>
          <div>
            <p className="text-lg font-bold text-gray-800">{stats.activeSellers.toLocaleString('fa-IR')}</p>
            <p className="text-xs text-gray-500">فروشنده فعال</p>
          </div>
        </div>
      </div>

      {/* Charts & Recent */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Placeholder */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-gray-800">نمودار فروش ۷ روز اخیر</h3>
            <select className="text-xs bg-gray-50 border border-gray-200 rounded-lg px-2 py-1">
              <option>هفته اخیر</option>
              <option>ماه اخیر</option>
              <option>سال اخیر</option>
            </select>
          </div>
          {/* Simple bar chart */}
          <div className="flex items-end gap-2 h-40">
            {[65, 45, 80, 55, 90, 70, 85].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full bg-[#e84a4a]/80 rounded-t-md transition-all hover:bg-[#e84a4a]"
                  style={{ height: `${h}%` }}
                />
                <span className="text-[10px] text-gray-400">
                  {['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'][i]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="text-sm font-bold text-gray-800 mb-4">آخرین سفارشات</h3>
          <div className="space-y-3">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <div>
                  <p className="text-sm font-medium text-gray-800">{order.id}</p>
                  <p className="text-xs text-gray-500">{order.customerName}</p>
                </div>
                <OrderStatusBadge status={order.status} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==================== PRODUCTS TAB ====================
function ProductsTab({ products, setProducts, onEdit, onDelete, onAdd }: {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  onEdit: (p: Product) => void;
  onDelete: (id: string) => void;
  onAdd: () => void;
}) {
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 6;

  const filtered = useMemo(() => {
    let result = [...products];
    if (search) result = result.filter(p => p.title.includes(search) || p.brand.includes(search));
    if (filterCategory) result = result.filter(p => p.categoryId === filterCategory);
    if (filterStatus === 'active') result = result.filter(p => p.isActive);
    if (filterStatus === 'inactive') result = result.filter(p => !p.isActive);
    return result;
  }, [products, search, filterCategory, filterStatus]);

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

  const toggleActive = (id: string) => {
    setProducts(products.map(p => p.id === id ? { ...p, isActive: !p.isActive } : p));
  };

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Toolbar */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="جستجو..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                className="pr-9 pl-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm w-48 focus:border-[#e84a4a]"
              />
            </div>
            <select
              value={filterCategory}
              onChange={(e) => { setFilterCategory(e.target.value); setCurrentPage(1); }}
              className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm"
            >
              <option value="">همه دسته‌ها</option>
              {initialCategories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            <select
              value={filterStatus}
              onChange={(e) => { setFilterStatus(e.target.value); setCurrentPage(1); }}
              className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm"
            >
              <option value="">همه وضعیت‌ها</option>
              <option value="active">فعال</option>
              <option value="inactive">غیرفعال</option>
            </select>
          </div>
          <button
            onClick={onAdd}
            className="flex items-center gap-1.5 bg-[#e84a4a] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#d63636] transition-colors"
          >
            <Plus className="w-4 h-4" />
            محصول جدید
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-right py-3 px-4 font-medium text-gray-600">محصول</th>
                <th className="text-right py-3 px-4 font-medium text-gray-600">دسته‌بندی</th>
                <th className="text-right py-3 px-4 font-medium text-gray-600">قیمت</th>
                <th className="text-right py-3 px-4 font-medium text-gray-600">فروشندگان</th>
                <th className="text-right py-3 px-4 font-medium text-gray-600">وضعیت</th>
                <th className="text-right py-3 px-4 font-medium text-gray-600">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginated.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img src={product.image} alt="" className="w-10 h-10 rounded-lg object-cover" />
                      <div>
                        <p className="font-medium text-gray-800 line-clamp-1">{product.title}</p>
                        <p className="text-xs text-gray-500">{product.brand}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    {initialCategories.find(c => c.id === product.categoryId)?.name || '-'}
                  </td>
                  <td className="py-3 px-4 text-gray-800 font-medium">
                    {formatPrice(product.minPrice)}
                  </td>
                  <td className="py-3 px-4 text-gray-600">{product.sellerCount.toLocaleString('fa-IR')}</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => toggleActive(product.id)}
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium ${
                        product.isActive ? 'bg-green-50 text-[#00a049]' : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${product.isActive ? 'bg-[#00a049]' : 'bg-gray-400'}`} />
                      {product.isActive ? 'فعال' : 'غیرفعال'}
                    </button>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1">
                      <button onClick={() => onEdit(product)} className="p-1.5 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => onDelete(product.id)} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between p-4 border-t border-gray-100">
            <span className="text-xs text-gray-500">
              نمایش {(currentPage - 1) * perPage + 1} تا {Math.min(currentPage * perPage, filtered.length)} از {filtered.length}
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 text-sm border border-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-50"
              >
                قبلی
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 text-sm rounded-lg ${page === currentPage ? 'bg-[#e84a4a] text-white' : 'border border-gray-200 hover:bg-gray-50'}`}
                >
                  {page.toLocaleString('fa-IR')}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 text-sm border border-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-50"
              >
                بعدی
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ==================== CATEGORIES TAB ====================
function CategoriesTab({ categories, setCategories, products, onEdit, onDelete, onAdd }: {
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  products: Product[];
  onEdit: (c: Category) => void;
  onDelete: (id: string) => void;
  onAdd: () => void;
}) {
  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">{categories.length.toLocaleString('fa-IR')} دسته‌بندی</p>
        <button onClick={onAdd} className="flex items-center gap-1.5 bg-[#e84a4a] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#d63636]">
          <Plus className="w-4 h-4" />
          دسته‌بندی جدید
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => {
          const count = products.filter(p => p.categoryId === cat.id).length;
          return (
            <div key={cat.id} className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: cat.color + '15' }}>
                    <FolderTree className="w-5 h-5" style={{ color: cat.color }} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">{cat.name}</h3>
                    <p className="text-xs text-gray-500">{count.toLocaleString('fa-IR')} محصول</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={() => onEdit(cat)} className="p-1.5 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button onClick={() => onDelete(cat.id)} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {cat.subcategories.map((sub) => (
                  <span key={sub} className="text-xs bg-gray-50 text-gray-600 px-2 py-1 rounded-md">{sub}</span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ==================== ORDERS TAB ====================
function OrdersTab({ orders, setOrders, onView, onStatusChange }: {
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  onView: (o: Order) => void;
  onStatusChange: (id: string, status: Order['status']) => void;
}) {
  const [filterStatus, setFilterStatus] = useState('');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    let result = [...orders];
    if (filterStatus) result = result.filter(o => o.status === filterStatus);
    if (search) result = result.filter(o => o.id.includes(search) || o.customerName.includes(search));
    return result;
  }, [orders, filterStatus, search]);

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="جستجو شماره سفارش یا نام مشتری..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pr-9 pl-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:border-[#e84a4a]"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm"
        >
          <option value="">همه وضعیت‌ها</option>
          <option value="pending">در انتظار</option>
          <option value="processing">در حال پردازش</option>
          <option value="shipped">ارسال شده</option>
          <option value="delivered">تحویل شده</option>
          <option value="cancelled">لغو شده</option>
        </select>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-right py-3 px-4 font-medium text-gray-600">شماره</th>
                <th className="text-right py-3 px-4 font-medium text-gray-600">مشتری</th>
                <th className="text-right py-3 px-4 font-medium text-gray-600">محصول</th>
                <th className="text-right py-3 px-4 font-medium text-gray-600">مبلغ</th>
                <th className="text-right py-3 px-4 font-medium text-gray-600">تاریخ</th>
                <th className="text-right py-3 px-4 font-medium text-gray-600">وضعیت</th>
                <th className="text-right py-3 px-4 font-medium text-gray-600">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-800">{order.id}</td>
                  <td className="py-3 px-4 text-gray-600">{order.customerName}</td>
                  <td className="py-3 px-4 text-gray-600">{order.productTitle}</td>
                  <td className="py-3 px-4 text-gray-800 font-medium">{formatPrice(order.price)}</td>
                  <td className="py-3 px-4 text-gray-500">{order.date}</td>
                  <td className="py-3 px-4">
                    <select
                      value={order.status}
                      onChange={(e) => onStatusChange(order.id, e.target.value as Order['status'])}
                      className="text-xs bg-gray-50 border border-gray-200 rounded-md px-2 py-1"
                    >
                      <option value="pending">در انتظار</option>
                      <option value="processing">در حال پردازش</option>
                      <option value="shipped">ارسال شده</option>
                      <option value="delivered">تحویل شده</option>
                      <option value="cancelled">لغو شده</option>
                    </select>
                  </td>
                  <td className="py-3 px-4">
                    <button onClick={() => onView(order)} className="p-1.5 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg">
                      <Eye className="w-4 h-4" />
                    </button>
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

// ==================== USERS TAB ====================
function UsersTab({ users, setUsers, onEdit, onDelete, onAdd, onToggleStatus }: {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  onEdit: (u: User) => void;
  onDelete: (id: string) => void;
  onAdd: () => void;
  onToggleStatus: (id: string) => void;
}) {
  const [search, setSearch] = useState('');
  const [filterRole, setFilterRole] = useState('');

  const filtered = useMemo(() => {
    let result = [...users];
    if (search) result = result.filter(u => u.name.includes(search) || u.email.includes(search));
    if (filterRole) result = result.filter(u => u.role === filterRole);
    return result;
  }, [users, search, filterRole]);

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="جستجو نام یا ایمیل..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pr-9 pl-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:border-[#e84a4a]"
          />
        </div>
        <select value={filterRole} onChange={(e) => setFilterRole(e.target.value)} className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm">
          <option value="">همه نقش‌ها</option>
          <option value="user">کاربر</option>
          <option value="seller">فروشنده</option>
          <option value="admin">مدیر</option>
        </select>
        <button onClick={onAdd} className="flex items-center gap-1.5 bg-[#e84a4a] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#d63636]">
          <Plus className="w-4 h-4" />
          کاربر جدید
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-right py-3 px-4 font-medium text-gray-600">کاربر</th>
                <th className="text-right py-3 px-4 font-medium text-gray-600">ایمیل</th>
                <th className="text-right py-3 px-4 font-medium text-gray-600">نقش</th>
                <th className="text-right py-3 px-4 font-medium text-gray-600">تاریخ عضویت</th>
                <th className="text-right py-3 px-4 font-medium text-gray-600">وضعیت</th>
                <th className="text-right py-3 px-4 font-medium text-gray-600">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xs font-bold text-gray-600">
                        {user.name[0]}
                      </div>
                      <span className="font-medium text-gray-800">{user.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{user.email}</td>
                  <td className="py-3 px-4">
                    <span className={`text-xs px-2 py-1 rounded-md font-medium ${
                      user.role === 'admin' ? 'bg-purple-50 text-purple-600' :
                      user.role === 'seller' ? 'bg-blue-50 text-blue-600' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {user.role === 'admin' ? 'مدیر' : user.role === 'seller' ? 'فروشنده' : 'کاربر'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-500">{user.joinDate}</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => onToggleStatus(user.id)}
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium ${
                        user.status === 'active' ? 'bg-green-50 text-[#00a049]' : 'bg-red-50 text-[#e84a4a]'
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'active' ? 'bg-[#00a049]' : 'bg-[#e84a4a]'}`} />
                      {user.status === 'active' ? 'فعال' : 'غیرفعال'}
                    </button>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1">
                      <button onClick={() => onEdit(user)} className="p-1.5 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => onDelete(user.id)} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg">
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

// ==================== SELLERS TAB ====================
function SellersTab({ products }: { products: Product[] }) {
  const sellers = useMemo(() => {
    const map = new Map<string, { name: string; productCount: number; avgRating: number; totalSales: number }>();
    products.forEach(p => {
      p.sellers.forEach(s => {
        const existing = map.get(s.name) || { name: s.name, productCount: 0, avgRating: 0, totalSales: 0 };
        existing.productCount++;
        existing.avgRating = (existing.avgRating + s.rating) / 2;
        existing.totalSales += Math.floor(Math.random() * 50) + 10;
        map.set(s.name, existing);
      });
    });
    return Array.from(map.values());
  }, [products]);

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sellers.map((seller) => (
          <div key={seller.name} className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                <Store className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800">{seller.name}</h3>
                <p className="text-xs text-gray-500">{seller.productCount.toLocaleString('fa-IR')} محصول</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-50 rounded-lg p-2 text-center">
                <p className="text-lg font-bold text-gray-800">{seller.avgRating.toFixed(1).replace('.', '/')}</p>
                <p className="text-xs text-gray-500">امتیاز</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-2 text-center">
                <p className="text-lg font-bold text-gray-800">{seller.totalSales.toLocaleString('fa-IR')}</p>
                <p className="text-xs text-gray-500">فروش</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==================== DISCOUNTS TAB ====================
function DiscountsTab({ products, setProducts, showToast }: {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  showToast: (msg: string, type?: 'success' | 'error') => void;
}) {
  const [newDiscount, setNewDiscount] = useState({ productId: '', percentage: 10 });

  const applyDiscount = () => {
    if (!newDiscount.productId) return;
    setProducts(products.map(p => {
      if (p.id === newDiscount.productId) {
        const newMin = Math.round(p.minPrice * (1 - newDiscount.percentage / 100));
        return { ...p, minPrice: newMin };
      }
      return p;
    }));
    showToast(`تخفیف ${newDiscount.percentage}% اعمال شد`);
    setNewDiscount({ productId: '', percentage: 10 });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Percent className="w-4 h-4 text-[#e84a4a]" />
          اعمال تخفیف جدید
        </h3>
        <div className="flex items-end gap-3 flex-wrap">
          <div className="flex-1 min-w-[200px]">
            <label className="text-xs text-gray-500 mb-1 block">محصول</label>
            <select
              value={newDiscount.productId}
              onChange={(e) => setNewDiscount({ ...newDiscount, productId: e.target.value })}
              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm"
            >
              <option value="">انتخاب محصول...</option>
              {products.map(p => <option key={p.id} value={p.id}>{p.title}</option>)}
            </select>
          </div>
          <div className="w-32">
            <label className="text-xs text-gray-500 mb-1 block">درصد تخفیف</label>
            <input
              type="number"
              min={1}
              max={90}
              value={newDiscount.percentage}
              onChange={(e) => setNewDiscount({ ...newDiscount, percentage: +e.target.value })}
              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm"
            />
          </div>
          <button
            onClick={applyDiscount}
            disabled={!newDiscount.productId}
            className="flex items-center gap-1.5 bg-[#e84a4a] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#d63636] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Zap className="w-4 h-4" />
            اعمال تخفیف
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <h3 className="text-sm font-bold text-gray-800">محصولات با تخفیف فعال</h3>
        </div>
        <div className="divide-y divide-gray-100">
          {products.map(p => {
            const discount = Math.round(((p.maxPrice - p.minPrice) / p.maxPrice) * 100);
            if (discount < 5) return null;
            return (
              <div key={p.id} className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={p.image} alt="" className="w-10 h-10 rounded-lg object-cover" />
                  <div>
                    <p className="text-sm font-medium text-gray-800">{p.title}</p>
                    <p className="text-xs text-gray-500">{formatPrice(p.maxPrice)} → {formatPrice(p.minPrice)} تومان</p>
                  </div>
                </div>
                <span className="bg-[#e84a4a]/10 text-[#e84a4a] text-xs font-bold px-2 py-1 rounded-md">
                  {discount}% تخفیف
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ==================== REPORTS TAB ====================
function ReportsTab() {
  const categoryData = initialCategories.map(c => ({
    name: c.name,
    count: c.productCount,
    color: c.color,
  }));

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Report */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="text-sm font-bold text-gray-800 mb-4">گزارش فروش ماهانه</h3>
          <div className="space-y-3">
            {['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور'].map((month, i) => {
              const value = [45, 62, 58, 73, 85, 92][i];
              return (
                <div key={month} className="flex items-center gap-3">
                  <span className="text-xs text-gray-500 w-16">{month}</span>
                  <div className="flex-1 bg-gray-100 rounded-full h-4 overflow-hidden">
                    <div
                      className="h-full bg-[#e84a4a] rounded-full transition-all"
                      style={{ width: `${value}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium text-gray-700 w-12 text-left">{value.toLocaleString('fa-IR')}%</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Category Distribution */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="text-sm font-bold text-gray-800 mb-4">توزیع محصولات بر اساس دسته‌بندی</h3>
          <div className="space-y-3">
            {categoryData.slice(0, 6).map((cat) => {
              const maxCount = Math.max(...categoryData.map(c => c.count));
              const percent = (cat.count / maxCount) * 100;
              return (
                <div key={cat.name} className="flex items-center gap-3">
                  <span className="text-xs text-gray-600 w-28 truncate">{cat.name}</span>
                  <div className="flex-1 bg-gray-100 rounded-full h-3 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${percent}%`, backgroundColor: cat.color }}
                    />
                  </div>
                  <span className="text-xs font-medium text-gray-700 w-14 text-left">{cat.count.toLocaleString('fa-IR')}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Export */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-gray-800">خروجی گزارشات</h3>
            <p className="text-xs text-gray-500 mt-1">دانلود گزارشات در فرمت‌های مختلف</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors">
              <Download className="w-4 h-4" />
              CSV
            </button>
            <button className="flex items-center gap-1.5 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors">
              <Download className="w-4 h-4" />
              PDF
            </button>
            <button className="flex items-center gap-1.5 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors">
              <Download className="w-4 h-4" />
              Excel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==================== SETTINGS TAB ====================
function SettingsTab({ showToast }: { showToast: (msg: string, type?: 'success' | 'error') => void }) {
  const [siteName, setSiteName] = useState('هوش‌بازار');
  const [siteDesc, setSiteDesc] = useState('مقایسه قیمت میلیون‌ها محصول');
  const [contactEmail, setContactEmail] = useState('info@hooshbazar.ir');
  const [contactPhone, setContactPhone] = useState('021-12345678');
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [registrationEnabled, setRegistrationEnabled] = useState(true);
  const [autoApproveSellers, setAutoApproveSellers] = useState(false);

  const handleSave = () => {
    showToast('تنظیمات با موفقیت ذخیره شد');
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-3xl">
      {/* General */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Settings className="w-4 h-4 text-gray-500" />
          تنظیمات عمومی
        </h3>
        <div className="space-y-4">
          <div>
            <label className="text-xs text-gray-500 mb-1 block">نام سایت</label>
            <input type="text" value={siteName} onChange={(e) => setSiteName(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-[#e84a4a]" />
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">توضیحات سایت</label>
            <textarea value={siteDesc} onChange={(e) => setSiteDesc(e.target.value)} rows={2} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-[#e84a4a] resize-none" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-500 mb-1 block">ایمیل تماس</label>
              <input type="email" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-[#e84a4a]" />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">تلفن تماس</label>
              <input type="text" value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-[#e84a4a]" />
            </div>
          </div>
        </div>
      </div>

      {/* Toggles */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="text-sm font-bold text-gray-800 mb-4">تنظیمات سیستم</h3>
        <div className="space-y-4">
          {[
            { label: 'حالت تعمیر و نگهداری', desc: 'سایت موقتاً غیرفعال شود', value: maintenanceMode, set: setMaintenanceMode },
            { label: 'ثبت‌نام کاربران', desc: 'امکان ثبت‌نام برای کاربران جدید', value: registrationEnabled, set: setRegistrationEnabled },
            { label: 'تأیید خودکار فروشندگان', desc: 'فروشندگان بدون بررسی تأیید شوند', value: autoApproveSellers, set: setAutoApproveSellers },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-medium text-gray-800">{item.label}</p>
                <p className="text-xs text-gray-500">{item.desc}</p>
              </div>
              <button
                onClick={() => item.set(!item.value)}
                className={`w-11 h-6 rounded-full transition-colors relative ${item.value ? 'bg-[#e84a4a]' : 'bg-gray-300'}`}
              >
                <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${item.value ? 'right-0.5' : 'right-[22px]'}`} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={handleSave}
        className="flex items-center gap-2 bg-[#e84a4a] text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-[#d63636] transition-colors"
      >
        <Save className="w-4 h-4" />
        ذخیره تنظیمات
      </button>
    </div>
  );
}

// ==================== MODALS ====================
function ProductFormModal({ product, categories, onSave, onClose }: {
  product: Product | null;
  categories: Category[];
  onSave: (p: Product) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState<Partial<Product>>(product || {
    title: '', brand: '', categoryId: categories[0]?.id || '', subcategory: '', image: '', images: [],
    minPrice: 0, maxPrice: 0, avgPrice: 0, rating: 0, reviewCount: 0, sellerCount: 0,
    specs: {}, description: '', tags: [], isActive: true, sellers: [], createdAt: new Date().toISOString().split('T')[0],
  });

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="p-5 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white z-10">
          <h3 className="font-bold text-gray-800">{product ? 'ویرایش محصول' : 'افزودن محصول جدید'}</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg"><X className="w-5 h-5" /></button>
        </div>
        <div className="p-5 space-y-4">
          <div>
            <label className="text-xs text-gray-500 mb-1 block">عنوان محصول</label>
            <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-500 mb-1 block">برند</label>
              <input type="text" value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">دسته‌بندی</label>
              <select value={form.categoryId} onChange={(e) => setForm({ ...form, categoryId: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm">
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">آدرس تصویر</label>
            <input type="text" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm" placeholder="https://..." />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-xs text-gray-500 mb-1 block">کمترین قیمت</label>
              <input type="number" value={form.minPrice} onChange={(e) => setForm({ ...form, minPrice: +e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">بیشترین قیمت</label>
              <input type="number" value={form.maxPrice} onChange={(e) => setForm({ ...form, maxPrice: +e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">میانگین قیمت</label>
              <input type="number" value={form.avgPrice} onChange={(e) => setForm({ ...form, avgPrice: +e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm" />
            </div>
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">توضیحات</label>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm resize-none" />
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="isActive" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} className="rounded" />
            <label htmlFor="isActive" className="text-sm text-gray-700">محصول فعال باشد</label>
          </div>
        </div>
        <div className="p-5 border-t border-gray-200 flex items-center justify-end gap-2 sticky bottom-0 bg-white">
          <button onClick={onClose} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">انصراف</button>
          <button
            onClick={() => onSave(form as Product)}
            className="flex items-center gap-1.5 bg-[#e84a4a] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#d63636]"
          >
            <Save className="w-4 h-4" />
            ذخیره
          </button>
        </div>
      </div>
    </div>
  );
}

function CategoryFormModal({ category, onSave, onClose }: {
  category: Category | null;
  onSave: (c: Category) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState<Partial<Category>>(category || {
    name: '', icon: 'folder', subcategories: [], productCount: 0, color: '#3b82f6',
  });
  const [subInput, setSubInput] = useState('');

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-xl w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <div className="p-5 border-b border-gray-200 flex items-center justify-between">
          <h3 className="font-bold text-gray-800">{category ? 'ویرایش دسته‌بندی' : 'دسته‌بندی جدید'}</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg"><X className="w-5 h-5" /></button>
        </div>
        <div className="p-5 space-y-4">
          <div>
            <label className="text-xs text-gray-500 mb-1 block">نام دسته‌بندی</label>
            <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">رنگ</label>
            <input type="color" value={form.color} onChange={(e) => setForm({ ...form, color: e.target.value })} className="w-12 h-10 rounded cursor-pointer" />
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">زیردسته‌بندی‌ها</label>
            <div className="flex gap-2 mb-2">
              <input type="text" value={subInput} onChange={(e) => setSubInput(e.target.value)} placeholder="نام زیردسته..." className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm" />
              <button
                onClick={() => { if (subInput) { setForm({ ...form, subcategories: [...(form.subcategories || []), subInput] }); setSubInput(''); } }}
                className="px-3 py-2 bg-gray-100 rounded-lg text-sm hover:bg-gray-200"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {(form.subcategories || []).map((sub, i) => (
                <span key={i} className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-md">
                  {sub}
                  <button onClick={() => setForm({ ...form, subcategories: form.subcategories!.filter((_, idx) => idx !== i) })}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="p-5 border-t border-gray-200 flex items-center justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">انصراف</button>
          <button onClick={() => onSave(form as Category)} className="flex items-center gap-1.5 bg-[#e84a4a] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#d63636]">
            <Save className="w-4 h-4" />
            ذخیره
          </button>
        </div>
      </div>
    </div>
  );
}

function UserFormModal({ user, onSave, onClose }: {
  user: User | null;
  onSave: (u: User) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState<Partial<User>>(user || {
    name: '', email: '', phone: '', role: 'user', status: 'active',
    joinDate: new Date().toISOString().split('T')[0], lastActive: new Date().toISOString().split('T')[0],
  });

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-xl w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <div className="p-5 border-b border-gray-200 flex items-center justify-between">
          <h3 className="font-bold text-gray-800">{user ? 'ویرایش کاربر' : 'کاربر جدید'}</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg"><X className="w-5 h-5" /></button>
        </div>
        <div className="p-5 space-y-4">
          <div>
            <label className="text-xs text-gray-500 mb-1 block">نام</label>
            <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">ایمیل</label>
            <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">تلفن</label>
            <input type="text" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-500 mb-1 block">نقش</label>
              <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value as User['role'] })} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm">
                <option value="user">کاربر</option>
                <option value="seller">فروشنده</option>
                <option value="admin">مدیر</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">وضعیت</label>
              <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as User['status'] })} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm">
                <option value="active">فعال</option>
                <option value="inactive">غیرفعال</option>
                <option value="banned">مسدود</option>
              </select>
            </div>
          </div>
        </div>
        <div className="p-5 border-t border-gray-200 flex items-center justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">انصراف</button>
          <button onClick={() => onSave(form as User)} className="flex items-center gap-1.5 bg-[#e84a4a] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#d63636]">
            <Save className="w-4 h-4" />
            ذخیره
          </button>
        </div>
      </div>
    </div>
  );
}

function OrderDetailModal({ order, onClose }: { order: Order; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-xl w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <div className="p-5 border-b border-gray-200 flex items-center justify-between">
          <h3 className="font-bold text-gray-800">جزئیات سفارش {order.id}</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg"><X className="w-5 h-5" /></button>
        </div>
        <div className="p-5 space-y-3">
          <div className="flex justify-between"><span className="text-sm text-gray-500">مشتری:</span><span className="text-sm font-medium">{order.customerName}</span></div>
          <div className="flex justify-between"><span className="text-sm text-gray-500">محصول:</span><span className="text-sm font-medium">{order.productTitle}</span></div>
          <div className="flex justify-between"><span className="text-sm text-gray-500">فروشنده:</span><span className="text-sm font-medium">{order.sellerName}</span></div>
          <div className="flex justify-between"><span className="text-sm text-gray-500">مبلغ:</span><span className="text-sm font-bold">{formatPrice(order.price)} تومان</span></div>
          <div className="flex justify-between"><span className="text-sm text-gray-500">تاریخ:</span><span className="text-sm">{order.date}</span></div>
          <div className="flex justify-between"><span className="text-sm text-gray-500">وضعیت:</span><OrderStatusBadge status={order.status} /></div>
          {order.trackingCode && (
            <div className="flex justify-between"><span className="text-sm text-gray-500">کد پیگیری:</span><span className="text-sm font-medium">{order.trackingCode}</span></div>
          )}
        </div>
        <div className="p-5 border-t border-gray-200 flex justify-end">
          <button onClick={onClose} className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg">بستن</button>
        </div>
      </div>
    </div>
  );
}

function DeleteConfirmModal({ message, onConfirm, onCancel }: { message: string; onConfirm: () => void; onCancel: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onCancel}>
      <div className="bg-white rounded-xl w-full max-w-sm p-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center">
            <AlertCircle className="w-5 h-5 text-[#e84a4a]" />
          </div>
          <h3 className="font-bold text-gray-800">تأیید حذف</h3>
        </div>
        <p className="text-sm text-gray-600 mb-6">{message}</p>
        <div className="flex items-center justify-end gap-2">
          <button onClick={onCancel} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">انصراف</button>
          <button onClick={onConfirm} className="px-4 py-2 text-sm bg-[#e84a4a] text-white rounded-lg hover:bg-[#d63636] font-medium">حذف</button>
        </div>
      </div>
    </div>
  );
}

// ==================== HELPERS ====================
function OrderStatusBadge({ status }: { status: Order['status'] }) {
  const config = {
    pending: { label: 'در انتظار', bg: 'bg-yellow-50', text: 'text-yellow-700' },
    processing: { label: 'در حال پردازش', bg: 'bg-blue-50', text: 'text-blue-700' },
    shipped: { label: 'ارسال شده', bg: 'bg-purple-50', text: 'text-purple-700' },
    delivered: { label: 'تحویل شده', bg: 'bg-green-50', text: 'text-green-700' },
    cancelled: { label: 'لغو شده', bg: 'bg-red-50', text: 'text-red-700' },
  };
  const c = config[status];
  return <span className={`text-xs px-2 py-1 rounded-md font-medium ${c.bg} ${c.text}`}>{c.label}</span>;
}
