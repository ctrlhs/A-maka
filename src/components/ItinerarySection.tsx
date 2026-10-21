import React, { useState } from 'react';
import { Calendar, ChevronDown, CheckCircle2, Clock } from 'lucide-react';
import { ITINERARY } from '../data/content';

export const ItinerarySection: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section id="itinerary" className="py-16 lg:py-24 bg-[#fbf9f4] relative overflow-hidden" dir="rtl">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#eee7d8] border border-[#dccfb6] text-[#8d6919] text-xs font-bold mb-3">
            <Calendar className="w-3.5 h-3.5 text-[#b3881e]" />
            <span>الجدول الزمني العام</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-[#0c3227] tracking-tight mb-4">
            برنامج الرحلة المتكامل لمدة 15 يومًا
          </h2>

          <p className="text-base text-[#4f5d56] leading-relaxed">
            توزيع متوازن ومرن على مدار 15 يومًا يجمع بين راحة الجسد وغذاء الروح، مع مرونة تامة تلائم مساري الرحلة المعتمدين.
          </p>
        </div>

        {/* Timeline Items */}
        <div className="space-y-4">
          {ITINERARY.map((step, index) => {
            const isExpanded = expandedIndex === index;
            return (
              <div
                key={index}
                className={`rounded-2xl border transition-all duration-300 bg-white overflow-hidden ${
                  isExpanded
                    ? 'border-[#c59b27] shadow-md ring-2 ring-[#c59b27]/10'
                    : 'border-[#dfd6c4] shadow-xs hover:border-[#c59b27]/60'
                }`}
              >
                {/* Header Button */}
                <button
                  onClick={() => toggleExpand(index)}
                  className="w-full p-5 sm:p-6 text-right flex items-center justify-between gap-4 focus:outline-none"
                >
                  <div className="flex items-center gap-3.5 flex-1">
                    {/* Phase Number Badge */}
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#0c3227] text-white flex flex-col items-center justify-center flex-shrink-0 font-bold shadow-sm">
                      <span className="text-[10px] sm:text-xs text-[#e5c158]">المرحلة</span>
                      <span className="text-xs sm:text-sm">{index + 1}</span>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-xs font-bold text-[#8d6919] bg-[#f5efe2] px-2.5 py-0.5 rounded">
                          {step.days}
                        </span>
                        <span className="text-xs font-semibold text-[#54645c] bg-[#eef4f1] px-2.5 py-0.5 rounded">
                          {step.city}
                        </span>
                      </div>
                      <h3 className="text-base sm:text-lg font-black text-[#0c3227]">
                        {step.title}
                      </h3>
                    </div>
                  </div>

                  <div className="w-8 h-8 rounded-full bg-[#f6f2e8] flex items-center justify-center text-[#0c3227] flex-shrink-0">
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${
                        isExpanded ? 'rotate-180 text-[#c59b27]' : ''
                      }`}
                    />
                  </div>
                </button>

                {/* Collapsible Content */}
                {isExpanded && (
                  <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-[#f0ebd9] bg-[#fcfaf7]">
                    <div className="space-y-3 pt-2">
                      <div className="text-xs font-bold text-[#1f2f27] mb-2 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#b3881e]" />
                        <span>أنشطة ومحطات هذه المرحلة:</span>
                      </div>
                      {step.activities.map((act, actIndex) => (
                        <div key={actIndex} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#44524b]">
                          <CheckCircle2 className="w-4 h-4 text-[#0c3227] flex-shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{act}</span>
                        </div>
                      ))}
                    </div>
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
