import { Product, Category, Order, User, DashboardStats } from '../types';

export const categories: Category[] = [
  { id: 'mobile', name: 'موبایل و تبلت', icon: 'smartphone', subcategories: ['گوشی موبایل', 'تبلت', 'لوازم جانبی موبایل'], productCount: 2450 },
  { id: 'laptop', name: 'لپ‌تاپ و کامپیوتر', icon: 'laptop', subcategories: ['لپ‌تاپ', 'کامپیوتر رومیزی', 'مانیتور', 'قطعات'], productCount: 1830 },
  { id: 'home', name: 'لوازم خانگی', icon: 'home', subcategories: ['یخچال', 'ماشین لباسشویی', 'جاروبرقی', 'تلویزیون'], productCount: 3200 },
  { id: 'fashion', name: 'مد و پوشاک', icon: 'shirt', subcategories: ['مردانه', 'زنانه', 'بچگانه', 'کیف و کفش'], productCount: 5600 },
  { id: 'beauty', name: 'زیبایی و سلامت', icon: 'heart', subcategories: ['آرایشی', 'بهداشتی', 'مراقبت پوست', 'عطر'], productCount: 4100 },
  { id: 'sports', name: 'ورزش و سفر', icon: 'dumbbell', subcategories: ['تجهیزات ورزشی', 'دوچرخه', 'کمپینگ', 'کوهنوردی'], productCount: 1950 },
  { id: 'books', name: 'کتاب و لوازم‌التحریر', icon: 'book-open', subcategories: ['کتاب', 'دفتر', 'خودکار', 'لوازم نقاشی'], productCount: 8700 },
  { id: 'tools', name: 'ابزارآلات', icon: 'wrench', subcategories: ['ابزار برقی', 'ابزار دستی', 'پیچ و مهره', 'ایمنی'], productCount: 2300 },
];

