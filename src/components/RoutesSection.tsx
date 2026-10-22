import React from 'react';
import { Clock, CheckCircle, ArrowLeft, Bus } from '@phosphor-icons/react';
import { TRIP_PLAN } from '../data/content';

interface RoutesSectionProps {
  onSelectRoute: (routeTitle: string) => void;
}

export const RoutesSection: React.FC<RoutesSectionProps> = ({ onSelectRoute }) => {
  return (
    <section id="routes" className="py-16 lg:py-20 bg-[#fbf9f4] relative overflow-hidden" dir="rtl">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-4xl font-black text-[#0c3227] tracking-tight mb-3">
            مسارات الرحلات من أسوان إلى المملكة
          </h2>
          <p className="text-sm sm:text-base text-[#4f5d56] leading-relaxed">
            برنامج سفر متكامل ينطلق من أسوان لقضاء 15 يومًا في رحاب مكة المكرمة والمدينة المنورة ضمن خطة رحلة جماعية موحدة ومنظمة.
          </p>
        </div>

        {/* Single Approved Trip Plan Card */}
        <div className="rounded-2xl bg-white p-6 sm:p-9 border border-[#ded5c2] shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-5 border-b border-[#eee8dc]">
            <div>
              <h3 className="text-lg sm:text-xl font-black text-[#0c3227]">
                {TRIP_PLAN.title}
              </h3>
              <p className="text-xs text-[#8d6919] font-bold mt-1">
                {TRIP_PLAN.departure}
              </p>
            </div>

            <div className="flex items-center gap-2 bg-[#f6f2e8] px-3.5 py-1.5 rounded-xl border border-[#ded5c2] text-xs font-bold text-[#0c3227]">
              <Clock size={16} className="text-[#c59b27]" />
              <span>{TRIP_PLAN.duration}</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-[#4b5a52] leading-relaxed">
            {TRIP_PLAN.description}
          </p>

          {/* Key Plan Notes */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-bold text-[#1f2f27] flex items-center gap-1.5">
              <Bus size={18} className="text-[#c59b27]" />
              <span>تفاصيل تنظيم وتحرك الرحلة:</span>
            </h4>
            <div className="space-y-2">
              {TRIP_PLAN.planNotes.map((note, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-[#3f4f46]">
                  <CheckCircle size={16} weight="fill" className="text-[#0c3227] flex-shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{note}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-4 border-t border-[#eee8dc]">
            <button
              onClick={() => onSelectRoute(TRIP_PLAN.title)}
              className="w-full sm:w-auto px-6 py-3 bg-[#0c3227] hover:bg-[#07241c] text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-all flex items-center justify-center gap-2"
            >
              <span>تثبيت المسار في نموذج الحجز والاستفسار</span>
              <ArrowLeft size={16} weight="bold" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
