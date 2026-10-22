import React from 'react';
import { UserCheck, CheckCircle, WhatsappLogo, PhoneCall } from '@phosphor-icons/react';
import { SITE_CONFIG, buildQuickWhatsAppUrl } from '../data/content';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-16 lg:py-20 bg-[#fbf9f4] relative overflow-hidden" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Authentic Photo of Holy Mosque & Kaaba */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-white">
                <img
                  src="https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?q=80&w=1200&auto=format&fit=crop"
                  alt="المسجد الحرام والكعبة المشرفة بمكة المكرمة"
                  className="w-full h-[380px] sm:h-[440px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c3227]/70 via-transparent to-transparent" />
                
                {/* Floating info badge */}
                <div className="absolute bottom-4 right-4 left-4 bg-white/95 backdrop-blur-xs p-3.5 rounded-xl border border-[#d8cfbe] shadow-md flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#0c3227] flex items-center justify-center text-white">
                      <UserCheck size={20} className="text-[#e5c158]" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-[#0c3227]">إشراف سياحي مباشر</h4>
                      <p className="text-[11px] text-[#6e7b74]">المشرفة: {SITE_CONFIG.supervisor}</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 bg-[#f3ebd7] text-[#8e6b18] rounded-full">
                    15 يومًا
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Text Content Column */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-5 text-right">
            {/* Main Title - Clean and realistic */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0c3227] leading-tight">
              تنظيم رحلات العمرة الجماعية بإشراف مباشر ومتابعة مستمرة
            </h2>

            {/* Paragraphs */}
            <p className="text-sm sm:text-base text-[#46544e] leading-relaxed">
              نقدم رحلات عمرة جماعية تنطلق من محافظة أسوان إلى مكة المكرمة والمدينة المنورة ضمن برنامج يمتد لـ <strong className="text-[#0c3227] font-bold">15 يومًا</strong> كاملة، نعتني فيه بترتيبات السكن والتنقلات الجماعية وزيارة المعالم المعتمدة، لتمكين المعتمرين من التفرغ للعبادة وأداء المناسك.
            </p>

            <p className="text-sm sm:text-base text-[#46544e] leading-relaxed">
              ترافق المجموعة المشرفة السياحية <strong className="text-[#0c3227] font-bold">الأستاذة {SITE_CONFIG.supervisor}</strong> طوال فترة الرحلة لتقديم التوجيه الميداني والإرشاد المستمر وتيسير كافة الإجراءات للمشاركين.
            </p>

            {/* 4 Feature Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-start gap-2.5 p-3 bg-white rounded-xl border border-[#e8dfce]">
                <CheckCircle size={18} weight="fill" className="text-[#b3881e] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#1a2e26]">زيارة شاملة للمزارات</h4>
                  <p className="text-[11px] text-[#6e7b74] mt-0.5">زيارة معالم مكة المكرمة والمدينة المنورة</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 bg-white rounded-xl border border-[#e8dfce]">
                <CheckCircle size={18} weight="fill" className="text-[#b3881e] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#1a2e26]">إشراف سياحي ومتابعة</h4>
                  <p className="text-[11px] text-[#6e7b74] mt-0.5">مرافقة مستمرة وتنسيق دائم مع المشرفة</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 bg-white rounded-xl border border-[#e8dfce]">
                <CheckCircle size={18} weight="fill" className="text-[#b3881e] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#1a2e26]">إقامة فندقية ملائمة</h4>
                  <p className="text-[11px] text-[#6e7b74] mt-0.5">فنادق قريبة لراحة المعتمر وأسرته</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 bg-white rounded-xl border border-[#e8dfce]">
                <CheckCircle size={18} weight="fill" className="text-[#b3881e] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#1a2e26]">حافلات سياحية مكيفة</h4>
                  <p className="text-[11px] text-[#6e7b74] mt-0.5">تنقلات جماعية مريحة طوال الرحلة</p>
                </div>
              </div>
            </div>

            {/* Quick CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <a
                href={buildQuickWhatsAppUrl('استفسار عن الرحلة')}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-[#0c3227] hover:bg-[#07241c] text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-all flex items-center gap-2"
              >
                <WhatsappLogo size={18} weight="fill" className="text-[#25D366]" />
                <span>تواصل مع المشرفة أسماء عبدالكريم</span>
              </a>

              <a
                href={`tel:${SITE_CONFIG.ksaPhoneTel}`}
                className="px-4 py-2.5 bg-white hover:bg-[#f6f2e8] text-[#0c3227] font-bold text-xs sm:text-sm rounded-xl border border-[#d8cfbe] shadow-xs transition-all flex items-center gap-2"
              >
                <PhoneCall size={16} weight="bold" className="text-[#b3881e]" />
                <span>اتصال داخل السعودية</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
