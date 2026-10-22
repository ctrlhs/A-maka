import React from 'react';
import { ShieldCheck, Bus, Buildings, UsersThree, PhoneCall, WhatsappLogo } from '@phosphor-icons/react';
import { SITE_CONFIG, buildQuickWhatsAppUrl } from '../data/content';

export const FeaturesSection: React.FC = () => {
  return (
    <section id="features" className="py-16 lg:py-20 bg-[#0a2c22] text-white relative overflow-hidden" dir="rtl">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight mb-3">
            لماذا تختار رحلتنا؟
          </h2>
          <p className="text-sm sm:text-base text-[#b3c5bd] leading-relaxed">
            نحرص على توفير تنظيم جماعي مريح وتنسيق مباشر للإقامة والتنقلات وزيارة المعالم المعتمدة طوال الـ 15 يومًا.
          </p>
        </div>

        {/* 4 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {/* Feature 1 */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#0f3d30]/80 border border-[#215a48]">
            <div className="w-11 h-11 rounded-xl bg-[#d4af37]/15 border border-[#d4af37]/30 flex items-center justify-center text-[#f5d77f] mb-4">
              <ShieldCheck size={24} weight="bold" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">إشراف سياحي مباشر</h3>
            <p className="text-xs text-[#c2d3cc] leading-relaxed">
              مرافقة المشرفة السياحية {SITE_CONFIG.supervisor} ومتابعة مستمرة لكافة مراحل الرحلة والتسكين.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#0f3d30]/80 border border-[#215a48]">
            <div className="w-11 h-11 rounded-xl bg-[#d4af37]/15 border border-[#d4af37]/30 flex items-center justify-center text-[#f5d77f] mb-4">
              <Bus size={24} weight="bold" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">حافلات حديثة ومكيفة</h3>
            <p className="text-xs text-[#c2d3cc] leading-relaxed">
              تنقلات جماعية بحافلات سياحية مجهزة بين مكة المكرمة والمدينة المنورة وخلال جولات المزارات.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#0f3d30]/80 border border-[#215a48]">
            <div className="w-11 h-11 rounded-xl bg-[#d4af37]/15 border border-[#d4af37]/30 flex items-center justify-center text-[#f5d77f] mb-4">
              <Buildings size={24} weight="bold" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">إقامة فندقية قريبة ومختارة</h3>
            <p className="text-xs text-[#c2d3cc] leading-relaxed">
              فنادق ملائمة للعائلات والأفراد قريبة من الحرمين الشريفين لتيسير الصلوات اليومية.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#0f3d30]/80 border border-[#215a48]">
            <div className="w-11 h-11 rounded-xl bg-[#d4af37]/15 border border-[#d4af37]/30 flex items-center justify-center text-[#f5d77f] mb-4">
              <UsersThree size={24} weight="bold" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">رعاية لكافة أفراد الأسرة</h3>
            <p className="text-xs text-[#c2d3cc] leading-relaxed">
              اهتمام خاص بمتطلبات كبار السن والعائلات، مع إرشاد مبسط لكافة مناسك العمرة.
            </p>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="p-5 sm:p-7 rounded-2xl bg-[#114032] border border-[#215a48] flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="text-right">
            <h4 className="text-base sm:text-lg font-bold text-[#f5d77f] mb-1">
              هل ترغب في الاستفسار عن مواعيد الرحلة القادمة؟
            </h4>
            <p className="text-xs text-[#b8ccc4]">
              المشرفة السياحية {SITE_CONFIG.supervisor} جاهزة للرد على استفساراتكم وتفاصيل التسكين.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <a
              href={buildQuickWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial px-5 py-2.5 bg-gradient-to-l from-[#d4af37] to-[#e5c158] hover:from-[#c59b27] hover:to-[#d4af37] text-[#0a2c22] font-bold text-xs sm:text-sm rounded-xl transition-all flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <WhatsappLogo size={18} weight="fill" />
              <span>استفسار واتساب</span>
            </a>

            <a
              href={`tel:${SITE_CONFIG.ksaPhoneTel}`}
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm rounded-xl border border-white/20 transition-all flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <PhoneCall size={16} weight="bold" className="text-[#f5d77f]" />
              <span>اتصال السعودية</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
