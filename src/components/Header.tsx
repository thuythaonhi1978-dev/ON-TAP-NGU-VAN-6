import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Maximize2, Minimize2, Shield, Sparkles, BookOpen, User } from 'lucide-react';
import { StudentProfile } from '../types';
import { SoundFX } from '../utils/sound';

interface HeaderProps {
  title: string;
  slogan: string;
  profile: StudentProfile;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenTeacher: () => void;
  onGoHome: () => void;
  currentView: string;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  slogan,
  profile,
  soundEnabled,
  onToggleSound,
  onOpenTeacher,
  onGoHome,
  currentView
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    SoundFX.playClick(soundEnabled);
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    }
  };

  const totalStars = Object.values(profile.stars).reduce((a, b) => a + b, 0);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs px-3 sm:px-6 py-2.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Logo and App Title */}
        <button
          onClick={() => {
            SoundFX.playClick(soundEnabled);
            onGoHome();
          }}
          className="flex items-center gap-2.5 text-left group transition-transform active:scale-95"
          title="Về trang chính"
        >
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <BookOpen className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base sm:text-lg tracking-tight bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 bg-clip-text text-transparent">
                {title}
              </span>
              <span className="hidden sm:inline-block text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded-full border border-amber-300">
                KNTT 6
              </span>
            </div>
            <p className="hidden md:block text-xs text-slate-500 font-medium">
              {slogan}
            </p>
          </div>
        </button>

        {/* Student Stats & Quick Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {profile.name && (
            <div className="flex items-center gap-2 bg-slate-100/90 hover:bg-slate-200/70 border border-slate-200 rounded-full px-3 py-1 text-xs font-semibold text-slate-700 transition-colors">
              <User className="w-3.5 h-3.5 text-blue-600" />
              <span className="max-w-[110px] sm:max-w-[160px] truncate">{profile.name}</span>
              {profile.className && (
                <span className="bg-blue-600 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                  {profile.className}
                </span>
              )}
              <div className="flex items-center gap-1 text-amber-600 font-bold ml-1 pl-1 border-l border-slate-300">
                <Sparkles className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                <span>{totalStars}★</span>
              </div>
            </div>
          )}

          {/* Sound toggle button */}
          <button
            onClick={() => {
              SoundFX.playClick(soundEnabled);
              onToggleSound();
            }}
            className={`p-2 rounded-xl transition-all border ${
              soundEnabled
                ? 'bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100'
                : 'bg-slate-100 text-slate-400 border-slate-200 hover:bg-slate-200'
            }`}
            title={soundEnabled ? 'Tắt âm thanh' : 'Bật âm thanh'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" /> : <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" />}
          </button>

          {/* Fullscreen toggle button */}
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-xl bg-slate-100 text-slate-600 border border-slate-200 hover:bg-slate-200 transition-all hidden sm:flex items-center justify-center"
            title={isFullscreen ? 'Thu nhỏ' : 'Toàn màn hình'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4 sm:w-5 sm:h-5" /> : <Maximize2 className="w-4 h-4 sm:w-5 sm:h-5" />}
          </button>

          {/* Teacher Mode Button (Discreet) */}
          <button
            onClick={() => {
              SoundFX.playClick(soundEnabled);
              onOpenTeacher();
            }}
            className="flex items-center gap-1 px-2.5 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200/90 text-slate-600 hover:text-slate-800 border border-slate-200 transition-all"
            title="Dành cho Giáo viên (Quản lí câu hỏi & Cài đặt)"
          >
            <Shield className="w-3.5 h-3.5 text-purple-600" />
            <span className="hidden lg:inline">Giáo viên</span>
          </button>
        </div>
      </div>
    </header>
  );
};
