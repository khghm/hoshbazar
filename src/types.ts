export interface Seller {
  id: string;
  name: string;
  price: number;
  shippingCost: number;
  deliveryDays: number;
  rating: number;
  warranty: string;
  inStock: boolean;
  url: string;
  logo?: string;
}

export interface Product {
  id: string;
  title: string;
  brand: string;
  categoryId: string;
  subcategory: string;
  image: string;
  images: string[];
  minPrice: number;
  maxPrice: number;
  avgPrice: number;
  rating: number;
  reviewCount: number;
  sellerCount: number;
  specs: Record<string, string>;
  description: string;
  tags: string[];
  createdAt: string;
  isActive: boolean;
  sellers: Seller[];
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  subcategories: string[];
  productCount: number;
  color: string;
}

export interface Order {
  id: string;
  productId: string;
  productTitle: string;
  sellerName: string;
  price: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  date: string;
  customerName: string;
  trackingCode?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'user' | 'seller' | 'admin';
  joinDate: string;
  lastActive: string;
  status: 'active' | 'inactive' | 'banned';
  avatar?: string;
}

export interface DashboardStats {
  totalProducts: number;
  totalUsers: number;
  totalOrders: number;
  totalRevenue: number;
  productsGrowth: number;
  usersGrowth: number;
  ordersGrowth: number;
  revenueGrowth: number;
  todayOrders: number;
  todayRevenue: number;
  pendingOrders: number;
  activeSellers: number;
}

export type AdminTab = 'dashboard' | 'products' | 'categories' | 'orders' | 'users' | 'sellers' | 'discounts' | 'reports' | 'settings';