export const products: Product[] = [
  {
    id: 'p1',
    title: 'گوشی موبایل سامسونگ Galaxy S24 Ultra',
    brand: 'Samsung',
    category: 'mobile',
    subcategory: 'گوشی موبایل',
    image: 'https://images.unsplash.com/photo-1610945415292-d9e85a14581c?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1610945415292-d9e85a14581c?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=800&fit=crop',
    ],
    minPrice: 52900000,
    maxPrice: 58500000,
    avgPrice: 55200000,
    rating: 4.7,
    reviewCount: 342,
    specs: { 'صفحه نمایش': '6.8 اینچ Dynamic AMOLED', 'پردازنده': 'Snapdragon 8 Gen 3', 'رم': '12 گیگابایت', 'حافظه': '256 گیگابایت', 'دوربین': '200 مگاپیکسل' },
    description: 'پرچم‌دار جدید سامسونگ با قلم S Pen، دوربین 200 مگاپیکسلی و بدنه تیتانیومی.',
    tags: ['پرچم‌دار', '5G', 'قلم S Pen'],
    createdAt: '2024-01-15',
    isActive: true,
    sellers: [
      { id: 's1', name: 'دیجی‌کالا', price: 54900000, shippingCost: 0, deliveryDays: 2, rating: 4.8, warranty: '18 ماه گارانتی سامسونگ', inStock: true, url: '#' },
      { id: 's2', name: 'تکنولایف', price: 53500000, shippingCost: 50000, deliveryDays: 3, rating: 4.5, warranty: '18 ماه گارانتی', inStock: true, url: '#' },
      { id: 's3', name: 'موبایل‌کالا', price: 52900000, shippingCost: 0, deliveryDays: 4, rating: 4.3, warranty: '12 ماه گارانتی', inStock: true, url: '#' },
      { id: 's4', name: 'موبو‌شاپ', price: 58500000, shippingCost: 0, deliveryDays: 1, rating: 4.9, warranty: '18 ماه گارانتی سامسونگ', inStock: false, url: '#' },
    ],
  },
  {
    id: 'p2',
    title: 'لپ‌تاپ اپل MacBook Pro 16 اینچ M3 Max',
    brand: 'Apple',
    category: 'laptop',
    subcategory: 'لپ‌تاپ',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&h=800&fit=crop',
    ],
    minPrice: 145000000,
    maxPrice: 158000000,
    avgPrice: 151000000,
    rating: 4.9,
    reviewCount: 128,
    specs: { 'صفحه نمایش': '16.2 اینچ Liquid Retina XDR', 'پردازنده': 'Apple M3 Max', 'رم': '36 گیگابایت', 'حافظه': '1 ترابایت SSD', 'باتری': '22 ساعت' },
    description: 'قدرتمندترین لپ‌تاپ اپل با تراشه M3 Max برای حرفه‌ای‌ها.',
    tags: ['حرفه‌ای', 'M3 Max', 'XDR'],
    createdAt: '2024-02-01',
    isActive: true,
    sellers: [
      { id: 's5', name: 'دیجی‌کالا', price: 152000000, shippingCost: 0, deliveryDays: 2, rating: 4.8, warranty: '1 سال گارانتی اپل', inStock: true, url: '#' },
      { id: 's6', name: 'اپل‌استور', price: 145000000, shippingCost: 0, deliveryDays: 5, rating: 4.7, warranty: '1 سال گارانتی', inStock: true, url: '#' },
      { id: 's7', name: 'تکنولایف', price: 158000000, shippingCost: 0, deliveryDays: 3, rating: 4.5, warranty: '1 سال گارانتی اپل', inStock: true, url: '#' },
    ],
  },
  {
    id: 'p3',
    title: 'هدفون بی‌سیم سونی WH-1000XM5',
    brand: 'Sony',
    category: 'mobile',
    subcategory: 'لوازم جانبی موبایل',
    image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800&h=800&fit=crop',
    ],
    minPrice: 12500000,
    maxPrice: 14200000,
    avgPrice: 13300000,
    rating: 4.8,
    reviewCount: 567,
    specs: { 'نوع': 'بالاتر گوش', 'نویز کنسلینگ': 'فعال', 'باتری': '30 ساعت', 'بلوتوث': '5.3', 'وزن': '250 گرم' },
    description: 'بهترین هدفون نویز کنسلینگ جهان با کیفیت صدای بی‌نظیر.',
    tags: ['نویز کنسلینگ', 'بی‌سیم', 'Hi-Res'],
    createdAt: '2024-01-20',
    isActive: true,
    sellers: [
      { id: 's8', name: 'دیجی‌کالا', price: 13500000, shippingCost: 0, deliveryDays: 2, rating: 4.8, warranty: '18 ماه', inStock: true, url: '#' },
      { id: 's9', name: 'سونی‌استور', price: 12500000, shippingCost: 30000, deliveryDays: 4, rating: 4.6, warranty: '12 ماه', inStock: true, url: '#' },
      { id: 's10', name: 'صوت‌ایران', price: 14200000, shippingCost: 0, deliveryDays: 1, rating: 4.4, warranty: '18 ماه سونی', inStock: true, url: '#' },
    ],
  },
  {
    id: 'p4',
    title: 'تلویزیون ال‌جی OLED C3 55 اینچ',
    brand: 'LG',
    category: 'home',
    subcategory: 'تلویزیون',
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&h=800&fit=crop',
    ],
    minPrice: 48000000,
    maxPrice: 55000000,
    avgPrice: 51500000,
    rating: 4.6,
    reviewCount: 234,
    specs: { 'صفحه نمایش': '55 اینچ OLED', 'رزولوشن': '4K UHD', 'نرخ نوسازی': '120Hz', 'سیستم عامل': 'webOS 23', 'HDMI': '4 عدد (2.1)' },
    description: 'تلویزیون OLED با کیفیت تصویر خیره‌کننده و مشکی مطلق.',
    tags: ['OLED', '4K', '120Hz', 'گیمینگ'],
    createdAt: '2024-01-10',
    isActive: true,
    sellers: [
      { id: 's11', name: 'دیجی‌کالا', price: 52000000, shippingCost: 0, deliveryDays: 3, rating: 4.8, warranty: '24 ماه', inStock: true, url: '#' },
      { id: 's12', name: 'ال‌جی‌شاپ', price: 48000000, shippingCost: 0, deliveryDays: 5, rating: 4.5, warranty: '24 ماه ال‌جی', inStock: true, url: '#' },
    ],
  },
  {
    id: 'p5',
    title: 'ساعت هوشمند اپل واچ Ultra 2',
    brand: 'Apple',
    category: 'mobile',
    subcategory: 'لوازم جانبی موبایل',
    image: 'https://images.unsplash.com/photo-1546868871-af0de0ae72be?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1546868871-af0de0ae72be?w=800&h=800&fit=crop',
    ],
    minPrice: 38500000,
    maxPrice: 42000000,
    avgPrice: 40200000,
    rating: 4.7,
    reviewCount: 189,
    specs: { 'صفحه نمایش': '49mm Retina', 'مقاومت': '100 متر ضد آب', 'باتری': '36 ساعت', 'جنس بدنه': 'تیتانیوم', 'GPS': 'دقت دو فرکانسه' },
    description: 'مقاوم‌ترین و پیشرفته‌ترین اپل واچ برای ماجراجویان.',
    tags: ['تیتانیوم', 'ضد آب', 'ماجراجویی'],
    createdAt: '2024-02-10',
    isActive: true,
    sellers: [
      { id: 's13', name: 'دیجی‌کالا', price: 40500000, shippingCost: 0, deliveryDays: 2, rating: 4.8, warranty: '1 سال', inStock: true, url: '#' },
      { id: 's14', name: 'ساعت‌لند', price: 38500000, shippingCost: 0, deliveryDays: 4, rating: 4.4, warranty: '1 سال', inStock: true, url: '#' },
      { id: 's15', name: 'تکنولایف', price: 42000000, shippingCost: 0, deliveryDays: 2, rating: 4.5, warranty: '1 سال اپل', inStock: true, url: '#' },
    ],
  },
  {
    id: 'p6',
    title: 'دوربین کانن EOS R6 Mark II',
    brand: 'Canon',
    category: 'mobile',
    subcategory: 'لوازم جانبی موبایل',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=400&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&h=800&fit=crop',
    ],
    minPrice: 95000000,
    maxPrice: 105000000,
    avgPrice: 100000000,
    rating: 4.8,
    reviewCount: 95,
    specs: { 'سنسور': '24.2 مگاپیکسل Full-Frame', 'فیلمبرداری': '4K 60fps', 'ISO': '100-102400', 'فوکوس': 'Dual Pixel CMOS AF II', 'عکس پیاپی': '40 فریم/ثانیه' },
    description: 'دوربین بدون آینه حرفه‌ای با عملکرد فوق‌العاده در عکاسی و فیلمبرداری.',
    tags: ['حرفه‌ای', 'بدون آینه', '4K'],
    createdAt: '2024-01-25',
    isActive: true,
    sellers: [
      { id: 's16', name: 'دیجی‌کالا', price: 102000000, shippingCost: 0, deliveryDays: 3, rating: 4.8, warranty: '12 ماه', inStock: true, url: '#' },
      { id: 's17', name: 'کانن‌ایران', price: 95000000, shippingCost: 0, deliveryDays: 5, rating: 4.7, warranty: '24 ماه', inStock: true, url: '#' },
    ],
  },
];

