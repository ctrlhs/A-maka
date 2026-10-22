import React from 'react';
import { Phone, WhatsappLogo, MapPin, Heart } from '@phosphor-icons/react';
import { KaabaLogo } from './KaabaLogo';
import { SITE_CONFIG, buildQuickWhatsAppUrl } from '../data/content';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer id="contact" className="bg-[#082019] text-white pt-14 pb-8 border-t-2 border-[#c59b27]/30" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-10 border-b border-white/10">
          {/* Col 1: Brand Info (5 Cols) */}
          <div className="lg:col-span-5 space-y-3">
            <KaabaLogo isLight={true} />
            <p className="text-xs sm:text-sm text-[#b2c4bc] leading-relaxed max-w-sm pt-2">
              تنظيم رحلات العمرة الجماعية من محافظة أسوان إلى المملكة العربية السعودية لمدة 15 يومًا في رحاب مكة المكرمة والمدينة المنورة بإشراف ومتابعة الأستاذة {SITE_CONFIG.supervisor}.
            </p>

            <div className="pt-1 flex items-center gap-1.5 text-xs text-[#e5c158]">
              <MapPin size={16} className="text-[#e5c158]" />
              <span>الانطلاق من أسوان • الوجهة: مكة المكرمة والمدينة المنورة</span>
            </div>
          </div>

          {/* Col 2: Quick Links (3 Cols) */}
          <div className="lg:col-span-3 space-y-2.5">
            <h4 className="text-sm font-bold text-[#f5d77f] mb-3 border-r-2 border-[#c59b27] pr-2">
              أقسام الموقع
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[#ccd9d3]">
              <li>
                <button
                  onClick={() => onNavigate('packages')}
                  className="hover:text-[#f5d77f] transition-colors"
                >
                  باقات العمرة
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('routes')}
                  className="hover:text-[#f5d77f] transition-colors"
                >
                  مسار الرحلة من أسوان (15 يومًا)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('landmarks')}
                  className="hover:text-[#f5d77f] transition-colors"
                >
                  المزارات والمعالم التاريخية
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('features')}
                  className="hover:text-[#f5d77f] transition-colors"
                >
                  مميزات الرحلة
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('seerah-guide')}
                  className="hover:text-[#f5d77f] transition-colors"
                >
                  مرشد السيرة النبوية
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('guide')}
                  className="hover:text-[#f5d77f] transition-colors"
                >
                  دليل المعتمر
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
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-sm font-bold text-[#f5d77f] mb-3 border-r-2 border-[#c59b27] pr-2">
              بيانات التواصل المباشر
            </h4>

            {/* WhatsApp Box */}
            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
              <span className="block text-[11px] text-[#9bb0a7] mb-0.5">
                واتساب مصر:
              </span>
              <a
                href={buildQuickWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs sm:text-sm font-bold text-[#f5d77f] hover:underline flex items-center gap-2"
                dir="ltr"
              >
                <WhatsappLogo size={16} weight="fill" className="text-[#25D366]" />
                <span>{SITE_CONFIG.whatsappEgypt}</span>
              </a>
            </div>

            {/* Saudi Call Box */}
            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
              <span className="block text-[11px] text-[#9bb0a7] mb-0.5">
                الاتصال داخل السعودية:
              </span>
              <a
                href={`tel:${SITE_CONFIG.ksaPhoneTel}`}
                className="text-xs sm:text-sm font-bold text-white hover:underline flex items-center gap-2"
                dir="ltr"
              >
                <Phone size={14} weight="bold" className="text-[#e5c158]" />
                <span>{SITE_CONFIG.ksaPhone}</span>
              </a>
            </div>

            <p className="text-[11px] text-[#9bb0a7] pt-0.5">
              إشراف ومتابعة الرحلات: <strong className="text-white">{SITE_CONFIG.supervisor}</strong>
            </p>
          </div>
        </div>

        {/* Bottom Credits Strip */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#8c9f96]">
          <p>
            جميع الحقوق محفوظة © {new Date().getFullYear()} {SITE_CONFIG.name} · رحلات العمرة الجماعية من أسوان
          </p>
          <div className="flex items-center gap-1 text-[11px]">
            <span>خدمة ضيوف الرحمن بإشراف سياحي مباشر وموثوق</span>
            <Heart size={12} weight="fill" className="text-[#d4af37] inline mx-1" />
          </div>
        </div>
      </div>
    </footer>
  );
};
