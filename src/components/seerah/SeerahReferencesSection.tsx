import React from 'react';
import { BookOpen, CheckCircle } from '@phosphor-icons/react';
import { SEERAH_REFERENCES } from '../../data/seerahData';

export const SeerahReferencesSection: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl border border-[#ded5c2] shadow-xs p-5 sm:p-8 space-y-5" dir="rtl">
      <div>
        <h3 className="text-lg sm:text-xl font-black text-[#0c3227]">
          المصادر والمراجع التاريخية المعتمدة
        </h3>
        <p className="text-xs sm:text-sm text-[#5d6c65] mt-1 leading-relaxed">
          تعتمد إجابات المرشد على أمهات كتب الحديث والتاريخ الإسلامي المعتمدة:
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {SEERAH_REFERENCES.map((ref) => (
          <div
            key={ref.id}
            className="p-4 rounded-xl bg-[#faf7f0] border border-[#e5dccb]"
          >
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#0c3227] text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                <BookOpen size={16} className="text-[#e5c158]" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-[#0c3227]">{ref.title}</h4>
                <div className="flex items-center gap-1.5 text-[10px] text-[#8d6919] mt-0.5">
                  <span>{ref.author}</span>
                  <span>•</span>
                  <span>{ref.era}</span>
                </div>
                <p className="text-xs text-[#4b5952] mt-1.5 leading-relaxed">
                  {ref.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-3.5 rounded-xl bg-[#edf5f1] border border-[#d2e7dd] text-xs text-[#134937] leading-relaxed flex items-start gap-2">
        <CheckCircle size={16} weight="fill" className="text-[#0c3227] flex-shrink-0 mt-0.5" />
        <div>
          <strong className="font-bold">منهجية التوثيق: </strong>
          الاعتماد على الروايات الثابتة في الصحاح، وتوضيح ما كان موضع خلاف أو ضعف دون جزم.
        </div>
      </div>
    </div>
  );
};