export const orders: Order[] = [
  { id: 'ORD-001', productId: 'p1', productTitle: 'Galaxy S24 Ultra', sellerName: 'دیجی‌کالا', price: 54900000, status: 'delivered', date: '2024-03-15', customerName: 'علی محمدی' },
  { id: 'ORD-002', productId: 'p2', productTitle: 'MacBook Pro 16', sellerName: 'اپل‌استور', price: 145000000, status: 'shipped', date: '2024-03-18', customerName: 'مریم حسینی' },
  { id: 'ORD-003', productId: 'p3', productTitle: 'Sony WH-1000XM5', sellerName: 'صوت‌ایران', price: 14200000, status: 'processing', date: '2024-03-20', customerName: 'رضا کریمی' },
  { id: 'ORD-004', productId: 'p5', productTitle: 'Apple Watch Ultra 2', sellerName: 'ساعت‌لند', price: 38500000, status: 'pending', date: '2024-03-21', customerName: 'سارا احمدی' },
  { id: 'ORD-005', productId: 'p4', productTitle: 'LG OLED C3', sellerName: 'ال‌جی‌شاپ', price: 48000000, status: 'cancelled', date: '2024-03-19', customerName: 'حسن رضایی' },
  { id: 'ORD-006', productId: 'p6', productTitle: 'Canon EOS R6 II', sellerName: 'کانن‌ایران', price: 95000000, status: 'delivered', date: '2024-03-14', customerName: 'فاطمه نوری' },
  { id: 'ORD-007', productId: 'p1', productTitle: 'Galaxy S24 Ultra', sellerName: 'تکنولایف', price: 53500000, status: 'delivered', date: '2024-03-12', customerName: 'امیر جعفری' },
  { id: 'ORD-008', productId: 'p3', productTitle: 'Sony WH-1000XM5', sellerName: 'دیجی‌کالا', price: 13500000, status: 'shipped', date: '2024-03-22', customerName: 'نیلوفر صادقی' },
];

