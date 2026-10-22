import React, { useState } from 'react';
import { X, MagnifyingGlass, CaretLeft, Globe, ArrowLeft, WhatsappLogo } from '@phosphor-icons/react';
import { KaabaLogo } from './KaabaLogo';
import { SITE_CONFIG, buildQuickWhatsAppUrl } from '../data/content';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({
  isOpen,
  onClose,
  activeSection,
  onNavigate,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [language, setLanguage] = useState<'ar' | 'en'>('ar');

  const menuItems = [
    { id: 'packages', label: 'باقات العمرة' },
    { id: 'routes', label: 'مسار الرحلة من أسوان' },
    { id: 'landmarks', label: 'المزارات والمعالم التاريخية' },
    { id: 'gallery', label: 'معرض الصور وشهادات الروضة' },
    { id: 'features', label: 'مميزات الرحلة' },
    { id: 'seerah-guide', label: 'مرشد السيرة النبوية' },
    { id: 'guide', label: 'دليل المعتمر' },
    { id: 'booking', label: 'حجز واستفسار' },
    { id: 'contact', label: 'التواصل' },
  ];

  const filteredItems = menuItems.filter((item) =>
    item.label.toLowerCase().includes(searchQuery.trim().toLowerCase())
  );

  const handleItemClick = (id: string) => {
    onNavigate(id);
    onClose();
  };

  const handleWhatsAppClick = () => {
    window.open(buildQuickWhatsAppUrl(), '_blank', 'noopener,noreferrer');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Container */}
      <div
        className="relative z-10 w-full max-w-[340px] bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300"
        dir="rtl"
      >
        <div>
          {/* Top Header Bar */}
          <div className="p-4 flex items-center justify-between border-b border-[#eee8dc]">
            <button
              onClick={onClose}
              className="p-2 text-[#4a5550] hover:text-[#0c3227] hover:bg-[#f6f2e8] rounded-full transition-colors"
              aria-label="إغلاق القائمة"
            >
              <X size={20} weight="bold" />
            </button>
            <KaabaLogo />
          </div>

          {/* Search Input */}
          <div className="p-4">
            <div className="relative">
              <input
                type="text"
                placeholder="ابحث في رحلات العمرة"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-2.5 pr-10 pl-4 text-sm bg-white border border-[#d9d2c2] rounded-lg focus:outline-none focus:border-[#0c3227] focus:ring-1 focus:ring-[#0c3227] text-right placeholder-[#808d85] transition-all"
              />
              <MagnifyingGlass size={16} className="text-[#808d85] absolute right-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* Nav Items List */}
          <nav className="px-3 space-y-1">
            {filteredItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-md text-sm font-semibold transition-all relative ${
                    isActive
                      ? 'bg-[#eef4f1] text-[#0c3227]'
                      : 'text-[#2a3831] hover:bg-[#faf7f0] hover:text-[#0c3227]'
                  }`}
                >
                  {/* Right Gold Accent Bar if active */}
                  {isActive && (
                    <span className="absolute right-0 top-2 bottom-2 w-1 bg-[#c59b27] rounded-l" />
                  )}

                  <span className="pr-1">{item.label}</span>
                  <CaretLeft size={16} className="text-[#808d85]" />
                </button>
              );
            })}
          </nav>

          {/* Divider */}
          <div className="my-4 border-b border-[#eee8dc] mx-4" />

          {/* Language Switcher */}
          <div className="px-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 text-xs text-[#6e7b74]">
              <Globe size={18} className="text-[#b3881e]" />
            </div>
            <div className="flex items-center gap-2 flex-1 justify-end">
              <button
                onClick={() => setLanguage('en')}
                className={`px-4 py-1.5 text-xs font-semibold rounded-md border transition-all ${
                  language === 'en'
                    ? 'bg-[#0c3227] text-white border-[#0c3227]'
                    : 'bg-[#faf8f4] text-[#4a5550] border-[#d9d2c2]'
                }`}
              >
                English
              </button>
              <button
                onClick={() => setLanguage('ar')}
                className={`px-4 py-1.5 text-xs font-bold rounded-md border flex items-center gap-1 transition-all ${
                  language === 'ar'
                    ? 'bg-[#0c3227] text-white border-[#0c3227]'
                    : 'bg-[#faf8f4] text-[#4a5550] border-[#d9d2c2]'
                }`}
              >
                <span>عربي</span>
                <span>✓</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Drawer CTA & Supervisor Info */}
        <div className="p-4 bg-[#fbf9f4] border-t border-[#eee8dc] space-y-3">
          <p className="text-xs font-bold text-center text-[#1f2f27]">
            أرسل استفسارك عبر واتساب
          </p>

          <button
            onClick={handleWhatsAppClick}
            className="w-full py-3 px-4 bg-[#d8b168] hover:bg-[#c9a050] text-[#0f2920] font-bold rounded-lg shadow-xs flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
          >
            <WhatsappLogo size={18} weight="fill" />
            <span>استفسار واتساب</span>
            <ArrowLeft size={16} weight="bold" />
          </button>

          <div className="text-center text-[10px] text-[#6b7771] leading-relaxed pt-1">
            <p>
              {SITE_CONFIG.supervisor} · {SITE_CONFIG.supervisorRole}
            </p>
            <p className="mt-0.5 font-medium text-[#0c3227]" dir="ltr">
              WhatsApp: {SITE_CONFIG.whatsappEgypt} | KSA: {SITE_CONFIG.ksaPhone}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
