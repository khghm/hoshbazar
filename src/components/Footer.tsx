import { Settings, Phone, Mail, MapPin } from 'lucide-react';

interface FooterProps {
  onAdminClick: () => void;
}

export default function Footer({ onAdminClick }: FooterProps) {
  return (
    <footer className="bg-white border-t border-gray-100 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-[#e84a4a] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">هـ</span>
              </div>
              <span className="text-lg font-bold text-gray-800">هوش‌بازار</span>
            </div>
            <p className="text-sm text-gray-500 leading-6">
              هوش‌بازار، موتور جستجو و مقایسه قیمت محصولات از هزاران فروشگاه معتبر. بهترین قیمت را پیدا کنید و با اطمینان خرید کنید.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-gray-800 mb-3">دسترسی سریع</h4>
            <ul className="space-y-2">
              {['درباره ما', 'تماس با ما', 'قوانین و مقررات', 'حریم خصوصی', 'راهنمای خرید'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-gray-500 hover:text-[#e84a4a] transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-sm font-bold text-gray-800 mb-3">دسته‌بندی‌ها</h4>
            <ul className="space-y-2">
              {['موبایل و تبلت', 'لپ‌تاپ و کامپیوتر', 'لوازم خانگی', 'مد و پوشاک', 'زیبایی و سلامت'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-gray-500 hover:text-[#e84a4a] transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-bold text-gray-800 mb-3">ارتباط با ما</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-gray-500">
                <Phone className="w-4 h-4 text-gray-400" />
                ۰۲۱-۱۲۳۴۵۶۷۸
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-500">
                <Mail className="w-4 h-4 text-gray-400" />
                info@hooshbazar.ir
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-500">
                <MapPin className="w-4 h-4 text-gray-400" />
                تهران، خیابان ولیعصر
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-100 pt-6 flex items-center justify-between flex-wrap gap-3">
          <p className="text-xs text-gray-400">
            © ۱۴۰۳ هوش‌بازار. تمامی حقوق محفوظ است.
          </p>
          <button
            onClick={onAdminClick}
            className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-[#e84a4a] transition-colors"
          >
            <Settings className="w-3.5 h-3.5" />
            پنل مدیریت
          </button>
        </div>
      </div>
    </footer>
  );
}
