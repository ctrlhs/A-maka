import React from 'react';
import { Sparkles, Calendar, ShieldCheck, MapPin, ArrowDown, MessageSquare } from 'lucide-react';
import { SITE_CONFIG, buildQuickWhatsAppUrl } from '../data/content';

interface HeroProps {
  onExplorePackages: () => void;
  onBookNow: () => void;
  onViewItinerary: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExplorePackages, onBookNow, onViewItinerary }) => {
  return (
    <section className="relative min-h-[620px] lg:min-h-[700px] flex items-center justify-center overflow-hidden bg-[#0a261e]" dir="rtl">
      {/* Background Image with Dark Green Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?q=80&w=2000&auto=format&fit=crop"
          alt="المسجد الحرام والكعبة المشرفة في مكة المكرمة"
          className="w-full h-full object-cover object-center filter brightness-[0.4] scale-105 transform animate-pulse-slow"
        />
        {/* Multilayered Emerald & Gold Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#082019] via-[#0b3327]/85 to-[#082019]/70" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#d4af37]/15 via-transparent to-transparent" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 text-center text-white">
        {/* Badge Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#164939]/80 border border-[#d4af37]/40 text-[#f5d77f] text-xs sm:text-sm font-semibold mb-6 shadow-lg backdrop-blur-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#e5c158]" />
          <span>رحلات عمرة منظمة وموثوقة</span>
          <span className="text-[#e5c158]">✦</span>
          <span>إشراف مباشر</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.25] sm:leading-[1.2] mb-6 drop-shadow-md">
          رحلات عمرة جماعية من مصر
          <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-[#ffd977] via-[#e5c158] to-[#d4af37]">
            إلى المملكة العربية السعودية
          </span>
        </h1>

        {/* Subtitle Description */}
        <p className="max-w-3xl mx-auto text-base sm:text-lg lg:text-xl text-[#d4ded8] font-normal leading-relaxed mb-10 text-balance">
          برنامج متكامل لمدة <strong className="text-white font-bold">15 يومًا</strong> في مكة المكرمة والمدينة المنورة بإشراف سياحي مباشر من <strong className="text-[#f5d77f] font-bold">الأستاذة {SITE_CONFIG.supervisor}</strong>، نعتني بكافة التفاصيل لتتفرغ لأداء المناسك بكل راحة وخشوع.
        </p>

        {/* Hero CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 mb-16">
          <button
            onClick={onBookNow}
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-l from-[#d4af37] via-[#e5c158] to-[#c59b27] hover:from-[#c59b27] hover:to-[#b3881e] text-[#0a261e] font-black text-base rounded-xl shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <span>احجز رحلتك الآن</span>
            <span className="text-lg">←</span>
          </button>

          <button
            onClick={onExplorePackages}
            className="w-full sm:w-auto px-6 py-4 bg-white/10 hover:bg-white/20 text-white font-bold text-base rounded-xl border border-white/20 backdrop-blur-md transition-all flex items-center justify-center gap-2"
          >
            <span>استعراض الباقات</span>
          </button>

          <a
            href={buildQuickWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-4 bg-[#0c3227] hover:bg-[#07241c] text-white font-bold text-base rounded-xl border border-[#d4af37]/40 shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-4 h-4 text-[#e5c158]" />
            <span>استفسار واتساب مصر</span>
          </a>

          <button
            onClick={onViewItinerary}
            className="w-full sm:w-auto px-6 py-4 text-[#e8dfce] hover:text-white font-semibold text-sm transition-colors flex items-center justify-center gap-1.5"
          >
            <span>تفاصيل البرنامج (15 يومًا)</span>
            <ArrowDown className="w-4 h-4" />
          </button>
        </div>

        {/* Stats Strip under Hero */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-4xl mx-auto pt-6 border-t border-white/15">
          <div className="flex items-center justify-center gap-3 p-3.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <Calendar className="w-5 h-5 text-[#e5c158]" />
            <div className="text-right">
              <div className="text-sm font-bold text-white">15 يومًا متكاملة</div>
              <div className="text-[11px] text-[#b3c2bb]">برنامج روحي مدروس بين الحرمين</div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 p-3.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <ShieldCheck className="w-5 h-5 text-[#e5c158]" />
            <div className="text-right">
              <div className="text-sm font-bold text-white">إشراف سياحي مباشر</div>
              <div className="text-[11px] text-[#b3c2bb]">مرافقة أ. {SITE_CONFIG.supervisor}</div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 p-3.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <MapPin className="w-5 h-5 text-[#e5c158]" />
            <div className="text-right">
              <div className="text-sm font-bold text-white">انطلاق ميسر من مصر</div>
              <div className="text-[11px] text-[#b3c2bb]">إلى مكة والمدينة والعودة</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
