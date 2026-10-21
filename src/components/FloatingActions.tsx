import React, { useState, useEffect } from 'react';
import { MessageSquare, Phone, ArrowUp } from 'lucide-react';
import { SITE_CONFIG, buildQuickWhatsAppUrl } from '../data/content';

export const FloatingActions: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-5 left-5 z-40 flex flex-col items-center gap-3" dir="ltr">
      {/* Scroll to Top */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="w-10 h-10 rounded-full bg-white/90 text-[#0c3227] shadow-lg border border-[#ded5c2] flex items-center justify-center hover:bg-[#0c3227] hover:text-white transition-all transform hover:scale-110"
          aria-label="العودة لأعلى الصفحة"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}

      {/* Saudi Call Float on Mobile/Tablet */}
      <a
        href={`tel:${SITE_CONFIG.ksaPhoneTel}`}
        className="md:hidden w-11 h-11 rounded-full bg-[#0c3227] text-white shadow-xl flex items-center justify-center hover:bg-[#07241c] transition-all transform active:scale-95"
        title="اتصال داخل السعودية"
        aria-label="اتصال بالسعودية"
      >
        <Phone className="w-5 h-5 text-[#f5d77f]" />
      </a>

      {/* Floating WhatsApp CTA */}
      <a
        href={buildQuickWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center"
        aria-label="استفسار واتساب مصر"
      >
        <div className="w-13 h-13 rounded-full bg-[#25D366] text-white shadow-2xl flex items-center justify-center hover:bg-[#20ba59] transition-all transform group-hover:scale-110 active:scale-95">
          <MessageSquare className="w-6 h-6 fill-white" />
        </div>

        {/* Tooltip on hover */}
        <span className="hidden lg:block absolute left-full ml-3 px-3 py-1.5 bg-[#0c3227] text-white text-xs font-bold rounded-lg whitespace-nowrap shadow-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          واتساب مصر: {SITE_CONFIG.whatsappEgypt}
        </span>
      </a>
    </div>
  );
};
