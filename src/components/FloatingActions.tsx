import React, { useState, useEffect } from 'react';
import { WhatsappLogo, ArrowUp } from '@phosphor-icons/react';
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
          className="w-9 h-9 rounded-full bg-white/95 text-[#0c3227] shadow-md border border-[#ded5c2] flex items-center justify-center hover:bg-[#0c3227] hover:text-white transition-all transform hover:scale-105 cursor-pointer"
          aria-label="العودة لأعلى الصفحة"
        >
          <ArrowUp size={16} weight="bold" />
        </button>
      )}

      {/* The Single Dedicated Floating WhatsApp Icon */}
      <a
        href={buildQuickWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center"
        aria-label="استفسار وتواصل عبر واتساب"
      >
        <div className="w-13 h-13 rounded-full bg-[#25D366] text-white shadow-xl flex items-center justify-center hover:bg-[#20ba59] transition-all transform group-hover:scale-110 active:scale-95 border-2 border-white">
          <WhatsappLogo size={30} weight="fill" />
        </div>

        {/* Tooltip on hover */}
        <span className="hidden lg:block absolute left-full ml-3 px-3 py-1 bg-[#0c3227] text-white text-xs font-bold rounded-lg whitespace-nowrap shadow-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          تواصل عبر واتساب: {SITE_CONFIG.whatsappEgypt}
        </span>
      </a>
    </div>
  );
};
