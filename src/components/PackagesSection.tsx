import React from 'react';
import { Check, ForkKnife, Users, ArrowLeft } from '@phosphor-icons/react';
import { PACKAGES } from '../data/content';
import type { PackageItem } from '../types';

interface PackagesSectionProps {
  onSelectPackage: (pkg: PackageItem) => void;
}

export const PackagesSection: React.FC<PackagesSectionProps> = ({ onSelectPackage }) => {
  return (
    <section id="packages" className="py-16 lg:py-20 bg-[#f5f1e8] relative overflow-hidden" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - Clean and free of decorative stars/rectangles */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-4xl font-black text-[#0c3227] tracking-tight mb-3">
            باقات العمرة المتاحة
          </h2>
          <p className="text-sm sm:text-base text-[#4f5d56] leading-relaxed">
            خيارات تناسب ميزانيتكم مع إمكانية اختيار باقة تشمل وجبات الفطور والعشاء أو بدون وجبات، مع شمول جميع الباقات للزيارات الميدانية والإشراف طوال مدة الرحلة (15 يومًا).
          </p>
        </div>

        {/* Packages Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {PACKAGES.map((pkg) => {
            return (
              <div
                key={pkg.id}
                className={`flex flex-col justify-between rounded-2xl bg-white p-6 sm:p-7 transition-all duration-300 border ${
                  pkg.isPopular
                    ? 'border-[#c59b27] shadow-md'
                    : 'border-[#dfd7c5] shadow-xs hover:border-[#c59b27]/60'
                }`}
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold px-3 py-1 bg-[#f4eee1] text-[#8e6b18] rounded-full">
                      {pkg.badge}
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-[#0c3227]/5 flex items-center justify-center text-[#0c3227]">
                      {pkg.id === 'with-meals' ? (
                        <ForkKnife size={20} className="text-[#c59b27]" />
                      ) : (
                        <Users size={20} className="text-[#0c3227]" />
                      )}
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-lg sm:text-xl font-black text-[#0c3227] mb-2">{pkg.name}</h3>
                  <p className="text-xs text-[#63726a] leading-relaxed mb-5 min-h-[32px]">
                    {pkg.subtitle}
                  </p>

                  {/* Price Box */}
                  <div className="p-3.5 rounded-xl bg-[#fbf9f4] border border-[#e8dfce] mb-6 text-center">
                    <span className="text-[11px] text-[#798880] block mb-0.5">السعر</span>
                    <span className="text-base sm:text-lg font-black text-[#0c3227]">
                      {pkg.priceNote}
                    </span>
                    <span className="block text-[11px] text-[#93a29a] mt-0.5">
                      (وفق تاريخ السفر وتوافر الغرف)
                    </span>
                  </div>

                  {/* Features List */}
                  <div className="space-y-2.5 mb-6">
                    <div className="text-xs font-bold text-[#1f2f27] border-b border-[#eee8dc] pb-2">
                      محتويات الباقة:
                    </div>
                    {pkg.features.map((feat, index) => (
                      <div key={index} className="flex items-start gap-2 text-xs text-[#3b4b42]">
                        <div className="w-4 h-4 rounded-full bg-[#edf5f0] text-[#0c3227] flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check size={12} weight="bold" />
                        </div>
                        <span className="leading-snug">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Action Button */}
                <button
                  onClick={() => onSelectPackage(pkg)}
                  className={`w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 ${
                    pkg.isPopular
                      ? 'bg-[#0c3227] hover:bg-[#07241c] text-white shadow-xs'
                      : 'bg-[#f4efe4] hover:bg-[#0c3227] text-[#0c3227] hover:text-white border border-[#d8cfbc]'
                  }`}
                >
                  <span>اختيار هذه الباقة</span>
                  <ArrowLeft size={16} weight="bold" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
