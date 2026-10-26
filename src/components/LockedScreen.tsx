import React from 'react';
import { WhatsappLogo } from '@phosphor-icons/react';
import { SITE_CONFIG, buildQuickWhatsAppUrl } from '../data/content';

export const LockedScreen: React.FC = () => {
  const whatsappUrl = buildQuickWhatsAppUrl('السلام عليكم أستاذة أسماء عبدالكريم، أود التواصل بخصوص رحلات العمرة والموقع.');

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-[#061914] via-[#09261e] to-[#04110d] text-white flex flex-col items-center justify-between p-4 sm:p-6 lg:p-8 select-none"
      dir="rtl"
    >
      {/* Top Subtle Brand Bar */}
      <div className="w-full max-w-md flex items-center justify-center pt-2">
        <div className="px-4 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] text-[#c2d3cc] tracking-wide">
          موقع مكة المكرمة · رحلات العمرة
        </div>
      </div>

      {/* Main Interactive Poster Container */}
      <div className="w-full max-w-md my-auto flex flex-col items-center text-center">
        {/* Interactive Poster Card */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group block relative w-full rounded-3xl overflow-hidden shadow-2xl border-2 border-[#d4af37]/40 hover:border-[#d4af37] transition-all duration-300 transform hover:scale-[1.01] active:scale-[0.99]"
          title="اضغط للتواصل مباشرة عبر واتساب مع أ. أسماء عبدالكريم"
        >
          <img
            src="/images/locked.jpg"
            alt="تم القفل - برجاء التواصل مع أستاذة أسماء عبدالكريم"
            className="w-full h-auto object-cover object-center"
            loading="eager"
          />

          {/* Interactive Subtle Overlay on Hover */}
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/25 transition-colors flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:scale-105 duration-300 bg-[#25D366] text-white p-3.5 rounded-full shadow-2xl flex items-center justify-center">
              <WhatsappLogo size={36} weight="fill" />
            </div>
          </div>
        </a>

        {/* WhatsApp Dedicated Floating Icon Button */}
        <div className="mt-6 flex flex-col items-center gap-2">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-16 h-16 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white shadow-xl shadow-green-900/40 border-2 border-white/80 flex items-center justify-center transition-all duration-300 transform hover:scale-110 active:scale-95 animate-pulse hover:animate-none cursor-pointer"
            aria-label="تواصل عبر واتساب"
            title={`تواصل مع أ. ${SITE_CONFIG.supervisor} عبر واتساب: ${SITE_CONFIG.whatsappEgypt}`}
          >
            <WhatsappLogo size={36} weight="fill" />
          </a>

          <span className="text-[11px] text-[#a4b8af] font-medium">
            اضغط على الأيقونة أو الصورة للتواصل عبر واتساب
          </span>
        </div>
      </div>

      {/* Developer / Designer Signature Footer */}
      <footer className="w-full max-w-md text-center py-4 border-t border-white/10 mt-6">
        <div className="inline-flex items-center gap-2 text-xs sm:text-sm text-[#e8dfcb]">
          <span className="text-[#a4b8af]">تصميم وبرمجة الموقع:</span>
          <strong className="text-[#f5d77f] font-black tracking-wide">
            محمد حسين
          </strong>
        </div>
        <p className="text-[10px] text-[#71847a] mt-1 font-mono">
          جميع الحقوق محفوظة © {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
};
