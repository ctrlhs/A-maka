import React, { useState, useEffect } from 'react';
import {
  Phone,
  User,
  MapPin,
  Package,
  ForkKnife,
  CalendarBlank,
  Users,
  WarningCircle,
  CheckCircle,
  WhatsappLogo,
} from '@phosphor-icons/react';
import { SITE_CONFIG, buildWhatsAppUrl } from '../data/content';
import type { BookingFormData } from '../types';

interface BookingFormProps {
  initialRoute?: string;
  initialPackage?: string;
}

export const BookingForm: React.FC<BookingFormProps> = ({
  initialRoute = 'مسار رحلة العمرة من أسوان إلى المملكة (15 يومًا)',
  initialPackage = 'باقة تشمل الوجبات',
}) => {
  const [formData, setFormData] = useState<BookingFormData>({
    fullName: '',
    phone: '',
    route: initialRoute,
    packageType: initialPackage,
    meals: 'تشمل الوجبات (فطور وعشاء وفق برنامج الرحلة)',
    travelDate: '',
    travelersCount: '1 فرد',
    notes: '',
  });

  const [errors, setErrors] = useState<{ fullName?: string; phone?: string }>({});
  const [statusMessage, setStatusMessage] = useState<{
    type: 'success' | 'error' | 'info';
    text: string;
  } | null>(null);

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
            : 'تشمل الوجبات (فطور وعشاء وفق برنامج الرحلة)',
      }));
    }
  }, [initialPackage]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handlePackageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPkg = e.target.value;
    let autoMeal = 'تشمل الوجبات (فطور وعشاء وفق برنامج الرحلة)';
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

    const whatsappUrl = buildWhatsAppUrl(formData);

    setStatusMessage({
      type: 'info',
      text: 'جاري فتح محادثة واتساب وتجهيز رسالتك...',
    });

    try {
      const win = window.open(whatsappUrl, '_blank');
      if (win) {
        win.focus();
        setStatusMessage({
          type: 'success',
          text: 'تم تجهيز رسالتك بنجاح! اضغط إرسال في واتساب للتواصل مع أ. أسماء عبدالكريم.',
        });
      } else {
        window.location.href = whatsappUrl;
      }
    } catch {
      setStatusMessage({
        type: 'error',
        text: 'تعذر فتح الرابط تلقائيًا. يمكنك التواصل مباشرة على: ' + SITE_CONFIG.whatsappEgypt,
      });
    }
  };

  return (
    <section id="booking" className="py-16 lg:py-20 bg-[#f4eee2] relative overflow-hidden" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-4xl font-black text-[#0c3227] tracking-tight mb-3">
            حجز واستفسار عن الرحلة
          </h2>
          <p className="text-sm sm:text-base text-[#4f5d56] leading-relaxed">
            املأ بياناتك أدناه وسيقوم النظام بتجهيز رسالة واتساب مباشرة لإرسالها للأستاذة {SITE_CONFIG.supervisor}.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Form */}
          <div className="lg:col-span-8 bg-white rounded-2xl p-6 sm:p-8 border border-[#ded5c2] shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Row 1: Full Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#1a2e26] mb-1.5 flex items-center gap-1.5">
                    <User size={14} className="text-[#b3881e]" />
                    <span>الاسم الكامل <span className="text-red-500">*</span></span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="مثال: أحمد محمد عبدالسلام"
                    className={`w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border transition-all text-right focus:outline-none ${
                      errors.fullName
                        ? 'border-red-400 bg-red-50/50'
                        : 'border-[#d8cfbe] bg-[#fdfbf7] focus:border-[#0c3227] focus:bg-white'
                    }`}
                  />
                  {errors.fullName && (
                    <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                      <WarningCircle size={14} />
                      <span>{errors.fullName}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1a2e26] mb-1.5 flex items-center gap-1.5">
                    <Phone size={14} className="text-[#b3881e]" />
                    <span>رقم الهاتف / واتساب <span className="text-red-500">*</span></span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="مثال: 01012345678"
                    dir="ltr"
                    className={`w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border transition-all text-right focus:outline-none ${
                      errors.phone
                        ? 'border-red-400 bg-red-50/50'
                        : 'border-[#d8cfbe] bg-[#fdfbf7] focus:border-[#0c3227] focus:bg-white'
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                      <WarningCircle size={14} />
                      <span>{errors.phone}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Row 2: Route & Package */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#1a2e26] mb-1.5 flex items-center gap-1.5">
                    <MapPin size={14} className="text-[#b3881e]" />
                    <span>خط سير الرحلة</span>
                  </label>
                  <input
                    type="text"
                    readOnly
                    value="انطلاق من أسوان إلى المملكة (15 يومًا)"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-[#d8cfbe] bg-[#f6f2e8] text-[#0c3227] font-semibold cursor-default"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1a2e26] mb-1.5 flex items-center gap-1.5">
                    <Package size={14} className="text-[#b3881e]" />
                    <span>الباقة المطلوبة</span>
                  </label>
                  <select
                    name="packageType"
                    value={formData.packageType}
                    onChange={handlePackageChange}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-[#d8cfbe] bg-[#fdfbf7] text-[#1a2e26] focus:outline-none focus:border-[#0c3227] focus:bg-white transition-all"
                  >
                    <option value="باقة تشمل الوجبات">باقة تشمل الوجبات (فطور وعشاء)</option>
                    <option value="باقة بدون وجبات">باقة بدون وجبات (اقتصادية)</option>
                    <option value="باقات عائلية ومخصصة">باقات عائلية ومخصصة</option>
                  </select>
                </div>
              </div>

              {/* Row 3: Meals & Travelers Count */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#1a2e26] mb-1.5 flex items-center gap-1.5">
                    <ForkKnife size={14} className="text-[#b3881e]" />
                    <span>نظام الوجبات</span>
                  </label>
                  <select
                    name="meals"
                    value={formData.meals}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-[#d8cfbe] bg-[#fdfbf7] text-[#1a2e26] focus:outline-none focus:border-[#0c3227] focus:bg-white transition-all"
                  >
                    <option value="تشمل الوجبات (فطور وعشاء وفق برنامج الرحلة)">
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

                <div>
                  <label className="block text-xs font-bold text-[#1a2e26] mb-1.5 flex items-center gap-1.5">
                    <CalendarBlank size={14} className="text-[#b3881e]" />
                    <span>موعد السفر المفضل (اختياري)</span>
                  </label>
                  <input
                    type="date"
                    name="travelDate"
                    value={formData.travelDate}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-[#d8cfbe] bg-[#fdfbf7] text-[#1a2e26] focus:outline-none focus:border-[#0c3227] focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1a2e26] mb-1.5 flex items-center gap-1.5">
                    <Users size={14} className="text-[#b3881e]" />
                    <span>عدد المسافرين</span>
                  </label>
                  <select
                    name="travelersCount"
                    value={formData.travelersCount}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-[#d8cfbe] bg-[#fdfbf7] text-[#1a2e26] focus:outline-none focus:border-[#0c3227] focus:bg-white transition-all"
                  >
                    <option value="1 فرد">1 فرد</option>
                    <option value="2 أفراد">2 أفراد</option>
                    <option value="3 أفراد">3 أفراد</option>
                    <option value="4 أفراد">4 أفراد</option>
                    <option value="5 أفراد أو أكثر (عائلة)">5 أفراد أو أكثر</option>
                  </select>
                </div>
              </div>

              {/* Row 4: Notes */}
              <div>
                <label className="block text-xs font-bold text-[#1a2e26] mb-1.5">
                  ملاحظات إضافية (اختياري)
                </label>
                <textarea
                  name="notes"
                  rows={2}
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="أي رغبات خاصة بشأن الغرف أو كبار السن..."
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-[#d8cfbe] bg-[#fdfbf7] text-[#1a2e26] focus:outline-none focus:border-[#0c3227] focus:bg-white transition-all resize-none"
                />
              </div>

              {/* Status Message */}
              {statusMessage && (
                <div
                  className={`p-3 rounded-xl text-xs font-semibold flex items-center gap-2 ${
                    statusMessage.type === 'error'
                      ? 'bg-red-50 text-red-800 border border-red-200'
                      : statusMessage.type === 'success'
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : 'bg-amber-50 text-amber-800 border border-amber-200'
                  }`}
                >
                  {statusMessage.type === 'error' ? (
                    <WarningCircle size={16} className="text-red-600 flex-shrink-0" />
                  ) : (
                    <CheckCircle size={16} weight="fill" className="text-emerald-600 flex-shrink-0" />
                  )}
                  <span>{statusMessage.text}</span>
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-3 border-t border-[#eee8dc]">
                <button
                  type="submit"
                  className="w-full py-3 px-5 bg-gradient-to-l from-[#d4af37] via-[#e5c158] to-[#c59b27] hover:from-[#c59b27] hover:to-[#b3881e] text-[#0c3227] font-black text-xs sm:text-sm rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <WhatsappLogo size={18} weight="fill" />
                  <span>إرسال الاستفسار وتأكيد تفاصيل الرحلة</span>
                </button>
              </div>

              <p className="text-[11px] text-[#798880] text-center">
                * عند الضغط، سيفتح تطبيق واتساب برسالة مسبقة التعبئة لتعتمدها وترسلها بنفسك.
              </p>
            </form>
          </div>

          {/* Supervisor Card & Preview */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-[#0c3227] text-white rounded-2xl p-5 sm:p-6 shadow-sm border border-[#215a48]">
              <span className="text-[10px] font-bold px-2.5 py-0.5 bg-[#164939] text-[#f5d77f] rounded-full">
                المشرفة السياحية
              </span>

              <h3 className="text-lg font-black text-white mt-2 mb-0.5">
                أ. {SITE_CONFIG.supervisor}
              </h3>
              <p className="text-xs text-[#b8ccc4] mb-4">
                إشراف ومتابعة مباشرة لرحلات العمرة الجماعية من أسوان.
              </p>

              <div className="space-y-3 pt-3 border-t border-[#1a513f] text-xs">
                <div>
                  <span className="block text-[11px] text-[#9bb0a7] mb-0.5">واتساب مصر:</span>
                  <a
                    href={`https://wa.me/${SITE_CONFIG.whatsappEgyptDigits}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-[#f5d77f] hover:underline flex items-center gap-1.5"
                    dir="ltr"
                  >
                    <WhatsappLogo size={16} weight="fill" className="text-[#25D366]" />
                    <span>{SITE_CONFIG.whatsappEgypt}</span>
                  </a>
                </div>

                <div className="p-3 rounded-xl bg-[#09261d] border border-[#1d4c3c]">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-bold text-[#f5d77f] flex items-center gap-1.5">
                      <span>🇸🇦</span>
                      <span>هاتف المشرفة المباشر بالمملكة:</span>
                    </span>
                    <span className="text-[10px] bg-[#164939] text-[#9bb0a7] px-2 py-0.5 rounded-full">
                      للمتواجدين بالسعودية
                    </span>
                  </div>
                  <a
                    href={`tel:${SITE_CONFIG.ksaPhoneTel}`}
                    className="font-mono text-sm font-black text-white hover:text-[#f5d77f] transition-colors flex items-center justify-between pt-0.5"
                    dir="ltr"
                  >
                    <span>{SITE_CONFIG.ksaPhone}</span>
                    <span className="text-[10px] text-[#9bb0a7] font-sans">اتصال مباشر</span>
                  </a>
                </div>

                <div className="pt-1 text-[11px] text-[#9bb0a7] leading-relaxed">
                  <p>• مدة الرحلة 15 يومًا كاملة</p>
                  <p>• انطلاق ميسر من محافظة أسوان</p>
                  <p>• زيارة شاملة لمعالم مكة المكرمة والمدينة المنورة</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
