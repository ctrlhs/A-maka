import React from 'react';
import { Check, Sparkles, Utensils, UtensilsCrossed, Users } from 'lucide-react';
import { PACKAGES } from '../data/content';
import type { PackageItem } from '../types';

interface PackagesSectionProps {
  onSelectPackage: (pkg: PackageItem) => void;
}

export const PackagesSection: React.FC<PackagesSectionProps> = ({ onSelectPackage }) => {
  return (
    <section id="packages" className="py-16 lg:py-24 bg-[#f5f1e8] relative overflow-hidden" dir="rtl">
      {/* Background Accent */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#d4af37]/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#eee7d8] border border-[#dccfb6] text-[#8d6919] text-xs font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#b3881e]" />
            <span>باقات العمرة المتاحة</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-[#0c3227] tracking-tight mb-4">
            باقات متنوعة لرحلتك الجماعية
          </h2>

          <p className="text-base text-[#4f5d56] leading-relaxed">
            نوفر لكم باقات مرنة تناسب كافة الميزانيات مع إمكانية اختيار نظام الوجبات أو السفر بدون وجبات، وجميعها مشمولة برعاية وإشراف مباشر طوال مدة الرحلة (15 يومًا).
          </p>
        </div>

        {/* Packages Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {PACKAGES.map((pkg) => {
            return (
              <div
                key={pkg.id}
                className={`relative flex flex-col justify-between rounded-2xl bg-white p-7 transition-all duration-300 hover:shadow-xl ${
                  pkg.isPopular
                    ? 'border-2 border-[#c59b27] shadow-lg ring-4 ring-[#c59b27]/10 -translate-y-1'
                    : 'border border-[#dfd7c5] shadow-sm hover:border-[#c59b27]/60'
                }`}
              >
                {/* Popular / Featured Badge */}
                {pkg.isPopular && (
                  <div className="absolute -top-3.5 right-1/2 translate-x-1/2 bg-gradient-to-r from-[#c59b27] to-[#d4af37] text-[#0c3227] text-xs font-black px-4 py-1 rounded-full shadow-md">
                    الباقة الأكثر طلبًا
                  </div>
                )}

                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold px-3 py-1 bg-[#f4eee1] text-[#8e6b18] rounded-full">
                      {pkg.badge}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-[#0c3227]/5 flex items-center justify-center text-[#0c3227]">
                      {pkg.id === 'no-meals' && <UtensilsCrossed className="w-5 h-5 text-[#b3881e]" />}
                      {pkg.id === 'with-meals' && <Utensils className="w-5 h-5 text-[#c59b27]" />}
                      {pkg.id === 'family-custom' && <Users className="w-5 h-5 text-[#0c3227]" />}
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-xl font-black text-[#0c3227] mb-2">{pkg.name}</h3>
                  <p className="text-xs text-[#63726a] leading-relaxed mb-6 min-h-[36px]">
                    {pkg.subtitle}
                  </p>

                  {/* Price Box */}
                  <div className="p-4 rounded-xl bg-[#fbf9f4] border border-[#e8dfce] mb-6 text-center">
                    <span className="text-xs text-[#798880] block mb-1">السعر التقريبي</span>
                    <span className="text-lg font-black text-[#0c3227]">
                      {pkg.priceNote}
                    </span>
                    <span className="block text-[11px] text-[#93a29a] mt-0.5">
                      (تواصل لمعرفة السعر الفعلي حسب تاريخ الانطلاق وتوافر الغرف)
                    </span>
                  </div>

                  {/* Features List */}
                  <div className="space-y-3 mb-8">
                    <div className="text-xs font-bold text-[#1f2f27] border-b border-[#eee8dc] pb-2">
                      ما تشمله الباقة:
                    </div>
                    {pkg.features.map((feat, index) => (
                      <div key={index} className="flex items-start gap-2.5 text-xs text-[#3b4b42]">
                        <div className="w-4 h-4 rounded-full bg-[#edf5f0] text-[#0c3227] flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                        <span className="leading-tight">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Action Button */}
                <button
                  onClick={() => onSelectPackage(pkg)}
                  className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                    pkg.isPopular
                      ? 'bg-[#0c3227] hover:bg-[#07241c] text-white shadow-md hover:shadow-lg'
                      : 'bg-[#f4efe4] hover:bg-[#0c3227] text-[#0c3227] hover:text-white border border-[#d8cfbc]'
                  }`}
                >
                  <span>احجز هذه الباقة</span>
                  <span className="text-base">←</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
