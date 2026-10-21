import React from 'react';
import { Phone, MessageSquare, MapPin, Heart } from 'lucide-react';
import { KaabaLogo } from './KaabaLogo';
import { SITE_CONFIG, buildQuickWhatsAppUrl } from '../data/content';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer id="contact" className="bg-[#082019] text-white pt-16 pb-10 border-t-2 border-[#c59b27]/30" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Col 1: Brand Info (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <KaabaLogo isLight={true} />
            <p className="text-xs sm:text-sm text-[#b2c4bc] leading-relaxed max-w-sm pt-2">
              تنظيم وعرض رحلات العمرة الجماعية الموثوقة من جمهورية مصر العربية إلى المملكة العربية السعودية لمدة 15 يومًا في رحاب مكة المكرمة والمدينة المنورة بإشراف ورعاية مباشرة من الأستاذة {SITE_CONFIG.supervisor}.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-[#e5c158]">
              <MapPin className="w-4 h-4 text-[#e5c158]" />
              <span>الانطلاق من مصر • الوجهة: مكة المكرمة والمدينة المنورة</span>
            </div>
          </div>

          {/* Col 2: Quick Links (3 Cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-[#f5d77f] uppercase tracking-wider mb-4 border-r-2 border-[#c59b27] pr-2.5">
              أقسام الموقع
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[#ccd9d3]">
              <li>
                <button
                  onClick={() => onNavigate('packages')}
                  className="hover:text-[#f5d77f] transition-colors"
                >
                  باقات العمرة (مع وبدون وجبات)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('routes')}
                  className="hover:text-[#f5d77f] transition-colors"
                >
                  مسارات الرحلات (15 يومًا)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('itinerary')}
                  className="hover:text-[#f5d77f] transition-colors"
                >
                  برنامج الرحلة المتكامل
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('seerah-guide')}
                  className="hover:text-[#f5d77f] transition-colors text-[#e5c158]"
                >
                  مرشد السيرة النبوية (ذكاء اصطناعي ✨)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('landmarks')}
                  className="hover:text-[#f5d77f] transition-colors"
                >
                  معالم ومزارات مكة والمدينة
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('guide')}
                  className="hover:text-[#f5d77f] transition-colors"
                >
                  دليل المعتمر والأسئلة الشائعة
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('booking')}
                  className="hover:text-[#f5d77f] transition-colors"
                >
                  نموذج الحجز والاستفسار
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact & Supervisor (4 Cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-sm font-bold text-[#f5d77f] uppercase tracking-wider mb-4 border-r-2 border-[#c59b27] pr-2.5">
              بيانات التواصل المباشر
            </h4>

            {/* Egypt WhatsApp Box */}
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-[#d4af37]/40 transition-colors">
              <span className="block text-[11px] text-[#9bb0a7] mb-1">
                واتساب مصر (استفسار وحجز):
              </span>
              <a
                href={buildQuickWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm sm:text-base font-bold text-[#f5d77f] hover:underline flex items-center gap-2"
                dir="ltr"
              >
                <MessageSquare className="w-4 h-4 text-[#e5c158]" />
                <span>{SITE_CONFIG.whatsappEgypt}</span>
              </a>
            </div>

            {/* Saudi Call Box */}
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-[#d4af37]/40 transition-colors">
              <span className="block text-[11px] text-[#9bb0a7] mb-1">
                الاتصال داخل السعودية (هاتف محلي):
              </span>
              <a
                href={`tel:${SITE_CONFIG.ksaPhoneTel}`}
                className="text-sm sm:text-base font-bold text-white hover:underline flex items-center gap-2"
                dir="ltr"
              >
                <Phone className="w-4 h-4 text-[#e5c158]" />
                <span>{SITE_CONFIG.ksaPhone}</span>
              </a>
            </div>

            <p className="text-[11px] text-[#9bb0a7] pt-1">
              إشراف وإدارة الرحلات: <strong className="text-white">{SITE_CONFIG.supervisor}</strong>
            </p>
          </div>
        </div>

        {/* Bottom Credits Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8c9f96]">
          <p>
            جميع الحقوق محفوظة © {new Date().getFullYear()} {SITE_CONFIG.name} · رحلات العمرة الجماعية
          </p>
          <div className="flex items-center gap-1 text-[11px]">
            <span>خدمة ضيوف الرحمن بإشراف سياحي مباشر وموثوق</span>
            <Heart className="w-3 h-3 text-[#d4af37] fill-[#d4af37] inline mx-1" />
          </div>
        </div>
      </div>
    </footer>
  );
};
