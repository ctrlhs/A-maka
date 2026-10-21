import React from 'react';
import { Compass, Clock, CheckCircle2, ArrowLeft } from 'lucide-react';
import { ROUTES } from '../data/content';

interface RoutesSectionProps {
  onSelectRoute: (routeTitle: string) => void;
}

export const RoutesSection: React.FC<RoutesSectionProps> = ({ onSelectRoute }) => {
  return (
    <section id="routes" className="py-16 lg:py-24 bg-[#fbf9f4] relative overflow-hidden" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#eee7d8] border border-[#dccfb6] text-[#8d6919] text-xs font-bold mb-3">
            <Compass className="w-3.5 h-3.5 text-[#b3881e]" />
            <span>خطوط سير الرحلة المعتمدة</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-[#0c3227] tracking-tight mb-4">
            مسارات الرحلات من مصر إلى المملكة
          </h2>

          <p className="text-base text-[#4f5d56] leading-relaxed">
            نوفر لكم مسارين رئيسيين لتناسب تفضيلاتكم وخطتكم لأداء مناسك العمرة وزيارة المسجد النبوي الشريف، والمدة الإجمالية للرحلة 15 يومًا متكاملة.
          </p>

          <div className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-white rounded-full border border-[#ded5c2] shadow-sm text-xs font-bold text-[#0c3227]">
            <Clock className="w-4 h-4 text-[#c59b27]" />
            <span>المدة الإجمالية للرحلة: 15 يومًا لجميع المسارات</span>
          </div>
        </div>

        {/* 2 Routes Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {ROUTES.map((route, index) => (
            <div
              key={route.id}
              className="flex flex-col justify-between rounded-2xl bg-white p-7 sm:p-8 border border-[#ded5c2] shadow-sm hover:shadow-xl hover:border-[#c59b27] transition-all duration-300 relative group"
            >
              {/* Top Route Sequence Badges */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-6 flex-wrap">
                  <span className="text-xs font-black px-3.5 py-1.5 bg-[#0c3227] text-white rounded-lg">
                    {index === 0 ? 'المسار الأول' : 'المسار الثاني'}
                  </span>
                  <span className="text-xs font-bold text-[#8d6919] bg-[#f7f2e7] px-3 py-1 rounded-md">
                    15 يومًا
                  </span>
                </div>

                {/* Steps Visual Chain */}
                <div className="flex items-center justify-between gap-1 p-3.5 bg-[#fcfaf5] rounded-xl border border-[#ede5d4] mb-6 overflow-x-auto">
                  {route.stops.map((stop, sIndex) => (
                    <React.Fragment key={sIndex}>
                      <span className="text-xs font-bold text-[#0c3227] px-2.5 py-1 bg-white rounded-md border border-[#e4dccb] shadow-xs whitespace-nowrap">
                        {stop}
                      </span>
                      {sIndex < route.stops.length - 1 && (
                        <ArrowLeft className="w-3.5 h-3.5 text-[#c59b27] flex-shrink-0" />
                      )}
                    </React.Fragment>
                  ))}
                </div>

                {/* Route Title */}
                <h3 className="text-xl font-black text-[#0c3227] mb-3 leading-snug">
                  {route.title}
                </h3>

                {/* Departure info */}
                <div className="text-xs font-semibold text-[#8d6919] mb-4">
                  نقطة الانطلاق: {route.departure}
                </div>

                {/* Description */}
                <p className="text-sm text-[#4b5a52] leading-relaxed mb-6">
                  {route.description}
                </p>

                {/* Highlights List */}
                <div className="space-y-2.5 mb-6">
                  <div className="text-xs font-bold text-[#1f2f27]">أبرز ما يميز هذا المسار:</div>
                  {route.highlights.map((highlight, hIndex) => (
                    <div key={hIndex} className="flex items-start gap-2.5 text-xs text-[#415148]">
                      <CheckCircle2 className="w-4 h-4 text-[#c59b27] flex-shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>

                {/* Recommended For */}
                <div className="p-3.5 rounded-xl bg-[#edf5f1] border border-[#d3e5dc] text-xs text-[#174636] font-medium mb-6">
                  <span className="font-bold">يناسب: </span>
                  {route.recommendedFor}
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onSelectRoute(route.title)}
                className="w-full py-3.5 px-4 bg-[#f4eee2] hover:bg-[#0c3227] text-[#0c3227] hover:text-white font-bold text-sm rounded-xl border border-[#d6cbba] transition-all flex items-center justify-center gap-2 group-hover:bg-[#0c3227] group-hover:text-white"
              >
                <span>اختر هذا المسار في نموذج الحجز</span>
                <span className="text-base">←</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
