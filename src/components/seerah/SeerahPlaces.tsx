import React, { useState } from 'react';
import { MapPin, ArrowSquareOut, BookOpen, Compass, CheckCircle } from '@phosphor-icons/react';
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
    <div className="space-y-6" dir="rtl">
      {/* Intro & City Filter */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 sm:p-5 rounded-2xl border border-[#ded5c2] shadow-xs">
        <div>
          <h3 className="text-base sm:text-lg font-black text-[#0c3227] flex items-center gap-2">
            <Compass size={20} className="text-[#c59b27]" />
            <span>أماكن ومعالم السيرة النبوية</span>
          </h3>
          <p className="text-xs text-[#586860] mt-0.5">
            استكشف المواقع الموثقة في السيرة النبوية مع إحداثياتها الجغرافية ومصادرها.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setFilterCity('all')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
              filterCity === 'all'
                ? 'bg-[#0c3227] text-white'
                : 'bg-[#faf7f0] text-[#4a5550] border border-[#d8cfbe] hover:bg-[#ede5d4]'
            }`}
          >
            جميع المعالم ({SEERAH_PLACES.length})
          </button>
          <button
            onClick={() => setFilterCity('مكة المكرمة')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
              filterCity === 'مكة المكرمة'
                ? 'bg-[#0c3227] text-white'
                : 'bg-[#faf7f0] text-[#4a5550] border border-[#d8cfbe] hover:bg-[#ede5d4]'
            }`}
          >
            مكة المكرمة
          </button>
          <button
            onClick={() => setFilterCity('المدينة المنورة')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
              filterCity === 'المدينة المنورة'
                ? 'bg-[#0c3227] text-white'
                : 'bg-[#faf7f0] text-[#4a5550] border border-[#d8cfbe] hover:bg-[#ede5d4]'
            }`}
          >
            المدينة المنورة
          </button>
          <button
            onClick={() => setFilterCity('أخرى')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
              filterCity === 'أخرى'
                ? 'bg-[#0c3227] text-white'
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
            className="bg-white rounded-2xl border border-[#ded5c2] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              {/* Photo & Badge */}
              <div className="relative h-44 sm:h-48 overflow-hidden bg-[#e8e2d5]">
                <img
                  src={place.image}
                  alt={place.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?q=80&w=1200&auto=format&fit=crop';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* City Tag */}
                <div className="absolute top-3 right-3 bg-white/90 px-2.5 py-1 rounded-md text-xs font-bold text-[#0c3227]">
                  {place.city}
                </div>

                {/* Title */}
                <div className="absolute bottom-3 right-3 left-3">
                  <span className="text-[10px] font-bold text-[#f5d77f] block">
                    {place.category}
                  </span>
                  <h4 className="text-sm sm:text-base font-black text-white leading-snug">
                    {place.name}
                  </h4>
                </div>
              </div>

              {/* Body */}
              <div className="p-4 space-y-3">
                <div className="p-2 rounded-lg bg-[#faf7f0] border border-[#eee5d4]">
                  <span className="text-[10px] font-bold text-[#8d6919] block">
                    الحدث المرتبط:
                  </span>
                  <span className="text-xs font-bold text-[#0c3227]">
                    {place.event}
                  </span>
                </div>

                <p className="text-xs text-[#4d5c55] leading-relaxed">
                  {place.historicalOverview}
                </p>

                <div className="space-y-1 pt-1">
                  <div className="text-[11px] font-bold text-[#1f2f27] flex items-center gap-1">
                    <BookOpen size={14} className="text-[#c59b27]" />
                    <span>المصادر التاريخية:</span>
                  </div>
                  {place.sources.map((src, sIdx) => (
                    <div key={sIdx} className="text-[11px] text-[#6b7b73] flex items-start gap-1 pr-1">
                      <span className="text-[#c59b27]">•</span>
                      <span>{src}</span>
                    </div>
                  ))}
                </div>

                {place.authenticityNote && (
                  <div className="p-2 rounded-lg bg-[#edf5f1] border border-[#d2e7dd] text-[10px] text-[#134937] flex items-start gap-1.5">
                    <CheckCircle size={14} weight="fill" className="text-[#0c3227] flex-shrink-0 mt-0.5" />
                    <span>{place.authenticityNote}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Action Buttons */}
            <div className="p-3.5 bg-[#faf7f0] border-t border-[#eee8dc] flex items-center gap-2">
              <button
                onClick={() => onAskAboutPlace(place.suggestedPrompt)}
                className="flex-1 py-2 px-3 bg-[#0c3227] hover:bg-[#07241c] text-white font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5"
              >
                <span>اكتشف القصة</span>
              </button>

              {place.mapUrl && (
                <a
                  href={place.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2 px-3 bg-white hover:bg-[#f2ece0] text-[#0c3227] font-bold text-xs rounded-xl border border-[#d8cfbe] transition-all flex items-center justify-center gap-1"
                  title="عرض الموقع على الخريطة"
                >
                  <MapPin size={14} className="text-[#c59b27]" />
                  <span>الخريطة</span>
                  <ArrowSquareOut size={12} className="text-[#798880]" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
