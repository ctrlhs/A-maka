import React from 'react';
import { BookOpen, ShieldCheck, CheckCircle } from 'lucide-react';
import { SEERAH_REFERENCES } from '../../data/seerahData';

export const SeerahReferencesSection: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl border border-[#ded5c2] shadow-sm p-6 sm:p-9 space-y-6" dir="rtl">
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#eee7d8] border border-[#dccfb6] text-[#8d6919] text-xs font-bold mb-2">
          <ShieldCheck className="w-3.5 h-3.5 text-[#b3881e]" />
          <span>المنهجية والأمانة العلمية</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-black text-[#0c3227]">
          المصادر والمراجع التاريخية المعتمدة
        </h3>
        <p className="text-xs sm:text-sm text-[#5d6c65] mt-1 leading-relaxed">
          يلتزم «مرشد السيرة النبوية» بأعلى معايير التوثيق الإسلامي، مستنداً إلى أمهات كتب الحديث والتاريخ المعتمدة لدى أهل العلم:
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {SEERAH_REFERENCES.map((ref) => (
          <div
            key={ref.id}
            className="p-5 rounded-xl bg-[#faf7f0] border border-[#e5dccb] hover:border-[#c59b27] transition-all"
          >
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#0c3227] text-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-xs">
                <BookOpen className="w-4 h-4 text-[#e5c158]" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#0c3227]">{ref.title}</h4>
                <div className="flex items-center gap-2 text-[11px] text-[#8d6919] mt-0.5">
                  <span>{ref.author}</span>
                  <span>•</span>
                  <span>{ref.era}</span>
                </div>
                <p className="text-xs text-[#4b5952] mt-2 leading-relaxed">
                  {ref.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 rounded-xl bg-[#edf5f1] border border-[#d2e7dd] text-xs text-[#134937] leading-relaxed flex items-start gap-2.5">
        <CheckCircle className="w-4 h-4 text-[#0c3227] flex-shrink-0 mt-0.5" />
        <div>
          <strong className="font-bold">ملاحظة منهجية: </strong>
          الذكاء الاصطناعي مهيأ عبر System Instructions صارمة لتمييز الروايات الصحيحة الثابتة عن الروايات الضعيفة أو المختلف فيها، وعدم اختلاق أي أسانيد أو تفاصيل تاريخية.
        </div>
      </div>
    </div>
  );
};
