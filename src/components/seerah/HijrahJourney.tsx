import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  ExternalLink,
  BookOpen,
  Sparkles,
  Info,
  Clock,
  Compass,
} from 'lucide-react';
import { HIJRAH_STATIONS } from '../../data/seerahData';
import type { HijrahStation } from '../../types/seerah';

interface HijrahJourneyProps {
  onAskAboutStation: (prompt: string) => void;
}

export const HijrahJourney: React.FC<HijrahJourneyProps> = ({ onAskAboutStation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const station: HijrahStation = HIJRAH_STATIONS[currentIndex];
  const progressPercent = Math.round(((currentIndex + 1) / HIJRAH_STATIONS.length) * 100);

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleNext = () => {
    if (currentIndex < HIJRAH_STATIONS.length - 1) setCurrentIndex(currentIndex + 1);
  };

  return (
    <div className="bg-white rounded-2xl border border-[#ded5c2] shadow-xl p-6 sm:p-9 space-y-8" dir="rtl">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#eee8dc]">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#eee7d8] border border-[#dccfb6] text-[#8d6919] text-xs font-bold mb-2">
            <Compass className="w-3.5 h-3.5 text-[#b3881e]" />
            <span>المسار النبوي التاريخي</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-[#0c3227]">
            رحلة الهجرة النبوية الشريفة (مكة المكرمة ← المدينة المنورة)
          </h3>
          <p className="text-xs sm:text-sm text-[#5d6c65] mt-1">
            رحلة غيرت مجرى التاريخ؛ استكشف محطاتها الست المرتبة زمنياً بالقصص الموثقة والأسانيد الصحيحة.
          </p>
        </div>

        {/* Station Counter Badge */}
        <div className="text-left sm:text-right bg-[#fbf9f4] p-3 rounded-xl border border-[#e2d8c5]">
          <span className="text-xs text-[#808d85] block">المحطة الحالية</span>
          <span className="text-lg font-black text-[#0c3227]">
            {currentIndex + 1} <span className="text-xs text-[#8d6919]">من {HIJRAH_STATIONS.length}</span>
          </span>
        </div>
      </div>

      {/* Progress Bar & Stations Stepper */}
      <div className="space-y-3">
        {/* Progress Bar */}
        <div className="h-2 w-full bg-[#f1ebe0] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-l from-[#d4af37] via-[#c59b27] to-[#0c3227] transition-all duration-500 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Station Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 pt-2">
          {HIJRAH_STATIONS.map((st, idx) => {
            const isActive = idx === currentIndex;
            const isCompleted = idx < currentIndex;
            return (
              <button
                key={st.id}
                onClick={() => setCurrentIndex(idx)}
                className={`py-2 px-2.5 rounded-xl text-xs font-bold transition-all text-center flex flex-col items-center gap-1 ${
                  isActive
                    ? 'bg-[#0c3227] text-white shadow-md ring-2 ring-[#c59b27]'
                    : isCompleted
                    ? 'bg-[#edf5f1] text-[#0c3227] border border-[#cbe1d6]'
                    : 'bg-[#faf7f0] text-[#718078] border border-[#e8ded0] hover:bg-[#f3ede1]'
                }`}
              >
                <span className="text-[10px] opacity-75">محطة {idx + 1}</span>
                <span className="truncate w-full text-[11px] font-black">
                  {st.title.split(':')[1]?.trim() || st.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Current Station Details Display */}
      <div className="bg-[#faf7f0] rounded-2xl p-6 sm:p-8 border border-[#e5dccb] space-y-6">
        {/* Station Title & Meta */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#ebdfcb]">
          <div>
            <span className="text-xs font-bold text-[#8d6919] bg-[#f2e9d7] px-3 py-1 rounded-md mb-2 inline-block">
              {station.title.split(':')[0]}
            </span>
            <h4 className="text-xl sm:text-2xl font-black text-[#0c3227]">
              {station.title.split(':')[1] || station.title}
            </h4>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white rounded-lg border border-[#d8cfbd] text-xs font-semibold text-[#0c3227]">
              <MapPin className="w-3.5 h-3.5 text-[#b3881e]" />
              <span>{station.locationName}</span>
            </span>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white rounded-lg border border-[#d8cfbd] text-xs font-semibold text-[#8d6919]">
              <Clock className="w-3.5 h-3.5 text-[#b3881e]" />
              <span>{station.timeframe}</span>
            </span>
          </div>
        </div>

        {/* The Story */}
        <div className="space-y-3">
          <h5 className="text-xs font-bold text-[#1f2f27] uppercase tracking-wide">
            أحداث القصة الموثقة:
          </h5>
          <p className="text-sm sm:text-base text-[#2c3d35] leading-relaxed font-normal bg-white p-5 rounded-xl border border-[#ded5c2] shadow-xs">
            {station.story}
          </p>
        </div>

        {/* Sources & Geography Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Sources */}
          <div className="bg-white p-4 rounded-xl border border-[#ded5c2]">
            <span className="text-xs font-bold text-[#0c3227] mb-2 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-[#c59b27]" />
              <span>المصادر التاريخية للرواية:</span>
            </span>
            <ul className="space-y-1.5 text-xs text-[#52625a]">
              {station.sources.map((src, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-[#c59b27] font-bold">•</span>
                  <span>{src}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Geography Note */}
          <div className="bg-white p-4 rounded-xl border border-[#ded5c2]">
            <span className="text-xs font-bold text-[#0c3227] mb-2 flex items-center gap-1.5">
              <Info className="w-4 h-4 text-[#c59b27]" />
              <span>التحقيق الجغرافي للموقع:</span>
            </span>
            <p className="text-xs text-[#52625a] leading-relaxed">
              {station.notesOnGeography}
            </p>
            <div className="mt-3">
              {station.isConfirmedLocation ? (
                <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 inline-block">
                  ✓ موقع تاريخي قطعي التحديد
                </span>
              ) : (
                <span className="text-[11px] font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200 inline-block">
                  ~ مسار وتقدير جغرافي متواتر
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Station Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          {/* Ask AI Assistant */}
          <button
            onClick={() =>
              onAskAboutStation(
                `احكِ لي بالتفصيل ما حدث في «${station.title}» خلال الهجرة النبوية المباركة والدروس المستفادة منها.`
              )
            }
            className="px-5 py-3 bg-[#0c3227] hover:bg-[#07241c] text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-[#e5c158]" />
            <span>اسأل مرشد السيرة عن هذه المحطة</span>
          </button>

          {/* Google Maps link if available */}
          {station.mapUrl && (
            <a
              href={station.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-3 bg-white hover:bg-[#f6f0e4] text-[#0c3227] font-bold text-xs sm:text-sm rounded-xl border border-[#d8cfbe] shadow-xs transition-all flex items-center gap-1.5"
            >
              <MapPin className="w-4 h-4 text-[#c59b27]" />
              <span>عرض الموقع على الخريطة</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#808d85]" />
            </a>
          )}
        </div>
      </div>

      {/* Navigation Controls: Prev & Next */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="px-5 py-2.5 rounded-xl border border-[#ded5c2] text-xs sm:text-sm font-bold text-[#0c3227] hover:bg-[#faf7f0] transition-all flex items-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronRight className="w-4 h-4" />
          <span>المحطة السابقة</span>
        </button>

        <span className="text-xs text-[#808d85] font-semibold">
          المحطة {currentIndex + 1} من {HIJRAH_STATIONS.length}
        </span>

        <button
          onClick={handleNext}
          disabled={currentIndex === HIJRAH_STATIONS.length - 1}
          className="px-5 py-2.5 rounded-xl bg-[#0c3227] hover:bg-[#07241c] text-white text-xs sm:text-sm font-bold transition-all flex items-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed shadow-sm"
        >
          <span>المحطة التالية</span>
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
