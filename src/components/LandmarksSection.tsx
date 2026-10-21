import React, { useState } from 'react';
import { MapPin, Sparkles } from 'lucide-react';
import { LANDMARKS } from '../data/content';

export const LandmarksSection: React.FC = () => {
  const [filterCity, setFilterCity] = useState<'all' | 'مكة المكرمة' | 'المدينة المنورة'>('all');

  const filtered = filterCity === 'all'
    ? LANDMARKS
    : LANDMARKS.filter((l) => l.city === filterCity);

  return (
    <section id="landmarks" className="py-16 lg:py-24 bg-[#f4f0e7] relative overflow-hidden" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#eee7d8] border border-[#dccfb6] text-[#8d6919] text-xs font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#b3881e]" />
            <span>المزارات والمعالم التاريخية</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-[#0c3227] tracking-tight mb-4">
            معالم وزيارات إيمانية مشمولة بالرحلة
          </h2>

          <p className="text-base text-[#4f5d56] leading-relaxed">
            تشمل رحلتنا جولات ميسرة لزيارة أقدس البقاع والمعالم النبوية والتاريخية في مكة المكرمة وطيبة الطيبة برفقة المشرفة السياحية.
          </p>

          {/* Filter Pills */}
          <div className="flex items-center justify-center gap-2 mt-6">
            <button
              onClick={() => setFilterCity('all')}
              className={`px-4 py-2 text-xs font-bold rounded-full transition-all ${
                filterCity === 'all'
                  ? 'bg-[#0c3227] text-white shadow-sm'
                  : 'bg-white text-[#4a5550] border border-[#d8cfbe] hover:bg-[#ede5d4]'
              }`}
            >
              جميع المعالم (6)
            </button>
            <button
              onClick={() => setFilterCity('مكة المكرمة')}
              className={`px-4 py-2 text-xs font-bold rounded-full transition-all ${
                filterCity === 'مكة المكرمة'
                  ? 'bg-[#0c3227] text-white shadow-sm'
                  : 'bg-white text-[#4a5550] border border-[#d8cfbe] hover:bg-[#ede5d4]'
              }`}
            >
              مكة المكرمة
            </button>
            <button
              onClick={() => setFilterCity('المدينة المنورة')}
              className={`px-4 py-2 text-xs font-bold rounded-full transition-all ${
                filterCity === 'المدينة المنورة'
                  ? 'bg-[#0c3227] text-white shadow-sm'
                  : 'bg-white text-[#4a5550] border border-[#d8cfbe] hover:bg-[#ede5d4]'
              }`}
            >
              المدينة المنورة
            </button>
          </div>
        </div>

        {/* Landmarks Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl overflow-hidden border border-[#ded5c2] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Image Container */}
                <div className="relative h-52 sm:h-56 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* City Pill */}
                  <div className="absolute top-3.5 right-3.5 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-[#0c3227] flex items-center gap-1 shadow-sm">
                    <MapPin className="w-3.5 h-3.5 text-[#b3881e]" />
                    <span>{item.city}</span>
                  </div>

                  {/* Category Pill */}
                  <div className="absolute bottom-3.5 right-3.5 text-white text-xs font-bold drop-shadow-md">
                    {item.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-lg font-black text-[#0c3227] mb-2 leading-snug">
                    {item.name}
                  </h3>
                  <p className="text-xs text-[#526058] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Bottom Tag */}
              <div className="px-5 py-3 bg-[#faf7f0] border-t border-[#ede5d4] flex items-center justify-between text-[11px] text-[#788880]">
                <span>زيارة مشمولة ببرنامج الرحلة</span>
                <span className="text-[#b3881e] font-bold">مع المشرفة ←</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
