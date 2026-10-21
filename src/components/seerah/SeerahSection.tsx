import React, { useState } from 'react';
import {
  Sparkles,
  Bot,
  MapPin,
  Compass,
  BookOpen,
} from 'lucide-react';
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

    // Scroll smoothly to chat
    const chatElement = document.getElementById('seerah-guide');
    if (chatElement) {
      chatElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="seerah-guide" className="py-16 lg:py-24 bg-[#f6f2e8] relative overflow-hidden" dir="rtl">
      {/* Decorative Background */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#c59b27]/40 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#eee7d8] border border-[#dccfb6] text-[#8d6919] text-xs font-bold mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#b3881e]" />
            <span>ميزة تفاعلية جديدة مدعومة بـ Gemini AI</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-[#0c3227] tracking-tight mb-4">
            مرشد السيرة النبوية | Seerah Guide
          </h2>

          <p className="text-sm sm:text-base text-[#4b5a52] leading-relaxed max-w-2xl mx-auto">
            اكتشف أحداث السيرة النبوية العطرة، وتعرّف على الأماكن التي ارتبطت بها، وانطلق في رحلة معرفية موثقة عبر التاريخ الإسلامي.
          </p>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-10 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setActiveTab('chat')}
            className={`px-5 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'chat'
                ? 'bg-[#0c3227] text-white shadow-md ring-2 ring-[#c59b27]'
                : 'bg-white text-[#47574e] border border-[#d8cfbe] hover:bg-[#ede5d4]'
            }`}
          >
            <Bot className="w-4 h-4 text-[#e5c158]" />
            <span>المحادثة الذكية مع المرشد</span>
          </button>

          <button
            onClick={() => setActiveTab('places')}
            className={`px-5 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'places'
                ? 'bg-[#0c3227] text-white shadow-md ring-2 ring-[#c59b27]'
                : 'bg-white text-[#47574e] border border-[#d8cfbe] hover:bg-[#ede5d4]'
            }`}
          >
            <MapPin className="w-4 h-4 text-[#e5c158]" />
            <span>اكتشف أماكن السيرة (7 مواقع)</span>
          </button>

          <button
            onClick={() => setActiveTab('hijrah')}
            className={`px-5 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'hijrah'
                ? 'bg-[#0c3227] text-white shadow-md ring-2 ring-[#c59b27]'
                : 'bg-white text-[#47574e] border border-[#d8cfbe] hover:bg-[#ede5d4]'
            }`}
          >
            <Compass className="w-4 h-4 text-[#e5c158]" />
            <span>رحلة الهجرة النبوية</span>
          </button>

          <button
            onClick={() => setActiveTab('references')}
            className={`px-5 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'references'
                ? 'bg-[#0c3227] text-white shadow-md ring-2 ring-[#c59b27]'
                : 'bg-white text-[#47574e] border border-[#d8cfbe] hover:bg-[#ede5d4]'
            }`}
          >
            <BookOpen className="w-4 h-4 text-[#e5c158]" />
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
