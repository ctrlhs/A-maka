import React from 'react';

interface KaabaLogoProps {
  className?: string;
  isLight?: boolean;
}

export const KaabaLogo: React.FC<KaabaLogoProps> = ({ className = '', isLight = false }) => {
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* 3D Isometric Kaaba Icon */}
      <div className="relative w-11 h-11 flex-shrink-0">
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
          {/* Outer subtle halo */}
          <circle cx="50" cy="50" r="46" fill={isLight ? "rgba(212, 175, 55, 0.15)" : "rgba(12, 50, 39, 0.08)"} />
          
          {/* Isometric Cube (Kaaba) */}
          {/* Top Face */}
          <polygon points="50,18 80,33 50,48 20,33" fill="#1b2a24" />
          
          {/* Left Face */}
          <polygon points="20,33 50,48 50,82 20,67" fill="#0c1713" />
          
          {/* Right Face */}
          <polygon points="50,48 80,33 80,67 50,82" fill="#141f1a" />
          
          {/* Golden Kiswa Band (Kiswa Belt / Hizam) */}
          <polygon points="20,44 50,59 50,63 20,48" fill="#d4af37" />
          <polygon points="50,59 80,44 80,48 50,63" fill="#c59b27" />
          
          {/* Golden Door of the Kaaba (Bab Al-Kaaba) on the right face */}
          <polygon points="58,54 66,50 66,68 58,72" fill="#e5c158" stroke="#997300" strokeWidth="0.5" />
          
          {/* Golden Crescent or decorative accent */}
          <circle cx="50" cy="14" r="2.5" fill="#d4af37" />
        </svg>
      </div>

      {/* Typography */}
      <div className="flex flex-col text-right leading-tight">
        <span className={`text-xl font-black tracking-tight ${isLight ? 'text-white' : 'text-[#0c3227]'}`}>
          مكة المكرمة
        </span>
        <span className={`text-[9px] font-bold tracking-[0.2em] uppercase ${isLight ? 'text-[#e5c158]' : 'text-[#b3881e]'}`}>
          MAKKAH AL MUKARRAMAH
        </span>
      </div>
    </div>
  );
};
