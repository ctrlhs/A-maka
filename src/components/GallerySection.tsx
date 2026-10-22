import React, { useState, useRef } from 'react';
import {
  Certificate,
  MapPin,
  MagnifyingGlassPlus,
  X,
  Printer,
  WhatsappLogo,
  CheckCircle,
  Sparkle,
} from '@phosphor-icons/react';
import { SITE_CONFIG } from '../data/content';

interface GalleryItem {
  id: string;
  title: string;
  category: 'certificates' | 'makkah' | 'madinah' | 'landmarks';
  categoryLabel: string;
  location: string;
  date?: string;
  image: string;
  description: string;
  isCertificate?: boolean;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'rawdah-cert-1',
    title: 'شهادة إتمام زيارة الروضة الشريفة - معتمر الفوج',
    category: 'certificates',
    categoryLabel: 'شهادة موثقة',
    location: 'الروضة الشريفة - المسجد النبوي',
    date: '20/10/2026',
    image: '/images/gallery/rawdah-cert-1.jpg',
    description: 'شهادة رسمية موثقة لتمام الصلاة والزيارة في الروضة الشريفة وفق تنظيم منصة نُسك برعاية وإشراف المشرفة أسماء عبدالكريم.',
    isCertificate: true,
  },
  {
    id: 'kaaba-night',
    title: 'الكعبة المشرفة وصحن المطاف وبرج الساعة',
    category: 'makkah',
    categoryLabel: 'مكة المكرمة',
    location: 'المسجد الحرام - مكة المكرمة',
    image: '/images/landmarks/al-masjid-al-haram.jpg',
    description: 'أجواء الطواف الإيمانية وصلاة الجماعة في رحاب الكعبة المشرفة بمكة المكرمة.',
  },
  {
    id: 'prophet-mosque',
    title: 'المسجد النبوي الشريف والمظلات والساحات',
    category: 'madinah',
    categoryLabel: 'المدينة المنورة',
    location: 'المسجد النبوي - المدينة المنورة',
    image: '/images/landmarks/al-masjid-an-nabawi.jpg',
    description: 'أجواء الطمأنينة والسلام على الحبيب المصطفى ﷺ والصلاة في ساحات المسجد النبوي الشريف.',
  },
  {
    id: 'mount-nour',
    title: 'جبل النور وموقع غار حراء بمكة المكرمة',
    category: 'landmarks',
    categoryLabel: 'مزار تاريخي',
    location: 'جبل النور - مكة المكرمة',
    image: '/images/landmarks/mount-nour.jpg',
    description: 'جولة تعريفية لزيارة جبل النور التاريخي حيث تنزلت أولى آيات الذكر الحكيم.',
  },
  {
    id: 'mount-uhud',
    title: 'جبل أحد التاريخي بالمدينة المنورة',
    category: 'landmarks',
    categoryLabel: 'مزار تاريخي',
    location: 'ميدان أحد - المدينة المنورة',
    image: '/images/landmarks/mount-uhud.jpg',
    description: '«أُحُد جبل يحبنا ونحبه» - زيارة ميدانية لموقع جبل أحد التاريخي وساحاته المباركة.',
  },
  {
    id: 'archers-hill',
    title: 'جبل الرماة ومقبرة شهداء أحد',
    category: 'landmarks',
    categoryLabel: 'مزار تاريخي',
    location: 'ساحة غزوة أحد - المدينة المنورة',
    image: '/images/landmarks/archers-hill.jpg',
    description: 'استحضار أحداث غزوة أحد وزيارة مقبرة سيد الشهداء حمزة بن عبدالمطلب والصحابة رضي الله عنهم.',
  },
];

