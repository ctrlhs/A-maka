import React, { useState } from 'react';
import {
  CaretLeft,
  CaretRight,
  MapPin,
  ArrowSquareOut,
  BookOpen,
  Info,
  Clock,
} from '@phosphor-icons/react';
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
    <div className="bg-white rounded-2xl border border-[#ded5c2] shadow-sm p-5 sm:p-8 space-y-6" dir="rtl">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-[#eee8dc]">
        <div>
          <h3 className="text-lg sm:text-xl font-black text-[#0c3227]">
            رحلة الهجرة النبوية الشريفة (مكة المكرمة ← المدينة المنورة)
          </h3>
          <p className="text-xs sm:text-sm text-[#5d6c65] mt-1">
            محطات مرتبة زمنياً تروي تفاصيل الهجرة النبوية بالروايات المعتمدة والتحقيق الجغرافي.
          </p>
        </div>

        {/* Station Counter Badge */}
        <div className="bg-[#fbf9f4] px-3.5 py-1.5 rounded-xl border border-[#e2d8c5]">
          <span className="text-xs font-black text-[#0c3227]">
            المحطة {currentIndex + 1} من {HIJRAH_STATIONS.length}
          </span>
        </div>
      </div>

      {/* Progress Bar & Stations Stepper */}
      <div className="space-y-3">
        <div className="h-1.5 w-full bg-[#f1ebe0] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#0c3227] transition-all duration-300 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
          {HIJRAH_STATIONS.map((st, idx) => {
            const isActive = idx === currentIndex;
            const isCompleted = idx < currentIndex;
            return (
              <button
                key={st.id}
                onClick={() => setCurrentIndex(idx)}
                className={`py-2 px-2 rounded-xl text-xs font-bold transition-all text-center flex flex-col items-center gap-0.5 ${
                  isActive
                    ? 'bg-[#0c3227] text-white shadow-xs'
                    : isCompleted
                    ? 'bg-[#edf5f1] text-[#0c3227] border border-[#cbe1d6]'
                    : 'bg-[#faf7f0] text-[#718078] border border-[#e8ded0] hover:bg-[#f3ede1]'
                }`}
              >
                <span className="text-[10px] opacity-75">محطة {idx + 1}</span>
                <span className="truncate w-full text-[11px]">
                  {st.title.split(':')[1]?.trim() || st.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Current Station Details Display */}
      <div className="bg-[#faf7f0] rounded-2xl p-5 sm:p-7 border border-[#e5dccb] space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#ebdfcb]">
          <div>
            <span className="text-xs font-bold text-[#8d6919] bg-[#f2e9d7] px-2.5 py-0.5 rounded mb-1.5 inline-block">
              {station.title.split(':')[0]}
            </span>
            <h4 className="text-lg sm:text-xl font-black text-[#0c3227]">
              {station.title.split(':')[1] || station.title}
            </h4>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white rounded-lg border border-[#d8cfbd] text-xs font-semibold text-[#0c3227]">
              <MapPin size={14} className="text-[#b3881e]" />
              <span>{station.locationName}</span>
            </span>

            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white rounded-lg border border-[#d8cfbd] text-xs font-semibold text-[#8d6919]">
              <Clock size={14} className="text-[#b3881e]" />
              <span>{station.timeframe}</span>
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <h5 className="text-xs font-bold text-[#1f2f27]">
            أحداث القصة الموثقة:
          </h5>
          <p className="text-xs sm:text-sm text-[#2c3d35] leading-relaxed font-normal bg-white p-4 rounded-xl border border-[#ded5c2]">
            {station.story}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          <div className="bg-white p-3.5 rounded-xl border border-[#ded5c2]">
            <span className="text-xs font-bold text-[#0c3227] mb-2 flex items-center gap-1.5">
              <BookOpen size={16} className="text-[#c59b27]" />
              <span>المصادر التاريخية:</span>
            </span>
            <ul className="space-y-1 text-xs text-[#52625a]">
              {station.sources.map((src, i) => (
                <li key={i} className="flex items-start gap-1">
                  <span className="text-[#c59b27] font-bold">•</span>
                  <span>{src}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-[#ded5c2]">
            <span className="text-xs font-bold text-[#0c3227] mb-2 flex items-center gap-1.5">
              <Info size={16} className="text-[#c59b27]" />
              <span>التحقيق الجغرافي للموقع:</span>
            </span>
            <p className="text-xs text-[#52625a] leading-relaxed">
              {station.notesOnGeography}
            </p>
            <div className="mt-2.5">
              {station.isConfirmedLocation ? (
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 inline-block">
                  ✓ موقع قطعي التحديد
                </span>
              ) : (
                <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200 inline-block">
                  ~ مسار وتقدير جغرافي متواتر
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <button
            onClick={() =>
              onAskAboutStation(
                `احكِ لي ما حدث في «${station.title}» خلال الهجرة النبوية المباركة والدروس المستفادة منها.`
              )
            }
            className="px-4 py-2.5 bg-[#0c3227] hover:bg-[#07241c] text-white font-bold text-xs rounded-xl transition-all"
          >
            <span>اسأل المرشد عن هذه المحطة</span>
          </button>

          {station.mapUrl && (
            <a
              href={station.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2.5 bg-white hover:bg-[#f6f0e4] text-[#0c3227] font-bold text-xs rounded-xl border border-[#d8cfbe] transition-all flex items-center gap-1.5"
            >
              <MapPin size={14} className="text-[#c59b27]" />
              <span>عرض الموقع على الخريطة</span>
              <ArrowSquareOut size={12} className="text-[#808d85]" />
            </a>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between pt-1">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="px-4 py-2 rounded-xl border border-[#ded5c2] text-xs font-bold text-[#0c3227] hover:bg-[#faf7f0] transition-all flex items-center gap-1.5 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <CaretRight size={14} weight="bold" />
          <span>المحطة السابقة</span>
        </button>

        <span className="text-xs text-[#808d85] font-semibold">
          المحطة {currentIndex + 1} من {HIJRAH_STATIONS.length}
        </span>

        <button
          onClick={handleNext}
          disabled={currentIndex === HIJRAH_STATIONS.length - 1}
          className="px-4 py-2 rounded-xl bg-[#0c3227] hover:bg-[#07241c] text-white text-xs font-bold transition-all flex items-center gap-1.5 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <span>المحطة التالية</span>
          <CaretLeft size={14} weight="bold" />
        </button>
      </div>
    </div>
  );
};
