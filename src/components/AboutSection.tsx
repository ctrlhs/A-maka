import React from 'react';
import { CheckCircle2, UserCheck, MessageSquare, Phone } from 'lucide-react';
import { SITE_CONFIG, buildQuickWhatsAppUrl } from '../data/content';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-16 lg:py-24 bg-[#fbf9f4] relative overflow-hidden" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Image with Islamic Arch & Badge */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Arched Frame Image */}
              <div className="relative rounded-t-[140px] rounded-b-2xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1200&auto=format&fit=crop"
                  alt="أروقة المسجد النبوي الشريف"
                  className="w-full h-[400px] sm:h-[480px] object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c3227]/80 via-transparent to-transparent" />
                
                {/* Floating pill badge on image */}
                <div className="absolute bottom-5 right-5 left-5 bg-white/95 backdrop-blur-md p-4 rounded-xl border border-[#d8cfbe] shadow-lg flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#0c3227] flex items-center justify-center text-white">
                      <UserCheck className="w-5 h-5 text-[#e5c158]" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#0c3227]">رحلات بإشراف مباشر</h4>
                      <p className="text-xs text-[#6e7b74]">المشرفة السياحية: {SITE_CONFIG.supervisor}</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 bg-[#f3ebd7] text-[#8e6b18] rounded-full">
                    15 يومًا
                  </span>
                </div>
              </div>

              {/* Decorative Background Glow */}
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-[#d4af37]/15 rounded-full blur-2xl -z-10" />
              <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-[#0c3227]/10 rounded-full blur-2xl -z-10" />
            </div>
          </div>

          {/* Text Content Column */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-6 text-right">
            {/* Tag */}
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#eee7d8] border border-[#dccfb6] text-[#8d6919] text-xs font-bold">
              <span>✦</span>
              <span>عن الرحلة ورسالتنا</span>
            </div>

            {/* Main Title */}
            <h2 className="text-2xl sm:text-4xl font-black text-[#0c3227] leading-tight">
              رحلة إيمانية ميسّرة بإشراف مباشر ورعاية متكاملة
            </h2>

            {/* Paragraphs */}
            <p className="text-base text-[#46544e] leading-relaxed">
              نقدم لكم رحلات عمرة جماعية تنطلق من مطارات جمهورية مصر العربية إلى أطهر بقاع الأرض بمكة المكرمة والمدينة المنورة، ضمن برنامج مدروس يمتد لـ <strong className="text-[#0c3227] font-bold">15 يومًا</strong> كاملة يجمع بين خشوع المناسك والراحة التامة لجميع أفراد الأسرة.
            </p>

            <p className="text-base text-[#46544e] leading-relaxed">
              ترافقكم المشرفة السياحية المتخصصة <strong className="text-[#0c3227] font-bold">الأستاذة {SITE_CONFIG.supervisor}</strong> خطوة بخطوة من لحظة التجمع والسفر حتى العودة، لتوفير التوجيه الميداني والإرشاد المستمر، وتيسير كافة الإجراءات والتنقلات والإقامة.
            </p>

            {/* 4 Feature Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              <div className="flex items-start gap-3 p-3.5 bg-white rounded-xl border border-[#e8dfce] shadow-sm">
                <CheckCircle2 className="w-5 h-5 text-[#b3881e] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-[#1a2e26]">مزارات مكة المكرمة والمدينة</h4>
                  <p className="text-xs text-[#6e7b74] mt-0.5">زيارة المعالم التاريخية والمشاعر المقدسة</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 bg-white rounded-xl border border-[#e8dfce] shadow-sm">
                <CheckCircle2 className="w-5 h-5 text-[#b3881e] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-[#1a2e26]">إشراف سياحي مباشر 24/7</h4>
                  <p className="text-xs text-[#6e7b74] mt-0.5">مرافقة مستمرة وتواصل فوري مع المشرفة</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 bg-white rounded-xl border border-[#e8dfce] shadow-sm">
                <CheckCircle2 className="w-5 h-5 text-[#b3881e] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-[#1a2e26]">إقامة فندقية قريبة ومختارة</h4>
                  <p className="text-xs text-[#6e7b74] mt-0.5">فنادق مريحة تلائم العائلات والأفراد</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 bg-white rounded-xl border border-[#e8dfce] shadow-sm">
                <CheckCircle2 className="w-5 h-5 text-[#b3881e] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-[#1a2e26]">حافلات سياحية حديثة</h4>
                  <p className="text-xs text-[#6e7b74] mt-0.5">تنقلات مكيفة ومريحة بين المدن والمشاعر</p>
                </div>
              </div>
            </div>

            {/* Quick CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-4">
              <a
                href={buildQuickWhatsAppUrl('عن الرحلة والإشراف')}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-[#0c3227] hover:bg-[#07241c] text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4 text-[#e5c158]" />
                <span>تواصل مع المشرفة أسماء عبدالكريم</span>
              </a>

              <a
                href={`tel:${SITE_CONFIG.ksaPhoneTel}`}
                className="px-5 py-3 bg-white hover:bg-[#f6f2e8] text-[#0c3227] font-bold text-sm rounded-xl border border-[#d8cfbe] shadow-sm transition-all flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#b3881e]" />
                <span>اتصل بنا داخل السعودية</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
