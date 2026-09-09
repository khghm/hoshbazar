export interface Product {
  id: string;
  title: string;
  brand: string;
  category: string;
  subcategory: string;
  image: string;
  images: string[];
  minPrice: number;
  maxPrice: number;
  avgPrice: number;
  sellers: Seller[];
  rating: number;
  reviewCount: number;
  specs: Record<string, string>;
  description: string;
  tags: string[];
  createdAt: string;
  isActive: boolean;
}

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
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  subcategories: string[];
  productCount: number;
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
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'seller';
  joinDate: string;
  lastActive: string;
  status: 'active' | 'inactive' | 'banned';
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
}

export type Page = 'home' | 'search' | 'product' | 'category' | 'admin';
export type AdminPage = 'dashboard' | 'products' | 'categories' | 'orders' | 'users' | 'sellers' | 'discounts' | 'settings' | 'reports';
