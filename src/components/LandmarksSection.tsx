import React, { useState } from 'react';
import { MapPin } from '@phosphor-icons/react';
import { LANDMARKS } from '../data/content';

export const LandmarksSection: React.FC = () => {
  const [filterCity, setFilterCity] = useState<'all' | 'مكة المكرمة' | 'المدينة المنورة'>('all');

  const makkahLandmarks = LANDMARKS.filter((l) => l.city === 'مكة المكرمة');
  const madinahLandmarks = LANDMARKS.filter((l) => l.city === 'المدينة المنورة');

  return (
    <section id="landmarks" className="py-16 lg:py-20 bg-[#f4f0e7] relative overflow-hidden" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-4xl font-black text-[#0c3227] tracking-tight mb-3">
            المزارات والمعالم التاريخية
          </h2>
          <p className="text-sm sm:text-base text-[#4f5d56] leading-relaxed">
            تشمل رحلتنا زيارات ميدانية لمعالم مكة المكرمة والمدينة المنورة لجميع المشاركين ضمن المجموعة.
          </p>

          {/* Group Filter Buttons */}
          <div className="flex items-center justify-center gap-2 mt-6">
            <button
              onClick={() => setFilterCity('all')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                filterCity === 'all'
                  ? 'bg-[#0c3227] text-white shadow-xs'
                  : 'bg-white text-[#4a5550] border border-[#d8cfbe] hover:bg-[#ede5d4]'
              }`}
            >
              جميع المعالم ({LANDMARKS.length})
            </button>
            <button
              onClick={() => setFilterCity('مكة المكرمة')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                filterCity === 'مكة المكرمة'
                  ? 'bg-[#0c3227] text-white shadow-xs'
                  : 'bg-white text-[#4a5550] border border-[#d8cfbe] hover:bg-[#ede5d4]'
              }`}
            >
              مكة المكرمة ({makkahLandmarks.length})
            </button>
            <button
              onClick={() => setFilterCity('المدينة المنورة')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                filterCity === 'المدينة المنورة'
                  ? 'bg-[#0c3227] text-white shadow-xs'
                  : 'bg-white text-[#4a5550] border border-[#d8cfbe] hover:bg-[#ede5d4]'
              }`}
            >
              المدينة المنورة ({madinahLandmarks.length})
            </button>
          </div>
        </div>

        {/* Makkah Group */}
        {(filterCity === 'all' || filterCity === 'مكة المكرمة') && (
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-6 border-b border-[#ded5c2] pb-3">
              <MapPin size={20} className="text-[#b3881e]" />
              <h3 className="text-lg sm:text-xl font-bold text-[#0c3227]">
                معالم مكة المكرمة ({makkahLandmarks.length})
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {makkahLandmarks.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl overflow-hidden border border-[#ded5c2] shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-48 sm:h-52 overflow-hidden bg-[#e8e2d5]">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        onError={(e) => {
                          // Fallback to Kaaba photo
                          (e.currentTarget as HTMLImageElement).src =
                            'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?q=80&w=1200&auto=format&fit=crop';
                        }}
                      />
                      <div className="absolute top-3 right-3 bg-white/90 px-2.5 py-1 rounded-md text-xs font-bold text-[#0c3227]">
                        {item.city}
                      </div>
                    </div>

                    <div className="p-5">
                      <span className="text-[11px] font-bold text-[#8d6919] block mb-1">
                        {item.category}
                      </span>
                      <h4 className="text-base font-black text-[#0c3227] mb-2 leading-snug">
                        {item.name}
                      </h4>
                      <p className="text-xs text-[#526058] leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="px-5 py-3 bg-[#faf7f0] border-t border-[#ede5d4] text-[11px] text-[#788880] font-medium">
                    مشمولة ببرنامج الزيارات الجماعية
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Madinah Group */}
        {(filterCity === 'all' || filterCity === 'المدينة المنورة') && (
          <div>
            <div className="flex items-center gap-2 mb-6 border-b border-[#ded5c2] pb-3">
              <MapPin size={20} className="text-[#b3881e]" />
              <h3 className="text-lg sm:text-xl font-bold text-[#0c3227]">
                معالم المدينة المنورة ({madinahLandmarks.length})
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {madinahLandmarks.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl overflow-hidden border border-[#ded5c2] shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-48 sm:h-52 overflow-hidden bg-[#e8e2d5]">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src =
                            'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1200&auto=format&fit=crop';
                        }}
                      />
                      <div className="absolute top-3 right-3 bg-white/90 px-2.5 py-1 rounded-md text-xs font-bold text-[#0c3227]">
                        {item.city}
                      </div>
                    </div>

                    <div className="p-5">
                      <span className="text-[11px] font-bold text-[#8d6919] block mb-1">
                        {item.category}
                      </span>
                      <h4 className="text-base font-black text-[#0c3227] mb-2 leading-snug">
                        {item.name}
                      </h4>
                      <p className="text-xs text-[#526058] leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="px-5 py-3 bg-[#faf7f0] border-t border-[#ede5d4] text-[11px] text-[#788880] font-medium">
                    مشمولة ببرنامج الزيارات الجماعية
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
