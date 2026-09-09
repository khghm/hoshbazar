import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-text-primary text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">HB</span>
              </div>
              <h3 className="text-lg font-bold">هوش‌بازار</h3>
            </div>
            <p className="text-sm text-gray-400 leading-7">
              هوش‌بازار بزرگ‌ترین موتور جستجو و مقایسه قیمت در ایران. با ما بهترین قیمت را از هزاران فروشگاه معتبر پیدا کنید.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4 text-sm">دسترسی سریع</h4>
            <ul className="space-y-2.5">
              {['صفحه اصلی', 'دسته‌بندی‌ها', 'تخفیف‌های ویژه', 'جدیدترین‌ها', 'پرفروش‌ترین‌ها'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4 text-sm">خدمات</h4>
            <ul className="space-y-2.5">
              {['هشدار کاهش قیمت', 'افزودن فروشگاه', 'API توسعه‌دهندگان', 'اپلیکیشن موبایل', 'همکاری در فروش'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-sm">ارتباط با ما</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary-400" />
                <span className="text-sm text-gray-400">info@hooshbazar.ir</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary-400" />
                <span className="text-sm text-gray-400">۰۲۱-۱۲۳۴۵۶۷۸</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary-400" />
                <span className="text-sm text-gray-400">تهران، خیابان ولیعصر</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 flex items-center justify-between flex-wrap gap-4">
          <p className="text-xs text-gray-500">© ۱۴۰۳ هوش‌بازار — تمامی حقوق محفوظ است</p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center">
              <span className="text-[10px] text-gray-400 font-medium">نماد</span>
            </div>
            <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center">
              <span className="text-[10px] text-gray-400 font-medium">eNamad</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
