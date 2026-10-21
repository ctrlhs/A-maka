import React from 'react';
import { ShieldCheck, Bus, Hotel, HeartHandshake, PhoneCall, MessageSquare } from 'lucide-react';
import { SITE_CONFIG, buildQuickWhatsAppUrl } from '../data/content';

export const FeaturesSection: React.FC = () => {
  return (
    <section id="features" className="py-16 lg:py-24 bg-[#0a2c22] text-white relative overflow-hidden" dir="rtl">
      {/* Decorative Islamic Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none islamic-pattern" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#d4af37]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#164939] border border-[#d4af37]/30 text-[#f5d77f] text-xs font-bold mb-3">
            <span>✦</span>
            <span>لماذا تختار رحلتنا؟</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-4">
            اعتمد علينا في أدق تفاصيل رحلتك الإيمانية
          </h2>

          <p className="text-base text-[#b3c5bd] leading-relaxed">
            نكرس كافة جهودنا وخبراتنا لتوفير أجواء روحانية مفعمة بالسكينة والراحة، مع مرافقة شخصية وإشراف مستمر على مدار الساعة طوال 15 يومًا.
          </p>
        </div>

        {/* 4 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {/* Feature 1 */}
          <div className="p-6 rounded-2xl bg-[#0f3d30]/80 border border-[#215a48] hover:border-[#d4af37]/60 transition-all duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-[#d4af37]/15 border border-[#d4af37]/30 flex items-center justify-center text-[#f5d77f] mb-5">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">إشراف سياحي مباشر</h3>
            <p className="text-xs text-[#c2d3cc] leading-relaxed">
              مرافقة شخصية لصيقة من المشرفة السياحية {SITE_CONFIG.supervisor} من نقطة الانطلاق بمصر وحتى العودة.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="p-6 rounded-2xl bg-[#0f3d30]/80 border border-[#215a48] hover:border-[#d4af37]/60 transition-all duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-[#d4af37]/15 border border-[#d4af37]/30 flex items-center justify-center text-[#f5d77f] mb-5">
              <Bus className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">حافلات حديثة ومكيفة</h3>
            <p className="text-xs text-[#c2d3cc] leading-relaxed">
              أسطول حافلات سياحية مجهزة بأعلى معايير الراحة للتنقل بين مكة والمدينة والمزارات التاريخية.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="p-6 rounded-2xl bg-[#0f3d30]/80 border border-[#215a48] hover:border-[#d4af37]/60 transition-all duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-[#d4af37]/15 border border-[#d4af37]/30 flex items-center justify-center text-[#f5d77f] mb-5">
              <Hotel className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">فنادق مختارة بعناية</h3>
            <p className="text-xs text-[#c2d3cc] leading-relaxed">
              إقامة فندقية ملائمة ومريحة للعائلات والأفراد قريبة من ساحات الحرمين لتسهيل الصلوات.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="p-6 rounded-2xl bg-[#0f3d30]/80 border border-[#215a48] hover:border-[#d4af37]/60 transition-all duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-[#d4af37]/15 border border-[#d4af37]/30 flex items-center justify-center text-[#f5d77f] mb-5">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">رعاية لكافة أفراد الأسرة</h3>
            <p className="text-xs text-[#c2d3cc] leading-relaxed">
              اهتمام خاص باحتياجات كبار السن والأطفال والنساء، مع إرشاد ديني مبسط لكافة مناسك العمرة.
            </p>
          </div>
        </div>

        {/* Bottom Banner inside dark container */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#114032] via-[#164f3e] to-[#114032] border border-[#d4af37]/40 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-right">
            <h4 className="text-lg sm:text-xl font-bold text-[#f5d77f] mb-1">
              هل لديك استفسار محدد حول مواعيد السفر أو الباقات؟
            </h4>
            <p className="text-xs sm:text-sm text-[#b8ccc4]">
              المشرفة السياحية {SITE_CONFIG.supervisor} جاهزة للرد الفوري على رسائلكم واستفساراتكم.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <a
              href={buildQuickWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial px-6 py-3 bg-gradient-to-l from-[#d4af37] to-[#e5c158] hover:from-[#c59b27] hover:to-[#d4af37] text-[#0a2c22] font-black text-xs sm:text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <MessageSquare className="w-4 h-4 text-[#0a2c22]" />
              <span>استفسار واتساب مصر</span>
            </a>

            <a
              href={`tel:${SITE_CONFIG.ksaPhoneTel}`}
              className="px-4 py-3 bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm rounded-xl border border-white/20 transition-all flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <PhoneCall className="w-4 h-4 text-[#f5d77f]" />
              <span className="hidden sm:inline">اتصال السعودية</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
