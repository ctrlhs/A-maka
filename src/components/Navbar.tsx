import React, { useState, useEffect } from 'react';
import { List, PhoneCall, WhatsappLogo } from '@phosphor-icons/react';
import { KaabaLogo } from './KaabaLogo';
import { SITE_CONFIG, buildQuickWhatsAppUrl } from '../data/content';

interface NavbarProps {
  onOpenMobileMenu: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenMobileMenu,
  activeSection,
  onNavigate,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'packages', label: 'باقات العمرة' },
    { id: 'routes', label: 'مسار الرحلة' },
    { id: 'landmarks', label: 'المزارات والمعالم' },
    { id: 'gallery', label: 'معرض الرحلة والشهادات' },
    { id: 'features', label: 'مميزات الرحلة' },
    { id: 'seerah-guide', label: 'مرشد السيرة النبوية' },
    { id: 'guide', label: 'دليل المعتمر' },
    { id: 'booking', label: 'حجز واستفسار' },
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-[#e9e3d5] py-2.5'
          : 'bg-[#fcfaf5]/90 backdrop-blur-sm border-b border-[#f0ebd9] py-3.5'
      }`}
      dir="rtl"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Right: Brand Logo */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-right focus:outline-none"
            >
              <KaabaLogo />
            </button>
          </div>

          {/* Center: Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => onNavigate(link.id)}
                  className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors relative ${
                    isActive
                      ? 'text-[#0c3227] bg-[#edf4f0]'
                      : 'text-[#384940] hover:text-[#0c3227] hover:bg-[#f6f2e8]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#c59b27] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Left: Contact CTAs & Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Call inside KSA Button */}
            <a
              href={`tel:${SITE_CONFIG.ksaPhoneTel}`}
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 text-xs md:text-sm font-bold text-[#0c3227] bg-[#f2ecdc] hover:bg-[#e8dfcb] border border-[#d8cdb5] rounded-lg transition-all"
              title="اتصال داخل المملكة العربية السعودية"
            >
              <PhoneCall size={16} weight="bold" className="text-[#0c3227]" />
              <span className="hidden xl:inline">اتصال السعودية:</span>
              <span dir="ltr">{SITE_CONFIG.ksaPhone}</span>
            </a>

            {/* WhatsApp CTA Button */}
            <a
              href={buildQuickWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs md:text-sm font-bold text-white bg-[#0c3227] hover:bg-[#07241c] rounded-lg shadow-sm transition-all"
            >
              <WhatsappLogo size={18} weight="fill" className="text-[#25D366]" />
              <span className="hidden sm:inline">استفسار واتساب</span>
              <span className="sm:hidden">واتساب</span>
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={onOpenMobileMenu}
              className="lg:hidden p-2 text-[#0c3227] hover:bg-[#f0ebd9] rounded-lg transition-colors focus:outline-none"
              aria-label="فتح القائمة الرئيسية"
            >
              <List size={24} weight="bold" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
