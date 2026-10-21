import React, { useState, useEffect } from 'react';
import {
  Send,
  Phone,
  User,
  PhoneCall,
  MapPin,
  Package,
  Utensils,
  Calendar,
  Users,
  MessageSquare,
  AlertCircle,
  CheckCircle,
} from 'lucide-react';
import { SITE_CONFIG, buildWhatsAppUrl } from '../data/content';
import type { BookingFormData } from '../types';

interface BookingFormProps {
  initialRoute?: string;
  initialPackage?: string;
}

export const BookingForm: React.FC<BookingFormProps> = ({
  initialRoute = 'مصر ← المدينة المنورة ← مكة المكرمة',
  initialPackage = 'باقة تشمل الوجبات',
}) => {
  const [formData, setFormData] = useState<BookingFormData>({
    fullName: '',
    phone: '',
    route: initialRoute,
    packageType: initialPackage,
    meals: 'تشمل الوجبات (فطور وعشاء وفق البرنامج)',
    travelDate: '',
    travelersCount: '1 فرد',
    notes: '',
  });

  const [errors, setErrors] = useState<{ fullName?: string; phone?: string }>({});
  const [statusMessage, setStatusMessage] = useState<{
    type: 'success' | 'error' | 'info';
    text: string;
  } | null>(null);

  // Sync props if changed from outside (e.g. clicking "احجز هذه الباقة")
  useEffect(() => {
    if (initialRoute) {
      setFormData((prev) => ({ ...prev, route: initialRoute }));
    }
  }, [initialRoute]);

  useEffect(() => {
    if (initialPackage) {
      setFormData((prev) => ({
        ...prev,
        packageType: initialPackage,
        meals:
          initialPackage === 'باقة بدون وجبات'
            ? 'بدون وجبات (يتحمل المعتمر طعامه)'
            : 'تشمل الوجبات (فطور وعشاء وفق البرنامج)',
      }));
    }
  }, [initialPackage]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear specific error
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handlePackageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPkg = e.target.value;
    let autoMeal = 'تشمل الوجبات (فطور وعشاء وفق البرنامج)';
    if (selectedPkg === 'باقة بدون وجبات') {
      autoMeal = 'بدون وجبات (يتحمل المعتمر طعامه)';
    } else if (selectedPkg === 'باقات عائلية ومخصصة') {
      autoMeal = 'حسب الاتفاق والتنسيق';
    }

    setFormData((prev) => ({
      ...prev,
      packageType: selectedPkg,
      meals: autoMeal,
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: { fullName?: string; phone?: string } = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'يرجى إدخال الاسم الكامل للتواصل';
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName = 'يرجى كتابة الاسم الثلاثي على الأقل';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'يرجى إدخال رقم الهاتف أو الواتساب';
    } else if (formData.phone.trim().length < 7) {
      newErrors.phone = 'يرجى إدخال رقم هاتف صحيح';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      setStatusMessage({
        type: 'error',
        text: 'يرجى استكمال الحقول الإلزامية (الاسم ورقم الهاتف) للمتابعة.',
      });
      return;
    }

    // Build WhatsApp URL with the exact template required
    const whatsappUrl = buildWhatsAppUrl(formData);

    setStatusMessage({
      type: 'info',
      text: 'جاري فتح محادثة واتساب وتجهيز رسالتك تلقائيًا...',
    });

    try {
      // Open in new tab/window
      const win = window.open(whatsappUrl, '_blank');
      if (win) {
        win.focus();
        setStatusMessage({
          type: 'success',
          text: 'تم تجهيز رسالتك بنجاح! اضغط إرسال في واتساب للتواصل مع أ. أسماء عبدالكريم.',
        });
      } else {
        // Fallback for pop-up blocked
        window.location.href = whatsappUrl;
      }
    } catch {
      setStatusMessage({
        type: 'error',
        text: 'تعذر فتح الرابط تلقائيًا. يمكنك نسخ الرابط أو التواصل مباشرة على: ' + SITE_CONFIG.whatsappEgypt,
      });
    }
  };

  return (
    <section id="booking" className="py-16 lg:py-24 bg-[#f4eee2] relative overflow-hidden" dir="rtl">
      {/* Background Accent */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#e8ded0] border border-[#d5c7b3] text-[#8d6919] text-xs font-bold mb-3">
            <MessageSquare className="w-3.5 h-3.5 text-[#b3881e]" />
            <span>حجز واستفسار فوري عبر واتساب</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-[#0c3227] tracking-tight mb-4">
            احجز رحلتك أو استفسر عن كافة التفاصيل
          </h2>

          <p className="text-base text-[#4f5d56] leading-relaxed">
            املأ بياناتك أدناه وسيقوم النظام بتجهيز رسالة واتساب منسقة ومباشرة لإرسالها للأستاذة {SITE_CONFIG.supervisor} للرد على كافة استفساراتكم.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Form (8 Cols) */}
          <div className="lg:col-span-8 bg-white rounded-2xl p-6 sm:p-9 border border-[#ded5c2] shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Row 1: Full Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold text-[#1a2e26] mb-2 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#b3881e]" />
                    <span>الاسم الكامل <span className="text-red-500">*</span></span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="مثال: أحمد محمد عبدالسلام"
                    className={`w-full px-4 py-3 text-sm rounded-xl border transition-all text-right focus:outline-none ${
                      errors.fullName
                        ? 'border-red-400 bg-red-50/50 focus:border-red-500'
                        : 'border-[#d8cfbe] bg-[#fdfbf7] focus:border-[#0c3227] focus:bg-white'
                    }`}
                  />
                  {errors.fullName && (
                    <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.fullName}</span>
                    </p>
                  )}
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-xs font-bold text-[#1a2e26] mb-2 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#b3881e]" />
                    <span>رقم الهاتف / واتساب <span className="text-red-500">*</span></span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="مثال: 01012345678"
                    dir="ltr"
                    className={`w-full px-4 py-3 text-sm rounded-xl border transition-all text-right focus:outline-none ${
                      errors.phone
                        ? 'border-red-400 bg-red-50/50 focus:border-red-500'
                        : 'border-[#d8cfbe] bg-[#fdfbf7] focus:border-[#0c3227] focus:bg-white'
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.phone}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Row 2: Route & Package */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Route Selector */}
                <div>
                  <label className="block text-xs font-bold text-[#1a2e26] mb-2 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#b3881e]" />
                    <span>مسار الرحلة المفضل (15 يومًا)</span>
                  </label>
                  <select
                    name="route"
                    value={formData.route}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-sm rounded-xl border border-[#d8cfbe] bg-[#fdfbf7] text-[#1a2e26] focus:outline-none focus:border-[#0c3227] focus:bg-white transition-all"
                  >
                    <option value="مصر ← المدينة المنورة ← مكة المكرمة">
                      مصر ← المدينة المنورة ← مكة المكرمة
                    </option>
                    <option value="مصر ← مكة المكرمة ← المدينة المنورة">
                      مصر ← مكة المكرمة ← المدينة المنورة
                    </option>
                  </select>
                </div>

                {/* Package Selector */}
                <div>
                  <label className="block text-xs font-bold text-[#1a2e26] mb-2 flex items-center gap-1.5">
                    <Package className="w-3.5 h-3.5 text-[#b3881e]" />
                    <span>الباقة المطلوبة</span>
                  </label>
                  <select
                    name="packageType"
                    value={formData.packageType}
                    onChange={handlePackageChange}
                    className="w-full px-4 py-3 text-sm rounded-xl border border-[#d8cfbe] bg-[#fdfbf7] text-[#1a2e26] focus:outline-none focus:border-[#0c3227] focus:bg-white transition-all"
                  >
                    <option value="باقة تشمل الوجبات">باقة تشمل الوجبات (الأكثر طلبًا)</option>
                    <option value="باقة بدون وجبات">باقة بدون وجبات (اقتصادية)</option>
                    <option value="باقات عائلية ومخصصة">باقات عائلية ومخصصة</option>
                  </select>
                </div>
              </div>

              {/* Row 3: Meals & Travelers Count */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {/* Meals */}
                <div>
                  <label className="block text-xs font-bold text-[#1a2e26] mb-2 flex items-center gap-1.5">
                    <Utensils className="w-3.5 h-3.5 text-[#b3881e]" />
                    <span>نظام الوجبات</span>
                  </label>
                  <select
                    name="meals"
                    value={formData.meals}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-xs sm:text-sm rounded-xl border border-[#d8cfbe] bg-[#fdfbf7] text-[#1a2e26] focus:outline-none focus:border-[#0c3227] focus:bg-white transition-all"
                  >
                    <option value="تشمل الوجبات (فطور وعشاء وفق البرنامج)">
                      تشمل الوجبات (فطور وعشاء)
                    </option>
                    <option value="بدون وجبات (يتحمل المعتمر طعامه)">
                      بدون وجبات (حرية المعتمر)
                    </option>
                    <option value="حسب الاتفاق والتنسيق">
                      حسب الاتفاق والتنسيق
                    </option>
                  </select>
                </div>

                {/* Preferred Date (Optional) */}
                <div>
                  <label className="block text-xs font-bold text-[#1a2e26] mb-2 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#b3881e]" />
                    <span>موعد السفر المفضل (اختياري)</span>
                  </label>
                  <input
                    type="date"
                    name="travelDate"
                    value={formData.travelDate}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-sm rounded-xl border border-[#d8cfbe] bg-[#fdfbf7] text-[#1a2e26] focus:outline-none focus:border-[#0c3227] focus:bg-white transition-all"
                  />
                </div>

                {/* Travelers Count */}
                <div>
                  <label className="block text-xs font-bold text-[#1a2e26] mb-2 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-[#b3881e]" />
                    <span>عدد المسافرين</span>
                  </label>
                  <select
                    name="travelersCount"
                    value={formData.travelersCount}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-sm rounded-xl border border-[#d8cfbe] bg-[#fdfbf7] text-[#1a2e26] focus:outline-none focus:border-[#0c3227] focus:bg-white transition-all"
                  >
                    <option value="1 فرد">1 فرد</option>
                    <option value="2 أفراد">2 أفراد (ثنائي)</option>
                    <option value="3 أفراد">3 أفراد (ثلاثي)</option>
                    <option value="4 أفراد">4 أفراد (رباعي)</option>
                    <option value="5 أفراد أو أكثر (عائلة)">5 أفراد أو أكثر (عائلة)</option>
                  </select>
                </div>
              </div>

              {/* Row 4: Notes */}
              <div>
                <label className="block text-xs font-bold text-[#1a2e26] mb-2">
                  ملاحظات أو رغبات إضافية (اختياري)
                </label>
                <textarea
                  name="notes"
                  rows={3}
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="أي رغبات خاصة بشأن الغرف، كبار السن، أو مواعيد الطيران..."
                  className="w-full px-4 py-3 text-sm rounded-xl border border-[#d8cfbe] bg-[#fdfbf7] text-[#1a2e26] focus:outline-none focus:border-[#0c3227] focus:bg-white transition-all resize-none"
                />
              </div>

              {/* Status Message if any */}
              {statusMessage && (
                <div
                  className={`p-4 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2.5 ${
                    statusMessage.type === 'error'
                      ? 'bg-red-50 text-red-800 border border-red-200'
                      : statusMessage.type === 'success'
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : 'bg-amber-50 text-amber-800 border border-amber-200'
                  }`}
                >
                  {statusMessage.type === 'error' ? (
                    <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                  ) : (
                    <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  )}
                  <span>{statusMessage.text}</span>
                </div>
              )}

              {/* Submit Buttons Strip */}
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-3 border-t border-[#eee8dc]">
                {/* WhatsApp Submit Button */}
                <button
                  type="submit"
                  className="w-full sm:flex-1 py-4 px-6 bg-gradient-to-l from-[#d4af37] via-[#e5c158] to-[#c59b27] hover:from-[#c59b27] hover:to-[#b3881e] text-[#0c3227] font-black text-sm sm:text-base rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2.5 active:scale-[0.98]"
                >
                  <Send className="w-4 h-4" />
                  <span>احجز واستفسر عبر واتساب</span>
                  <span className="text-xs bg-[#0c3227]/10 px-2 py-0.5 rounded-full font-bold">
                    واتساب مصر
                  </span>
                </button>

                {/* Saudi Direct Phone Call Button */}
                <a
                  href={`tel:${SITE_CONFIG.ksaPhoneTel}`}
                  className="w-full sm:w-auto py-4 px-6 bg-[#0c3227] hover:bg-[#07241c] text-white font-bold text-sm sm:text-base rounded-xl shadow-md transition-all flex items-center justify-center gap-2 whitespace-nowrap active:scale-[0.98]"
                >
                  <PhoneCall className="w-4 h-4 text-[#e5c158]" />
                  <span>اتصل داخل السعودية</span>
                </a>
              </div>

              <p className="text-[11px] text-[#798880] text-center">
                * عند الضغط على زر الحجز، سيتم فتح تطبيق واتساب وتجهيز نص الرسالة تلقائيًا لتعتمدها وترسلها بنفسك.
              </p>
            </form>
          </div>

          {/* Supervisor & Contact Sidecard (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Supervisor Info Card */}
            <div className="bg-[#0c3227] text-white rounded-2xl p-6 sm:p-7 shadow-xl border border-[#215a48] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4af37]/10 rounded-full blur-2xl pointer-events-none" />

              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-[#d4af37]/20 border border-[#d4af37]/40 flex items-center justify-center text-[#f5d77f] mb-4">
                  <User className="w-7 h-7" />
                </div>

                <span className="text-[11px] font-bold px-3 py-1 bg-[#164939] text-[#f5d77f] rounded-full border border-[#d4af37]/30">
                  المشرفة السياحية المباشرة
                </span>

                <h3 className="text-xl font-black text-white mt-3 mb-1">
                  أ. {SITE_CONFIG.supervisor}
                </h3>
                <p className="text-xs text-[#b8ccc4] mb-6">
                  خبرة وتفانٍ في إدارة وتنظيم وتيسير رحلات العمرة الجماعية لضيوف الرحمن.
                </p>

                <div className="space-y-4 pt-4 border-t border-[#1a513f]">
                  {/* WhatsApp Egypt */}
                  <div>
                    <span className="block text-[11px] text-[#9bb0a7] mb-1">
                      واتساب مصر للاستفسار والحجز:
                    </span>
                    <a
                      href={`https://wa.me/${SITE_CONFIG.whatsappEgyptDigits}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base font-bold text-[#f5d77f] hover:underline flex items-center gap-2"
                      dir="ltr"
                    >
                      <MessageSquare className="w-4 h-4 text-[#e5c158]" />
                      <span>{SITE_CONFIG.whatsappEgypt}</span>
                    </a>
                  </div>

                  {/* KSA Local Call */}
                  <div>
                    <span className="block text-[11px] text-[#9bb0a7] mb-1">
                      رقم الاتصال المباشر داخل السعودية:
                    </span>
                    <a
                      href={`tel:${SITE_CONFIG.ksaPhoneTel}`}
                      className="text-base font-bold text-white hover:underline flex items-center gap-2"
                      dir="ltr"
                    >
                      <Phone className="w-4 h-4 text-[#e5c158]" />
                      <span>{SITE_CONFIG.ksaPhone}</span>
                    </a>
                  </div>

                  <div className="pt-2 text-[11px] text-[#9bb0a7] leading-relaxed">
                    <p>• رحلة جماعية لمدة 15 يومًا</p>
                    <p>• إرشاد شخصي ومتابعة لكافة المناسك</p>
                    <p>• تنسيق الغرف ومرافقة كبار السن</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Live Message Preview Card */}
            <div className="bg-white rounded-2xl p-5 border border-[#ded5c2] shadow-sm">
              <div className="flex items-center justify-between gap-2 mb-3 pb-2 border-b border-[#eee8dc]">
                <span className="text-xs font-bold text-[#0c3227]">
                  معاينة رسالة واتساب المجهزة:
                </span>
                <span className="text-[10px] text-[#808d85] bg-[#f5efe4] px-2 py-0.5 rounded">
                  تحديث تلقائي
                </span>
              </div>

              <div className="bg-[#fcfaf5] p-3.5 rounded-xl border border-[#ece4d3] text-xs text-[#2c3c34] font-mono leading-relaxed whitespace-pre-line text-right select-all">
                {`السلام عليكم أستاذة أسماء عبدالكريم، أرغب في الاستفسار عن رحلة عمرة لمدة 15 يومًا.

الاسم: ${formData.fullName.trim() || '[اسم العميل]'}
رقم الهاتف: ${formData.phone.trim() || '[رقم العميل]'}
مسار الرحلة: ${formData.route}
الباقة: ${formData.packageType}
الوجبات: ${formData.meals}${
                  formData.travelDate ? `\nموعد السفر: ${formData.travelDate}` : ''
                }${
                  formData.travelersCount ? `\nعدد المسافرين: ${formData.travelersCount}` : ''
                }${
                  formData.notes ? `\nملاحظات إضافية: ${formData.notes.trim()}` : ''
                }

أرجو إرسال تفاصيل الرحلة والسعر والخدمات المشمولة. شكرًا لكم.`}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
