import { motion } from 'motion/react';
import React from 'react';

export type MascotMood = 'waving' | 'thinking' | 'happy' | 'encouraging' | 'cheering';

interface MascotProps {
  mood?: MascotMood;
  message?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Mascot: React.FC<MascotProps> = ({
  mood = 'waving',
  message,
  size = 'md',
  className = ''
}) => {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32'
  }[size];

  // SVG Owl mascot "Cú Tri Thức"
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <motion.div
        animate={
          mood === 'happy' || mood === 'cheering'
            ? { y: [0, -8, 0], rotate: [0, 4, -4, 0] }
            : mood === 'thinking'
            ? { rotate: [0, -3, 0] }
            : { y: [0, -4, 0] }
        }
        transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
        className={`relative flex-shrink-0 ${sizeClasses}`}
      >
        <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md">
          {/* Owl Body */}
          <ellipse cx="60" cy="68" rx="42" ry="46" fill="#3B82F6" />
          <ellipse cx="60" cy="74" rx="32" ry="36" fill="#EFF6FF" />

          {/* Owl Ears / Tufts */}
          <polygon points="32,32 44,14 48,34" fill="#1D4ED8" />
          <polygon points="88,32 76,14 72,34" fill="#1D4ED8" />

          {/* Graduation Cap / Scholar Hat */}
          <polygon points="60,8 100,24 60,34 20,24" fill="#1E293B" />
          <rect x="52" y="24" width="16" height="8" rx="2" fill="#334155" />
          {/* Tassel */}
          <circle cx="60" cy="20" r="3" fill="#F59E0B" />
          <path d="M60 20 Q80 24 84 38" stroke="#F59E0B" strokeWidth="2.5" fill="none" />
          <polygon points="82,38 88,44 80,44" fill="#F59E0B" />

          {/* Glasses Frame */}
          <circle cx="44" cy="56" r="17" fill="#FFFFFF" stroke="#F59E0B" strokeWidth="3.5" />
          <circle cx="76" cy="56" r="17" fill="#FFFFFF" stroke="#F59E0B" strokeWidth="3.5" />
          <line x1="61" y1="56" x2="59" y2="56" stroke="#F59E0B" strokeWidth="3.5" />

          {/* Eyes depending on mood */}
          {mood === 'happy' || mood === 'cheering' ? (
            <>
              {/* Happy curved eyes */}
              <path d="M37 57 Q44 50 51 57" stroke="#1E293B" strokeWidth="3.5" fill="none" strokeLinecap="round" />
              <path d="M69 57 Q76 50 83 57" stroke="#1E293B" strokeWidth="3.5" fill="none" strokeLinecap="round" />
            </>
          ) : mood === 'thinking' ? (
            <>
              <circle cx="42" cy="53" r="5" fill="#1E293B" />
              <circle cx="74" cy="53" r="5" fill="#1E293B" />
              <circle cx="40" cy="51" r="2" fill="#FFFFFF" />
              <circle cx="72" cy="51" r="2" fill="#FFFFFF" />
            </>
          ) : (
            <>
              <circle cx="44" cy="56" r="6" fill="#1E293B" />
              <circle cx="76" cy="56" r="6" fill="#1E293B" />
              {/* Eye sparkles */}
              <circle cx="42" cy="53" r="2.5" fill="#FFFFFF" />
              <circle cx="74" cy="53" r="2.5" fill="#FFFFFF" />
            </>
          )}

          {/* Cheeks */}
          <ellipse cx="32" cy="68" rx="5" ry="3" fill="#F43F5E" opacity="0.4" />
          <ellipse cx="88" cy="68" rx="5" ry="3" fill="#F43F5E" opacity="0.4" />

          {/* Beak */}
          <polygon points="56,64 64,64 60,73" fill="#F97316" />

          {/* Wings */}
          {mood === 'cheering' || mood === 'waving' ? (
            <>
              <path d="M22 64 Q6 50 14 74" fill="#2563EB" />
              <path d="M98 64 Q116 46 106 72" fill="#2563EB" />
            </>
          ) : (
            <>
              <ellipse cx="22" cy="72" rx="7" ry="18" fill="#2563EB" transform="rotate(-15 22 72)" />
              <ellipse cx="98" cy="72" rx="7" ry="18" fill="#2563EB" transform="rotate(15 98 72)" />
            </>
          )}

          {/* Little Feet */}
          <ellipse cx="48" cy="110" rx="8" ry="4" fill="#F97316" />
          <ellipse cx="72" cy="110" rx="8" ry="4" fill="#F97316" />
        </svg>
      </motion.div>

      {/* Speech bubble */}
      {message && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: -6 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          className="relative max-w-sm rounded-2xl bg-white px-4 py-2.5 shadow-md border border-blue-100 text-slate-800 text-sm font-medium leading-relaxed"
        >
          {/* Arrow */}
          <div className="absolute -left-2 top-4 h-0 w-0 border-y-8 border-y-transparent border-r-8 border-r-white drop-shadow-sm" />
          <p>{message}</p>
        </motion.div>
      )}
    </div>
  );
};