export const GallerySection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<
    'all' | 'certificates' | 'makkah' | 'madinah' | 'landmarks'
  >('all');
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  // Certificate Generator State
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);
  const [certName, setCertName] = useState('محمد حسين محمد حسن');
  const [certDate, setCertDate] = useState('20/10/2026');
  const certPrintRef = useRef<HTMLDivElement>(null);

  const filteredItems =
    selectedCategory === 'all'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === selectedCategory);

  const handlePrintCertificate = () => {
    window.print();
  };

  const handleShareCertificate = () => {
    const text = `مبارك عليك تمام زيارة الروضة الشريفة يا ${certName} في تاريخ ${certDate} - نسأل الله أن يتقبل منك ويزيدك نوراً وقرباً. رحلات عمرة أسوان بإشراف أ. أسماء عبدالكريم.`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <section id="gallery" className="py-16 lg:py-20 bg-[#faf7f0] relative overflow-hidden" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#eee7d8] border border-[#dccfb6] text-[#8d6919] text-xs font-bold mb-3">
            <Certificate size={16} className="text-[#b3881e]" />
            <span>توثيق رحلاتنا المعتمدة</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-[#0c3227] tracking-tight mb-3">
            معرض صور الرحلة وشهادات الروضة الشريفة
          </h2>

          <p className="text-sm sm:text-base text-[#4f5d56] leading-relaxed">
            لقطات ميدانية حقيقية من جولات مكة المكرمة والمدينة المنورة، ونماذج موثقة من تصاريح وشهادات إتمام زيارة الروضة الشريفة لمعتمرينا برعاية المشرفة السياحية {SITE_CONFIG.supervisor}.
          </p>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            {[
              { id: 'all', label: `جميع الصور (${GALLERY_ITEMS.length})` },
              { id: 'certificates', label: 'شهادات زيارة الروضة' },
              { id: 'makkah', label: 'مكة المكرمة' },
              { id: 'madinah', label: 'المدينة المنورة' },
              { id: 'landmarks', label: 'المزارات التاريخية' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id as any)}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                  selectedCategory === tab.id
                    ? 'bg-[#0c3227] text-white shadow-xs'
                    : 'bg-white text-[#4a5550] border border-[#d8cfbe] hover:bg-[#ede5d4]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Banner: Rawdah Certificate Service */}
        <div className="mb-10 p-5 sm:p-7 rounded-2xl bg-gradient-to-l from-[#0c3227] to-[#124234] text-white border border-[#215a48] shadow-md flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="space-y-2 text-right">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#164939] text-[#f5d77f] text-xs font-bold">
              <Sparkle size={14} weight="fill" />
              <span>ميزة خاصة لمعتمري رحلتنا</span>
            </div>
            <h3 className="text-lg sm:text-xl font-black text-white">
              تنسيق حجز تصاريح الروضة الشريفة وتوثيق الزيارة
            </h3>
            <p className="text-xs sm:text-sm text-[#c2d3cc] max-w-2xl leading-relaxed">
              تحرص المشرفة السياحية {SITE_CONFIG.supervisor} على مساعدة كافة أفراد الفوج في استخراج تصاريح الروضة الشريفة الرسمية عبر تطبيق نُسك، والتأكد من تمام الصلاة والزيارة بسلام وطمأنينة.
            </p>
          </div>

          <button
            onClick={() => setIsCertModalOpen(true)}
            className="w-full md:w-auto px-6 py-3 bg-gradient-to-l from-[#d4af37] via-[#e5c158] to-[#c59b27] hover:from-[#c59b27] hover:to-[#b3881e] text-[#0c3227] font-black text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
          >
            <Certificate size={18} weight="fill" />
            <span>معاينة شهادة زيارة الروضة باسمك</span>
          </button>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveItem(item)}
              className="group bg-white rounded-2xl overflow-hidden border border-[#ded5c2] shadow-xs hover:shadow-md transition-all flex flex-col justify-between cursor-pointer"
            >
              <div>
                {/* Image Container */}
                <div className="relative h-60 overflow-hidden bg-[#e8e2d5]">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />

                  {/* Category Pill */}
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-md text-[11px] font-bold text-[#0c3227] shadow-xs flex items-center gap-1.5">
                    {item.isCertificate ? (
                      <Certificate size={14} className="text-[#8d6919]" />
                    ) : (
                      <MapPin size={14} className="text-[#8d6919]" />
                    )}
                    <span>{item.categoryLabel}</span>
                  </div>

                  {/* Zoom Icon Overlay */}
                  <div className="absolute bottom-3 left-3 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <MagnifyingGlassPlus size={16} />
                  </div>

                  {item.date && (
                    <div className="absolute bottom-3 right-3 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded backdrop-blur-xs font-mono">
                      {item.date}
                    </div>
                  )}
                </div>

                {/* Card Content */}
                <div className="p-4 sm:p-5">
                  <h4 className="text-sm sm:text-base font-black text-[#0c3227] mb-1.5 leading-snug group-hover:text-[#8d6919] transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs text-[#526058] leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-5 py-3 bg-[#faf7f0] border-t border-[#ede5d4] flex items-center justify-between text-[11px] text-[#788880]">
                <span className="flex items-center gap-1">
                  <MapPin size={13} className="text-[#b3881e]" />
                  <span>{item.location}</span>
                </span>
                <span className="text-[#8d6919] font-bold">عرض للتكبير ←</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeItem && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setActiveItem(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl relative animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
            dir="rtl"
          >
            <div className="relative max-h-[65vh] bg-[#0c3227] flex items-center justify-center overflow-hidden">
              <img
                src={activeItem.image}
                alt={activeItem.title}
                className="max-h-[65vh] w-auto max-w-full object-contain mx-auto"
              />
              <button
                onClick={() => setActiveItem(null)}
                className="absolute top-3 left-3 w-9 h-9 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-5 sm:p-6 text-right space-y-2">
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs font-bold text-[#8d6919] bg-[#f8f4ea] px-3 py-1 rounded-full border border-[#ded5c2]">
                  {activeItem.categoryLabel}
                </span>
                {activeItem.date && (
                  <span className="text-xs text-[#6e7b74] font-mono">
                    التاريخ: {activeItem.date}
                  </span>
                )}
              </div>

              <h3 className="text-lg sm:text-xl font-black text-[#0c3227]">
                {activeItem.title}
              </h3>

              <p className="text-xs sm:text-sm text-[#4b5a52] leading-relaxed">
                {activeItem.description}
              </p>

              <div className="pt-3 border-t border-[#eee8dc] flex items-center justify-between">
                <span className="text-xs text-[#6e7b74] flex items-center gap-1.5">
                  <MapPin size={15} className="text-[#b3881e]" />
                  <span>{activeItem.location}</span>
                </span>

                <button
                  onClick={() => setActiveItem(null)}
                  className="px-4 py-2 bg-[#0c3227] text-white rounded-xl text-xs font-bold hover:bg-[#07241c] transition-colors cursor-pointer"
                >
                  إغلاق
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Certificate Generator Modal */}
      {isCertModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
          onClick={() => setIsCertModalOpen(false)}
        >
          <div
            className="bg-[#fcfaf6] rounded-2xl max-w-2xl w-full p-4 sm:p-6 shadow-2xl relative my-auto animate-in fade-in zoom-in-95 duration-200 border border-[#ded5c2]"
            onClick={(e) => e.stopPropagation()}
            dir="rtl"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#e7decb]">
              <div className="flex items-center gap-2">
                <Certificate size={22} className="text-[#b3881e]" weight="fill" />
                <h3 className="text-base sm:text-lg font-black text-[#0c3227]">
                  شهادة تهنئة إتمام زيارة الروضة الشريفة
                </h3>
              </div>
              <button
                onClick={() => setIsCertModalOpen(false)}
                className="w-8 h-8 rounded-full bg-[#eee7d8] hover:bg-[#ded2bd] text-[#0c3227] flex items-center justify-center transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Controls Input */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5 p-3.5 bg-white rounded-xl border border-[#ded5c2]">
              <div>
                <label className="block text-xs font-bold text-[#0c3227] mb-1">
                  اسم المعتمر الكريم:
                </label>
                <input
                  type="text"
                  value={certName}
                  onChange={(e) => setCertName(e.target.value)}
                  placeholder="اكتب الاسم كما ترغب..."
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-[#d8cfbe] bg-[#faf7f0] text-[#0c3227] focus:outline-none focus:border-[#0c3227]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0c3227] mb-1">
                  تاريخ الزيارة:
                </label>
                <input
                  type="text"
                  value={certDate}
                  onChange={(e) => setCertDate(e.target.value)}
                  placeholder="مثال: 20/10/2026"
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-[#d8cfbe] bg-[#faf7f0] text-[#0c3227] focus:outline-none focus:border-[#0c3227]"
                />
              </div>
            </div>

            {/* Certificate Display Area (Replicating the authentic Nusuk Certificate design) */}
            <div
              ref={certPrintRef}
              className="relative p-6 sm:p-10 bg-white rounded-2xl border-4 border-[#1e6f54] shadow-md text-center overflow-hidden my-2 max-w-lg mx-auto"
              style={{
                backgroundImage: 'radial-gradient(circle at center, #fdfbf7 0%, #faf6ec 100%)',
              }}
            >
              {/* Decorative Corner Ornaments */}
              <div className="absolute top-2 right-2 w-12 h-12 border-t-2 border-r-2 border-[#1e6f54]/60 pointer-events-none" />
              <div className="absolute top-2 left-2 w-12 h-12 border-t-2 border-l-2 border-[#1e6f54]/60 pointer-events-none" />
              <div className="absolute bottom-2 right-2 w-12 h-12 border-b-2 border-r-2 border-[#1e6f54]/60 pointer-events-none" />
              <div className="absolute bottom-2 left-2 w-12 h-12 border-b-2 border-l-2 border-[#1e6f54]/60 pointer-events-none" />

              {/* Mihrab Silhouette Arch at Top */}
              <div className="w-10 h-10 mx-auto mb-3 bg-[#1e6f54] rounded-t-full flex items-center justify-center text-white">
                <span className="text-xs">🕌</span>
              </div>

              {/* Hadith Section */}
              <div className="space-y-1.5 mb-6 text-[#2d3a33]">
                <p className="text-[11px] sm:text-xs text-[#526359] font-serif">
                  عَنْ أَبِي هُرَيْرَةَ رضي الله عنه أَنَّ رَسُولَ اللَّهِ ﷺ قَالَ:
                </p>
                <h4 className="text-sm sm:text-base font-bold text-[#1e6f54] font-serif leading-relaxed px-2">
                  «مَا بَيْنَ بَيْتِي وَمِنْبَرِي رَوْضَةٌ مِنْ رِيَاضِ الجَنَّةِ»
                </h4>
                <p className="text-[10px] text-[#83948b] font-mono">
                  رواه البخاري (1196) ومسلم (1391)
                </p>
              </div>

              {/* Pilgrim Name */}
              <div className="my-6 py-2 px-4 inline-block border-b-2 border-[#1e6f54]/30 min-w-[220px]">
                <span className="text-lg sm:text-2xl font-black text-[#1e6f54] tracking-wide block">
                  {certName || 'اسم المعتمر'}
                </span>
              </div>

              {/* Congratulatory Text */}
              <p className="text-xs sm:text-sm text-[#2c3d34] leading-relaxed max-w-md mx-auto mb-6">
                مبارك عليك تمام زيارة الروضة في{' '}
                <strong className="text-[#1e6f54] font-bold">{certDate}</strong> نسأل الله أن يتقبّل منك ويزيدك نورًا وقربًا.
              </p>

              {/* Footer Stamp / Logo */}
              <div className="pt-4 border-t border-[#eee8dc] flex items-center justify-between text-[10px] text-[#76877f]">
                <div className="flex items-center gap-1 font-bold text-[#1e6f54]">
                  <CheckCircle size={14} weight="fill" />
                  <span>إشراف سياحي: أ. {SITE_CONFIG.supervisor}</span>
                </div>
                <div className="text-[10px] font-bold text-[#8d6919] bg-[#f8f4ea] px-2 py-0.5 rounded">
                  رحلات عمرة أسوان
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-4 border-t border-[#e7decb] mt-4">
              <button
                onClick={handlePrintCertificate}
                className="px-5 py-2.5 bg-[#0c3227] hover:bg-[#07241c] text-white font-bold text-xs sm:text-sm rounded-xl transition-all flex items-center gap-2 cursor-pointer"
              >
                <Printer size={16} />
                <span>طباعة الشهادة / حفظ PDF</span>
              </button>

              <button
                onClick={handleShareCertificate}
                className="px-5 py-2.5 bg-[#25D366] hover:bg-[#1faa53] text-white font-bold text-xs sm:text-sm rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <WhatsappLogo size={16} weight="fill" />
                <span>مشاركة التهنئة عبر واتساب</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
