import React from 'react';
import { CalendarBlank, ShieldCheck, MapPin, ArrowLeft } from '@phosphor-icons/react';
import { SITE_CONFIG } from '../data/content';

interface HeroProps {
  onExplorePackages: () => void;
  onBookNow: () => void;
  onViewRoute: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExplorePackages, onBookNow, onViewRoute }) => {
  return (
    <section className="relative min-h-[580px] lg:min-h-[660px] flex items-center justify-center overflow-hidden bg-[#0a261e]" dir="rtl">
      {/* Background Real Kaaba Night View with Rich Emerald Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?q=80&w=2000&auto=format&fit=crop"
          alt="المسجد الحرام والكعبة المشرفة في مكة المكرمة"
          className="w-full h-full object-cover object-center filter brightness-[0.42] scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#082019] via-[#0b3327]/85 to-[#082019]/70" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 text-center text-white">
        {/* Professional Header Tag */}
        <div className="inline-block px-4 py-1.5 rounded-full bg-[#164939]/90 border border-[#d4af37]/30 text-[#f5d77f] text-xs sm:text-sm font-semibold mb-6">
          خدمة ضيوف الرحمن بإشراف سياحي مباشر
        </div>

        {/* Main Heading */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.25] sm:leading-[1.2] mb-6">
          رحلات عمرة جماعية من أسوان
          <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-[#ffd977] via-[#e5c158] to-[#d4af37]">
            إلى المملكة العربية السعودية
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-3xl mx-auto text-base sm:text-lg text-[#d4ded8] font-normal leading-relaxed mb-10 text-balance">
          برنامج متكامل لمدة <strong className="text-white font-bold">15 يومًا</strong> في مكة المكرمة والمدينة المنورة بإشراف سياحي مباشر من <strong className="text-[#f5d77f] font-bold">الأستاذة {SITE_CONFIG.supervisor}</strong>، لضمان أداء المناسك وتيسير كافة الترتيبات بكل طمأنينة.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-14">
          <button
            onClick={onBookNow}
            className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-l from-[#d4af37] via-[#e5c158] to-[#c59b27] hover:from-[#c59b27] hover:to-[#b3881e] text-[#0a261e] font-black text-sm sm:text-base rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
          >
            <span>احجز رحلتك الآن</span>
            <ArrowLeft size={18} weight="bold" />
          </button>

          <button
            onClick={onExplorePackages}
            className="w-full sm:w-auto px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base rounded-xl border border-white/20 transition-all flex items-center justify-center cursor-pointer"
          >
            <span>استعراض باقات العمرة</span>
          </button>
        </div>

        {/* Stats Strip under Hero */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-4xl mx-auto pt-6 border-t border-white/15">
          <div className="flex items-center justify-center gap-3 p-3.5 rounded-xl bg-white/5 border border-white/10">
            <CalendarBlank size={22} className="text-[#e5c158]" />
            <div className="text-right">
              <div className="text-sm font-bold text-white">15 يومًا متكاملة</div>
              <div className="text-[11px] text-[#b3c2bb]">برنامج مخصص بين مكة والمدينة</div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 p-3.5 rounded-xl bg-white/5 border border-white/10">
            <ShieldCheck size={22} className="text-[#e5c158]" />
            <div className="text-right">
              <div className="text-sm font-bold text-white">إشراف سياحي مباشر</div>
              <div className="text-[11px] text-[#b3c2bb]">مرافقة أ. {SITE_CONFIG.supervisor}</div>
            </div>
          </div>

          <button
            type="button"
            onClick={onViewRoute}
            className="flex items-center justify-center gap-3 p-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-right cursor-pointer"
          >
            <MapPin size={22} className="text-[#e5c158] shrink-0" />
            <div className="text-right">
              <div className="text-sm font-bold text-white">انطلاق من أسوان</div>
              <div className="text-[11px] text-[#b3c2bb]">عرض تفاصيل خطة الرحلة</div>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};