export const users: User[] = [
  { id: 'u1', name: 'علی محمدی', email: 'ali@example.com', role: 'user', joinDate: '2023-06-15', lastActive: '2024-03-22', status: 'active' },
  { id: 'u2', name: 'مریم حسینی', email: 'maryam@example.com', role: 'user', joinDate: '2023-08-20', lastActive: '2024-03-21', status: 'active' },
  { id: 'u3', name: 'رضا کریمی', email: 'reza@example.com', role: 'seller', joinDate: '2023-04-10', lastActive: '2024-03-22', status: 'active' },
  { id: 'u4', name: 'سارا احمدی', email: 'sara@example.com', role: 'user', joinDate: '2024-01-05', lastActive: '2024-03-20', status: 'active' },
  { id: 'u5', name: 'حسن رضایی', email: 'hasan@example.com', role: 'seller', joinDate: '2023-02-18', lastActive: '2024-03-19', status: 'inactive' },
  { id: 'u6', name: 'فاطمه نوری', email: 'fateme@example.com', role: 'user', joinDate: '2023-11-22', lastActive: '2024-03-22', status: 'active' },
  { id: 'u7', name: 'امیر جعفری', email: 'amir@example.com', role: 'admin', joinDate: '2022-12-01', lastActive: '2024-03-22', status: 'active' },
  { id: 'u8', name: 'نیلوفر صادقی', email: 'niloofar@example.com', role: 'user', joinDate: '2024-02-14', lastActive: '2024-03-22', status: 'active' },
];

export const dashboardStats: DashboardStats = {
  totalProducts: 28450,
  totalUsers: 156800,
  totalOrders: 45230,
  totalRevenue: 2850000000000,
  productsGrowth: 12.5,
  usersGrowth: 8.3,
  ordersGrowth: 15.2,
  revenueGrowth: 22.1,
};

export const formatPrice = (price: number): string => {
  return price.toLocaleString('fa-IR') + ' تومان';
};

export const formatNumber = (num: number): string => {
  if (num >= 1000000000) return (num / 1000000000).toFixed(1) + ' میلیارد';
  if (num >= 1000000) return (num / 1000000).toFixed(1) + ' میلیون';
  if (num >= 1000) return (num / 1000).toFixed(1) + ' هزار';
  return num.toString();
};
