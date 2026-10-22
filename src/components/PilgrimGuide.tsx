import React, { useState } from 'react';
import { Question, CaretDown, CheckCircle } from '@phosphor-icons/react';
import { PILGRIM_TIPS } from '../data/content';

export const PilgrimGuide: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="guide" className="py-16 lg:py-20 bg-[#f6f2e8] relative overflow-hidden" dir="rtl">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-4xl font-black text-[#0c3227] tracking-tight mb-3">
            دليل المعتمر والأسئلة الشائعة
          </h2>

          <p className="text-sm sm:text-base text-[#4f5d56] leading-relaxed">
            إرشادات أساسية وإجابات عن الاستفسارات الأكثر تكراراً للمعتمرين قبل السفر وأثناء الرحلة.
          </p>
        </div>

        {/* 3 Advice Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="p-4 bg-white rounded-xl border border-[#ded5c2]">
            <div className="flex items-center gap-2 mb-2 text-[#0c3227] font-bold text-xs sm:text-sm">
              <CheckCircle size={16} weight="fill" className="text-[#c59b27]" />
              <span>جواز السفر والوثائق</span>
            </div>
            <p className="text-xs text-[#5a6760] leading-relaxed">
              تأكد من سريان جواز السفر لمدة لا تقل عن 6 أشهر قبل موعد السفر المحدد.
            </p>
          </div>

          <div className="p-4 bg-white rounded-xl border border-[#ded5c2]">
            <div className="flex items-center gap-2 mb-2 text-[#0c3227] font-bold text-xs sm:text-sm">
              <CheckCircle size={16} weight="fill" className="text-[#c59b27]" />
              <span>ترتيبات الانطلاق من أسوان</span>
            </div>
            <p className="text-xs text-[#5a6760] leading-relaxed">
              يتم التنسيق المباشر مع المشرفة بشأن مواعيد ومكان التجمع بأسوان قبل التحرك.
            </p>
          </div>

          <div className="p-4 bg-white rounded-xl border border-[#ded5c2]">
            <div className="flex items-center gap-2 mb-2 text-[#0c3227] font-bold text-xs sm:text-sm">
              <CheckCircle size={16} weight="fill" className="text-[#c59b27]" />
              <span>تصاريح الروضة والعمرة</span>
            </div>
            <p className="text-xs text-[#5a6760] leading-relaxed">
              تساعدكم المشرفة السياحية في تنسيق حجز تصاريح الروضة الشريفة والعمرة.
            </p>
          </div>
        </div>

        {/* Accordions */}
        <div className="space-y-2.5">
          {PILGRIM_TIPS.map((tip, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl border border-[#ded5c2] overflow-hidden transition-all shadow-xs"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-4 text-right flex items-center justify-between gap-4 focus:outline-none"
                >
                  <div className="flex items-center gap-2.5">
                    <Question size={18} className="text-[#c59b27] flex-shrink-0" />
                    <span className="text-xs sm:text-sm font-bold text-[#0c3227]">
                      {tip.q}
                    </span>
                  </div>
                  <CaretDown
                    size={16}
                    className={`text-[#73827a] transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#c59b27]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 pt-1 border-t border-[#f1ebd9] bg-[#fdfbf7] text-xs text-[#4c5952] leading-relaxed">
                    {tip.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
