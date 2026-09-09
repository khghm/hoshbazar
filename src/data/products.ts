export interface Shop {
  id: string;
  name: string;
  logo: string;
  rating: number;
  deliveryDays: string;
  warranty: string;
}

export interface PriceOffer {
  shopId: string;
  shopName: string;
  price: number;
  originalPrice?: number;
  inStock: boolean;
  deliveryDays: number;
  warranty: string;
  isSpecial?: boolean;
}

export interface Product {
  id: string;
  title: string;
  image: string;
  category: string;
  subcategory: string;
  brand: string;
  minPrice: number;
  maxPrice: number;
  avgPrice: number;
  offersCount: number;
  rating: number;
  reviewCount: number;
  offers: PriceOffer[];
  tags: string[];
  specs: Record<string, string>;
  description: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  subcategories: string[];
  count: number;
}

export const shops: Shop[] = [
  { id: 's1', name: 'دیجی‌کالا', logo: '🛒', rating: 4.5, deliveryDays: '۱-۳ روز', warranty: '۱۸ ماه' },
  { id: 's2', name: 'بامیلو', logo: '🏪', rating: 4.2, deliveryDays: '۲-۴ روز', warranty: '۱۲ ماه' },
  { id: 's3', name: 'تکنولایف', logo: '💻', rating: 4.3, deliveryDays: '۱-۲ روز', warranty: '۱۸ ماه' },
  { id: 's4', name: 'موبایل‌کالا', logo: '📱', rating: 4.1, deliveryDays: '۲-۵ روز', warranty: '۱۲ ماه' },
  { id: 's5', name: 'ایمالز', logo: '🏬', rating: 4.0, deliveryDays: '۳-۵ روز', warranty: '۱۲ ماه' },
  { id: 's6', name: 'مقداد آی‌تی', logo: '🖥️', rating: 4.4, deliveryDays: '۱-۳ روز', warranty: '۲۴ ماه' },
  { id: 's7', name: 'زنبیل', logo: '🧺', rating: 3.9, deliveryDays: '۲-۴ روز', warranty: '۱۲ ماه' },
  { id: 's8', name: 'پیندو', logo: '📦', rating: 4.0, deliveryDays: '۱-۳ روز', warranty: '۱۸ ماه' },
];

export const categories: Category[] = [
  { id: 'c1', name: 'موبایل و تبلت', icon: '📱', subcategories: ['گوشی موبایل', 'تبلت', 'لوازم جانبی'], count: 12450 },
  { id: 'c2', name: 'لپ‌تاپ و کامپیوتر', icon: '💻', subcategories: ['لپ‌تاپ', 'کامپیوتر رومیزی', 'مانیتور', 'قطعات'], count: 8320 },
  { id: 'c3', name: 'لوازم خانگی', icon: '🏠', subcategories: ['یخچال', 'ماشین لباسشویی', 'جاروبرقی', 'تلویزیون'], count: 6780 },
  { id: 'c4', name: 'مد و پوشاک', icon: '👔', subcategories: ['مردانه', 'زنانه', 'بچگانه', 'ورزشی'], count: 24500 },
  { id: 'c5', name: 'زیبایی و سلامت', icon: '💄', subcategories: ['آرایشی', 'بهداشتی', 'عطر', 'مراقبت پوست'], count: 15600 },
  { id: 'c6', name: 'ورزش و سفر', icon: '⚽', subcategories: ['دوچرخه', 'کوهنوردی', 'شنا', 'فیتنس'], count: 4300 },
  { id: 'c7', name: 'کتاب و لوازم‌التحریر', icon: '📚', subcategories: ['کتاب', 'دفتر', 'خودکار', 'لوازم نقاشی'], count: 9800 },
  { id: 'c8', name: 'اسباب‌بازی', icon: '🧸', subcategories: ['عروسک', 'فکری', 'ساختنی', 'آموزشی'], count: 5400 },
];

