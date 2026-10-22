import React, { useState } from 'react';
import {
  ChatCircleDots,
  MapPin,
  Compass,
  BookOpen,
} from '@phosphor-icons/react';
import { SeerahChat } from './SeerahChat';
import { SeerahPlaces } from './SeerahPlaces';
import { HijrahJourney } from './HijrahJourney';
import { SeerahReferencesSection } from './SeerahReferencesSection';

export const SeerahSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'chat' | 'places' | 'hijrah' | 'references'>('chat');
  const [pendingQuestion, setPendingQuestion] = useState<string | undefined>(undefined);

  const handleAskAbout = (prompt: string) => {
    setPendingQuestion(prompt);
    setActiveTab('chat');

    const chatElement = document.getElementById('seerah-guide');
    if (chatElement) {
      chatElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="seerah-guide" className="py-16 lg:py-20 bg-[#f6f2e8] relative overflow-hidden" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <h2 className="text-2xl sm:text-4xl font-black text-[#0c3227] tracking-tight mb-3">
            مرشد السيرة النبوية
          </h2>

          <p className="text-sm sm:text-base text-[#4b5a52] leading-relaxed max-w-2xl mx-auto">
            اكتشف أحداث السيرة النبوية، وتعرّف على الأماكن التي ارتبطت بها، وانطلق في رحلة معرفية عبر التاريخ.
          </p>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-8 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setActiveTab('chat')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'chat'
                ? 'bg-[#0c3227] text-white shadow-xs'
                : 'bg-white text-[#47574e] border border-[#d8cfbe] hover:bg-[#ede5d4]'
            }`}
          >
            <ChatCircleDots size={18} weight="bold" />
            <span>محادثة المرشد</span>
          </button>

          <button
            onClick={() => setActiveTab('places')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'places'
                ? 'bg-[#0c3227] text-white shadow-xs'
                : 'bg-white text-[#47574e] border border-[#d8cfbe] hover:bg-[#ede5d4]'
            }`}
          >
            <MapPin size={18} weight="bold" />
            <span>أماكن السيرة النبوية</span>
          </button>

          <button
            onClick={() => setActiveTab('hijrah')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'hijrah'
                ? 'bg-[#0c3227] text-white shadow-xs'
                : 'bg-white text-[#47574e] border border-[#d8cfbe] hover:bg-[#ede5d4]'
            }`}
          >
            <Compass size={18} weight="bold" />
            <span>رحلة الهجرة النبوية</span>
          </button>

          <button
            onClick={() => setActiveTab('references')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'references'
                ? 'bg-[#0c3227] text-white shadow-xs'
                : 'bg-white text-[#47574e] border border-[#d8cfbe] hover:bg-[#ede5d4]'
            }`}
          >
            <BookOpen size={18} weight="bold" />
            <span>المصادر المعتمدة</span>
          </button>
        </div>

        {/* Tab Content Display */}
        <div>
          {activeTab === 'chat' && (
            <SeerahChat
              initialQuestion={pendingQuestion}
              onQuestionConsumed={() => setPendingQuestion(undefined)}
            />
          )}

          {activeTab === 'places' && (
            <SeerahPlaces onAskAboutPlace={handleAskAbout} />
          )}

          {activeTab === 'hijrah' && (
            <HijrahJourney onAskAboutStation={handleAskAbout} />
          )}

          {activeTab === 'references' && <SeerahReferencesSection />}
        </div>
      </div>
    </section>
  );
};
