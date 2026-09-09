export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 mt-12">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">هـ</span>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">هوش‌بازار</h3>
                <p className="text-xs text-gray-400">مقایسه هوشمند قیمت‌ها</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-6">
              هوش‌بازار بزرگ‌ترین موتور جستجوی کالا و مقایسه قیمت در ایران است.
              با ما بهترین قیمت را از هزاران فروشگاه آنلاین پیدا کنید.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-4">دسترسی سریع</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-gray-400 hover:text-pink-400 transition-colors duration-200">صفحه اصلی</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-pink-400 transition-colors duration-200">دسته‌بندی‌ها</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-pink-400 transition-colors duration-200">تخفیف‌های ویژه</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-pink-400 transition-colors duration-200">جدیدترین محصولات</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-pink-400 transition-colors duration-200">بلاگ</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-bold mb-4">خدمات</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-gray-400 hover:text-pink-400 transition-colors duration-200">هشدار کاهش قیمت</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-pink-400 transition-colors duration-200">افزودن فروشگاه</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-pink-400 transition-colors duration-200">API توسعه‌دهندگان</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-pink-400 transition-colors duration-200">اپلیکیشن موبایل</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-pink-400 transition-colors duration-200">همکاری در فروش</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-4">ارتباط با ما</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <i className="fas fa-envelope text-pink-400"></i>
                <span className="text-sm text-gray-400">info@hooshbazar.ir</span>
              </li>
              <li className="flex items-center gap-2">
                <i className="fas fa-phone text-pink-400"></i>
                <span className="text-sm text-gray-400">۰۲۱-۱۲۳۴۵۶۷۸</span>
              </li>
              <li className="flex items-center gap-2">
                <i className="fas fa-map-marker-alt text-pink-400"></i>
                <span className="text-sm text-gray-400">تهران، خیابان ولیعصر</span>
              </li>
            </ul>
            <div className="flex items-center gap-3 mt-4">
              <a href="#" className="w-8 h-8 bg-gray-700 hover:bg-pink-500 rounded-lg flex items-center justify-center transition-colors duration-200">
                <i className="fab fa-instagram text-sm"></i>
              </a>
              <a href="#" className="w-8 h-8 bg-gray-700 hover:bg-pink-500 rounded-lg flex items-center justify-center transition-colors duration-200">
                <i className="fab fa-twitter text-sm"></i>
              </a>
              <a href="#" className="w-8 h-8 bg-gray-700 hover:bg-pink-500 rounded-lg flex items-center justify-center transition-colors duration-200">
                <i className="fab fa-telegram text-sm"></i>
              </a>
              <a href="#" className="w-8 h-8 bg-gray-700 hover:bg-pink-500 rounded-lg flex items-center justify-center transition-colors duration-200">
                <i className="fab fa-linkedin text-sm"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-700 mt-8 pt-6 flex items-center justify-between flex-wrap gap-4">
          <p className="text-xs text-gray-500">
            © ۱۴۰۳ هوش‌بازار - تمامی حقوق محفوظ است
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-500">نماد اعتماد الکترونیکی</span>
            <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center">
              <i className="fas fa-shield-alt text-blue-400"></i>
            </div>
            <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center">
              <i className="fas fa-certificate text-green-400"></i>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