export const products: Product[] = [
  {
    id: 'p1',
    title: 'گوشی موبایل اپل مدل آیفون ۱۵ پرو مکس',
    image: '📱',
    category: 'موبایل و تبلت',
    subcategory: 'گوشی موبایل',
    brand: 'اپل',
    minPrice: 78500000,
    maxPrice: 89900000,
    avgPrice: 83200000,
    offersCount: 8,
    rating: 4.7,
    reviewCount: 1234,
    tags: ['پرفروش', 'جدید'],
    specs: { 'حافظه': '۲۵۶ گیگابایت', 'رم': '۸ گیگابایت', 'صفحه نمایش': '۶.۷ اینچ', 'دوربین': '۴۸ مگاپیکسل' },
    description: 'آیفون ۱۵ پرو مکس با تراشه A17 Pro، بدنه تیتانیومی و دوربین حرفه‌ای',
    offers: [
      { shopId: 's1', shopName: 'دیجی‌کالا', price: 78500000, originalPrice: 82000000, inStock: true, deliveryDays: 1, warranty: '۱۸ ماه گارانتی', isSpecial: true },
      { shopId: 's3', shopName: 'تکنولایف', price: 79900000, inStock: true, deliveryDays: 2, warranty: '۱۸ ماه گارانتی' },
      { shopId: 's4', shopName: 'موبایل‌کالا', price: 80500000, inStock: true, deliveryDays: 3, warranty: '۱۲ ماه گارانتی' },
      { shopId: 's6', shopName: 'مقداد آی‌تی', price: 81200000, originalPrice: 85000000, inStock: true, deliveryDays: 2, warranty: '۲۴ ماه گارانتی' },
      { shopId: 's8', shopName: 'پیندو', price: 89900000, inStock: false, deliveryDays: 0, warranty: '۱۸ ماه گارانتی' },
    ]
  },
  {
    id: 'p2',
    title: 'لپ‌تاپ ایسوس مدل ROG Strix G16',
    image: '💻',
    category: 'لپ‌تاپ و کامپیوتر',
    subcategory: 'لپ‌تاپ',
    brand: 'ایسوس',
    minPrice: 62000000,
    maxPrice: 71500000,
    avgPrice: 66800000,
    offersCount: 6,
    rating: 4.5,
    reviewCount: 567,
    tags: ['گیمینگ', 'محبوب'],
    specs: { 'پردازنده': 'Core i9-13980HX', 'رم': '۳۲ گیگابایت', 'گرافیک': 'RTX 4070', 'حافظه': '۱ ترابایت SSD' },
    description: 'لپ‌تاپ گیمینگ ایسوس با پردازنده نسل ۱۳ اینتل و گرافیک RTX 4070',
    offers: [
      { shopId: 's1', shopName: 'دیجی‌کالا', price: 63500000, originalPrice: 68000000, inStock: true, deliveryDays: 2, warranty: '۲۴ ماه گارانتی', isSpecial: true },
      { shopId: 's3', shopName: 'تکنولایف', price: 62000000, inStock: true, deliveryDays: 1, warranty: '۲۴ ماه گارانتی' },
      { shopId: 's6', shopName: 'مقداد آی‌تی', price: 64800000, inStock: true, deliveryDays: 2, warranty: '۲۴ ماه گارانتی' },
      { shopId: 's8', shopName: 'پیندو', price: 71500000, inStock: true, deliveryDays: 3, warranty: '۱۸ ماه گارانتی' },
    ]
  },
  {
    id: 'p3',
    title: 'تلویزیون ال‌جی مدل OLED C3 سایز ۵۵ اینچ',
    image: '📺',
    category: 'لوازم خانگی',
    subcategory: 'تلویزیون',
    brand: 'ال‌جی',
    minPrice: 45000000,
    maxPrice: 52000000,
    avgPrice: 48500000,
    offersCount: 5,
    rating: 4.8,
    reviewCount: 890,
    tags: ['پرفروش', 'تخفیف‌دار'],
    specs: { 'سایز': '۵۵ اینچ', 'رزولوشن': '4K UHD', 'پنل': 'OLED', 'نرخ نوسازی': '۱۲۰ هرتز' },
    description: 'تلویزیون OLED ال‌جی با کیفیت تصویر خیره‌کننده و قابلیت گیمینگ',
    offers: [
      { shopId: 's1', shopName: 'دیجی‌کالا', price: 46500000, originalPrice: 52000000, inStock: true, deliveryDays: 3, warranty: '۲۴ ماه گارانتی', isSpecial: true },
      { shopId: 's5', shopName: 'ایمالز', price: 45000000, inStock: true, deliveryDays: 4, warranty: '۱۸ ماه گارانتی' },
      { shopId: 's7', shopName: 'زنبیل', price: 48900000, inStock: true, deliveryDays: 3, warranty: '۲۴ ماه گارانتی' },
    ]
  },
  {
    id: 'p4',
    title: 'هدفون بی‌سیم سونی مدل WH-1000XM5',
    image: '🎧',
    category: 'موبایل و تبلت',
    subcategory: 'لوازم جانبی',
    brand: 'سونی',
    minPrice: 12500000,
    maxPrice: 15800000,
    avgPrice: 14200000,
    offersCount: 7,
    rating: 4.6,
    reviewCount: 2340,
    tags: ['پرفروش', 'نویز کنسلینگ'],
    specs: { 'نوع': 'بی‌سیم', 'عمر باتری': '۳۰ ساعت', 'نویز کنسلینگ': 'فعال', 'بلوتوث': '۵.۲' },
    description: 'هدفون بی‌سیم سونی با بهترین نویز کنسلینگ در جهان',
    offers: [
      { shopId: 's1', shopName: 'دیجی‌کالا', price: 12800000, originalPrice: 14500000, inStock: true, deliveryDays: 1, warranty: '۱۸ ماه گارانتی', isSpecial: true },
      { shopId: 's3', shopName: 'تکنولایف', price: 12500000, inStock: true, deliveryDays: 2, warranty: '۱۸ ماه گارانتی' },
      { shopId: 's4', shopName: 'موبایل‌کالا', price: 13200000, inStock: true, deliveryDays: 3, warranty: '۱۲ ماه گارانتی' },
      { shopId: 's8', shopName: 'پیندو', price: 15800000, inStock: true, deliveryDays: 2, warranty: '۱۸ ماه گارانتی' },
    ]
  },
  {
    id: 'p5',
    title: 'ساعت هوشمند اپل واچ سری ۹',
    image: '⌚',
    category: 'موبایل و تبلت',
    subcategory: 'لوازم جانبی',
    brand: 'اپل',
    minPrice: 22000000,
    maxPrice: 27500000,
    avgPrice: 24800000,
    offersCount: 6,
    rating: 4.4,
    reviewCount: 780,
    tags: ['جدید', 'سالمی'],
    specs: { 'سایز': '۴۵ میلی‌متر', 'صفحه نمایش': 'OLED', 'ضد آب': '۵۰ متر', 'باتری': '۱۸ ساعت' },
    description: 'اپل واچ سری ۹ با تراشه S9 و قابلیت‌های سلامتی پیشرفته',
    offers: [
      { shopId: 's1', shopName: 'دیجی‌کالا', price: 22500000, originalPrice: 25000000, inStock: true, deliveryDays: 1, warranty: '۱۸ ماه گارانتی', isSpecial: true },
      { shopId: 's3', shopName: 'تکنولایف', price: 22000000, inStock: true, deliveryDays: 2, warranty: '۱۸ ماه گارانتی' },
      { shopId: 's4', shopName: 'موبایل‌کالا', price: 23800000, inStock: true, deliveryDays: 4, warranty: '۱۲ ماه گارانتی' },
    ]
  },
  {
    id: 'p6',
    title: 'ماشین لباسشویی بوش مدل WAX32M42',
    image: '🫧',
    category: 'لوازم خانگی',
    subcategory: 'ماشین لباسشویی',
    brand: 'بوش',
    minPrice: 38000000,
    maxPrice: 44000000,
    avgPrice: 41000000,
    offersCount: 4,
    rating: 4.3,
    reviewCount: 345,
    tags: ['محبوب', 'کم‌مصرف'],
    specs: { 'ظرفیت': '۹ کیلوگرم', 'دور موتور': '۱۴۰۰ دور', 'مصرف انرژی': 'A+++', 'برنامه': '۱۴ برنامه' },
    description: 'ماشین لباسشویی بوش با تکنولوژی i-DOS و مصرف بهینه انرژی',
    offers: [
      { shopId: 's1', shopName: 'دیجی‌کالا', price: 39500000, originalPrice: 44000000, inStock: true, deliveryDays: 3, warranty: '۲۴ ماه گارانتی', isSpecial: true },
      { shopId: 's5', shopName: 'ایمالز', price: 38000000, inStock: true, deliveryDays: 5, warranty: '۲۴ ماه گارانتی' },
      { shopId: 's7', shopName: 'زنبیل', price: 42000000, inStock: true, deliveryDays: 4, warranty: '۲۴ ماه گارانتی' },
    ]
  },
  {
    id: 'p7',
    title: 'دوربین عکاسی کانن مدل EOS R6 Mark II',
    image: '📷',
    category: 'لپ‌تاپ و کامپیوتر',
    subcategory: 'قطعات',
    brand: 'کانن',
    minPrice: 95000000,
    maxPrice: 110000000,
    avgPrice: 102000000,
    offersCount: 3,
    rating: 4.9,
    reviewCount: 156,
    tags: ['حرفه‌ای', 'جدید'],
    specs: { 'سنسور': 'فول فریم ۲۴.۲ مگاپیکسل', 'فیلمبرداری': '4K 60fps', 'لرزشگیر': '۸ استاپ', 'فوکوس': 'Dual Pixel CMOS AF II' },
    description: 'دوربین بدون آینه کانن با سنسور فول‌فریم و عملکرد فوق‌العاده',
    offers: [
      { shopId: 's1', shopName: 'دیجی‌کالا', price: 98000000, originalPrice: 110000000, inStock: true, deliveryDays: 2, warranty: '۱۸ ماه گارانتی', isSpecial: true },
      { shopId: 's6', shopName: 'مقداد آی‌تی', price: 95000000, inStock: true, deliveryDays: 3, warranty: '۲۴ ماه گارانتی' },
    ]
  },
  {
    id: 'p8',
    title: 'تبلت سامسونگ مدل Galaxy Tab S9 Ultra',
    image: '📲',
    category: 'موبایل و تبلت',
    subcategory: 'تبلت',
    brand: 'سامسونگ',
    minPrice: 52000000,
    maxPrice: 59000000,
    avgPrice: 55500000,
    offersCount: 5,
    rating: 4.6,
    reviewCount: 432,
    tags: ['پرفروش', 'S Pen'],
    specs: { 'صفحه نمایش': '۱۴.۶ اینچ AMOLED', 'پردازنده': 'Snapdragon 8 Gen 2', 'رم': '۱۲ گیگابایت', 'حافظه': '۲۵۶ گیگابایت' },
    description: 'تبلت پرچمدار سامسونگ با صفحه نمایش بزرگ و قلم S Pen',
    offers: [
      { shopId: 's1', shopName: 'دیجی‌کالا', price: 53500000, originalPrice: 59000000, inStock: true, deliveryDays: 1, warranty: '۱۸ ماه گارانتی', isSpecial: true },
      { shopId: 's3', shopName: 'تکنولایف', price: 52000000, inStock: true, deliveryDays: 2, warranty: '۱۸ ماه گارانتی' },
      { shopId: 's4', shopName: 'موبایل‌کالا', price: 54800000, inStock: true, deliveryDays: 3, warranty: '۱۲ ماه گارانتی' },
    ]
  },
];

export const trendingSearches = [
  'آیفون ۱۵ پرو',
  'لپ‌تاپ گیمینگ',
  'ایرپاد پرو ۲',
  'پلی‌استیشن ۵',
  'گلکسی S24 اولترا',
  'مک‌بوک ایر M3',
  'هدفون سونی',
  'تبلت آیپد',
];
