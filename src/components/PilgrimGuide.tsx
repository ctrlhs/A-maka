import React, { useState } from 'react';
import { BookOpen, HelpCircle, ChevronDown, CheckCircle } from 'lucide-react';
import { PILGRIM_TIPS } from '../data/content';

export const PilgrimGuide: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="guide" className="py-16 lg:py-24 bg-[#f6f2e8] relative overflow-hidden" dir="rtl">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#eee7d8] border border-[#dccfb6] text-[#8d6919] text-xs font-bold mb-3">
            <BookOpen className="w-3.5 h-3.5 text-[#b3881e]" />
            <span>إرشادات وتوجيهات</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-[#0c3227] tracking-tight mb-4">
            دليل المعتمر والأسئلة الشائعة
          </h2>

          <p className="text-base text-[#4f5d56] leading-relaxed">
            إجابات وافية عن أهم الاستفسارات وإرشادات تهم كل معتمر قبل وأثناء أداء الرحلة المباركة.
          </p>
        </div>

        {/* 3 Quick Advice Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <div className="p-4 bg-white rounded-xl border border-[#ded5c2] shadow-xs">
            <div className="flex items-center gap-2 mb-2 text-[#0c3227] font-bold text-sm">
              <CheckCircle className="w-4 h-4 text-[#c59b27]" />
              <span>جواز السفر والوثائق</span>
            </div>
            <p className="text-xs text-[#5a6760] leading-relaxed">
              تأكد من سريان جواز السفر لمدة لا تقل عن 6 أشهر قبل موعد الانطلاق المحدد.
            </p>
          </div>

          <div className="p-4 bg-white rounded-xl border border-[#ded5c2] shadow-xs">
            <div className="flex items-center gap-2 mb-2 text-[#0c3227] font-bold text-sm">
              <CheckCircle className="w-4 h-4 text-[#c59b27]" />
              <span>ملابس الإحرام والمستلزمات</span>
            </div>
            <p className="text-xs text-[#5a6760] leading-relaxed">
              تجهيز ملابس إحرام قطنية مريحة للرجال، وملابس شرعية فضفاضة ومناسبة للنساء.
            </p>
          </div>

          <div className="p-4 bg-white rounded-xl border border-[#ded5c2] shadow-xs">
            <div className="flex items-center gap-2 mb-2 text-[#0c3227] font-bold text-sm">
              <CheckCircle className="w-4 h-4 text-[#c59b27]" />
              <span>تطبيق نُسك والروضة</span>
            </div>
            <p className="text-xs text-[#5a6760] leading-relaxed">
              تساعدكم المشرفة السياحية في حجز تصاريح الروضة الشريفة والعمرة فور الوصول.
            </p>
          </div>
        </div>

        {/* Accordions */}
        <div className="space-y-3">
          {PILGRIM_TIPS.map((tip, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl border border-[#ded5c2] overflow-hidden transition-all shadow-xs"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-4 sm:p-5 text-right flex items-center justify-between gap-4 focus:outline-none"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-[#c59b27] flex-shrink-0" />
                    <span className="text-sm sm:text-base font-bold text-[#0c3227]">
                      {tip.q}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-[#73827a] transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#c59b27]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 border-t border-[#f1ebd9] bg-[#fdfbf7] text-xs sm:text-sm text-[#4c5952] leading-relaxed">
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
