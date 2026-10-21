import React, { useState } from 'react';
import { MapPin, ExternalLink, BookOpen, Sparkles, Compass, CheckCircle2 } from 'lucide-react';
import { SEERAH_PLACES } from '../../data/seerahData';
import type { SeerahPlace } from '../../types/seerah';

interface SeerahPlacesProps {
  onAskAboutPlace: (prompt: string) => void;
}

export const SeerahPlaces: React.FC<SeerahPlacesProps> = ({ onAskAboutPlace }) => {
  const [filterCity, setFilterCity] = useState<'all' | 'مكة المكرمة' | 'المدينة المنورة' | 'أخرى'>('all');

  const filteredPlaces = filterCity === 'all'
    ? SEERAH_PLACES
    : SEERAH_PLACES.filter((p) => {
        if (filterCity === 'أخرى') {
          return p.city !== 'مكة المكرمة' && p.city !== 'المدينة المنورة';
        }
        return p.city === filterCity;
      });

  return (
    <div className="space-y-8" dir="rtl">
      {/* Intro & City Filter */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-[#ded5c2] shadow-sm">
        <div>
          <h3 className="text-lg font-black text-[#0c3227] flex items-center gap-2">
            <Compass className="w-5 h-5 text-[#c59b27]" />
            <span>معالم وأماكن شهدت النبوة والوحي</span>
          </h3>
          <p className="text-xs text-[#586860] mt-1">
            استكشف المواقع الموثقة في السيرة النبوية واطلع على إحداثياتها الجغرافية ومصادرها الحديثية.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setFilterCity('all')}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all ${
              filterCity === 'all'
                ? 'bg-[#0c3227] text-white shadow-xs'
                : 'bg-[#faf7f0] text-[#4a5550] border border-[#d8cfbe] hover:bg-[#ede5d4]'
            }`}
          >
            جميع المعالم ({SEERAH_PLACES.length})
          </button>
          <button
            onClick={() => setFilterCity('مكة المكرمة')}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all ${
              filterCity === 'مكة المكرمة'
                ? 'bg-[#0c3227] text-white shadow-xs'
                : 'bg-[#faf7f0] text-[#4a5550] border border-[#d8cfbe] hover:bg-[#ede5d4]'
            }`}
          >
            مكة المكرمة
          </button>
          <button
            onClick={() => setFilterCity('المدينة المنورة')}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all ${
              filterCity === 'المدينة المنورة'
                ? 'bg-[#0c3227] text-white shadow-xs'
                : 'bg-[#faf7f0] text-[#4a5550] border border-[#d8cfbe] hover:bg-[#ede5d4]'
            }`}
          >
            المدينة المنورة
          </button>
          <button
            onClick={() => setFilterCity('أخرى')}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all ${
              filterCity === 'أخرى'
                ? 'bg-[#0c3227] text-white shadow-xs'
                : 'bg-[#faf7f0] text-[#4a5550] border border-[#d8cfbe] hover:bg-[#ede5d4]'
            }`}
          >
            بدر ومسار الهجرة
          </button>
        </div>
      </div>

      {/* Places Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlaces.map((place: SeerahPlace) => (
          <div
            key={place.id}
            className="bg-white rounded-2xl border border-[#ded5c2] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
          >
            <div>
              {/* Photo & Badge */}
              <div className="relative h-48 sm:h-52 overflow-hidden">
                <img
                  src={place.image}
                  alt={place.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

                {/* City Tag */}
                <div className="absolute top-3.5 right-3.5 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-[#0c3227] flex items-center gap-1 shadow-sm">
                  <MapPin className="w-3.5 h-3.5 text-[#b3881e]" />
                  <span>{place.city}</span>
                </div>

                {/* Category Banner */}
                <div className="absolute bottom-3 right-3.5 left-3.5">
                  <span className="text-[11px] font-bold text-[#f5d77f] block mb-0.5">
                    {place.category}
                  </span>
                  <h4 className="text-base font-black text-white leading-snug drop-shadow-md">
                    {place.name}
                  </h4>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 space-y-4">
                {/* Event */}
                <div className="p-2.5 rounded-xl bg-[#faf7f0] border border-[#eee5d4]">
                  <span className="text-[11px] font-bold text-[#8d6919] block mb-0.5">
                    الحدث المرتبط به:
                  </span>
                  <span className="text-xs font-bold text-[#0c3227]">
                    {place.event}
                  </span>
                </div>

                {/* Historical Overview */}
                <p className="text-xs text-[#4d5c55] leading-relaxed">
                  {place.historicalOverview}
                </p>

                {/* Sources List */}
                <div className="space-y-1.5 pt-1">
                  <div className="text-[11px] font-bold text-[#1f2f27] flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5 text-[#c59b27]" />
                    <span>المصادر التاريخية:</span>
                  </div>
                  {place.sources.map((src, sIdx) => (
                    <div key={sIdx} className="text-[11px] text-[#6b7b73] flex items-start gap-1.5 pr-1">
                      <span className="text-[#c59b27]">•</span>
                      <span>{src}</span>
                    </div>
                  ))}
                </div>

                {/* Authenticity Note */}
                {place.authenticityNote && (
                  <div className="p-2.5 rounded-lg bg-[#edf5f1] border border-[#d2e7dd] text-[10px] text-[#134937] flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0c3227] flex-shrink-0 mt-0.5" />
                    <span>{place.authenticityNote}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Action Buttons */}
            <div className="p-4 bg-[#faf7f0] border-t border-[#eee8dc] flex items-center gap-2">
              {/* Ask Assistant */}
              <button
                onClick={() => onAskAboutPlace(place.suggestedPrompt)}
                className="flex-1 py-2.5 px-3 bg-[#0c3227] hover:bg-[#07241c] text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#e5c158]" />
                <span>اكتشف القصة</span>
              </button>

              {/* Open on Map */}
              {place.mapUrl && (
                <a
                  href={place.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 bg-white hover:bg-[#f2ece0] text-[#0c3227] font-bold text-xs rounded-xl border border-[#d8cfbe] shadow-xs transition-all flex items-center justify-center gap-1"
                  title="عرض الموقع على خرائط جوجل بإحداثيات موثقة"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#c59b27]" />
                  <span>الخريطة</span>
                  <ExternalLink className="w-3 h-3 text-[#798880]" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
